import fitz
import re
import json
import os
import time
from rapidocr_onnxruntime import RapidOCR

print("Initializing RapidOCR engine...")
ocr_engine = RapidOCR()

def parse_question_pdf(pdf_path):
    print(f"Parsing question text from {pdf_path}...")
    doc = fitz.open(pdf_path)
    full_text = ""
    for page in doc:
        full_text += page.get_text() + "\n"
    
    # Split by Q<digit>.
    q_blocks = re.split(r'\n(?=Q\d+\.)', '\n' + full_text)
    questions_dict = {}
    for block in q_blocks:
        block = block.strip()
        if not block.startswith('Q'):
            continue
        m = re.match(r'Q(\d+)\.\s*(.*?)(?=\n[A-C]\.|$)', block, re.DOTALL)
        if not m:
            continue
        q_num = int(m.group(1))
        q_text = m.group(2).strip()
        # Clean double newlines or linebreaks inside text
        q_text = re.sub(r'\s+', ' ', q_text)
        
        # Options A, B, C
        opt_a = re.search(r'\nA\.\s*(.*?)(?=\n[BC]\.|$)', block, re.DOTALL)
        opt_b = re.search(r'\nB\.\s*(.*?)(?=\nC\.|^\s*$|$)', block, re.DOTALL)
        opt_c = re.search(r'\nC\.\s*(.*?)(?=\nQ\d+\.|$)', block, re.DOTALL)
        
        a_str = re.sub(r'\s+', ' ', opt_a.group(1).strip()) if opt_a else ""
        b_str = re.sub(r'\s+', ' ', opt_b.group(1).strip()) if opt_b else ""
        c_str = re.sub(r'\s+', ' ', opt_c.group(1).strip()) if opt_c else ""
        
        questions_dict[q_num] = {
            "id": q_num,
            "question": q_text,
            "options": {
                "A": a_str,
                "B": b_str,
                "C": c_str
            }
        }
    print(f"Extracted {len(questions_dict)} questions from {pdf_path}")
    return questions_dict

def parse_answer_pdf(pdf_path):
    print(f"Performing OCR on answer PDF: {pdf_path}...")
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    
    solutions_dict = {} # q_num -> {"correctAnswer": "A", "explanation": "..."}
    
    current_q_num = None
    
    for i in range(total_pages):
        page = doc[i]
        pix = page.get_pixmap(dpi=130)
        img_bytes = pix.tobytes("png")
        res, _ = ocr_engine(img_bytes)
        if not res:
            continue
        lines = [item[1].strip() for item in res if item[1].strip()]
        page_text = "\n".join(lines)
        
        # Check for Question X of 90 or Question X of
        q_match = re.search(r'Question\s*(\d+)\s*of', page_text, re.IGNORECASE)
        if q_match:
            current_q_num = int(q_match.group(1))
        
        if current_q_num and current_q_num not in solutions_dict:
            solutions_dict[current_q_num] = {
                "correctAnswer": "A", # default fallback if undetected
                "explanation": ""
            }
        
        # Extract Solution section
        if current_q_num:
            sol_idx = -1
            for idx, line in enumerate(lines):
                if 'Solution' in line or 'solution' in line.lower():
                    sol_idx = idx
                    break
            
            if sol_idx != -1:
                sol_lines = lines[sol_idx+1:]
                sol_text = "\n".join(sol_lines)
                
                # Find which option is marked Correct (e.g. A. Correct, A is correct, A. Correct because, etc.)
                correct_letter = None
                for line in sol_lines:
                    correct_m = re.search(r'([A-C])[\.\s]+Correct', line, re.IGNORECASE)
                    if correct_m:
                        correct_letter = correct_m.group(1).upper()
                        break
                
                if not correct_letter:
                    correct_m = re.search(r'([A-C])\s+is\s+correct', sol_text, re.IGNORECASE)
                    if correct_m:
                        correct_letter = correct_m.group(1).upper()
                
                if correct_letter:
                    solutions_dict[current_q_num]["correctAnswer"] = correct_letter
                
                clean_exp = re.sub(r'\s+', ' ', sol_text).strip()
                if clean_exp:
                    solutions_dict[current_q_num]["explanation"] = clean_exp

        if (i + 1) % 25 == 0 or i == total_pages - 1:
            print(f"Processed page {i+1}/{total_pages} for {pdf_path}")
            
    return solutions_dict

def process_session(q_pdf, ans_pdf, output_json, topic_name):
    questions_dict = parse_question_pdf(q_pdf)
    solutions_dict = parse_answer_pdf(ans_pdf)
    
    final_questions = []
    for q_num in range(1, 91):
        q_data = questions_dict.get(q_num, {
            "id": q_num,
            "question": f"Question {q_num}",
            "options": {"A": "Option A", "B": "Option B", "C": "Option C"}
        })
        sol_data = solutions_dict.get(q_num, {
            "correctAnswer": "A",
            "explanation": "Refer to the CFA study material for this question."
        })
        
        # Categorize topic by question number ranges (Standard CFA Level 1 breakdown)
        category = topic_name
        if "SS1" in q_pdf:
            if 1 <= q_num <= 18:
                category = "Ethical and Professional Standards"
            elif 19 <= q_num <= 34:
                category = "Quantitative Methods"
            elif 35 <= q_num <= 46:
                category = "Economics"
            elif 47 <= q_num <= 90:
                category = "Financial Statement Analysis"
        elif "SS2" in q_pdf:
            if 1 <= q_num <= 12:
                category = "Corporate Issuers"
            elif 13 <= q_num <= 36:
                category = "Equity Investments"
            elif 37 <= q_num <= 62:
                category = "Fixed Income"
            elif 63 <= q_num <= 72:
                category = "Derivatives"
            elif 73 <= q_num <= 80:
                category = "Alternative Investments"
            elif 81 <= q_num <= 90:
                category = "Portfolio Management"
        
        final_questions.append({
            "id": q_num,
            "category": category,
            "question": q_data["question"],
            "options": q_data["options"],
            "correctAnswer": sol_data["correctAnswer"],
            "explanation": sol_data["explanation"] if sol_data["explanation"] else "Refer to solution explanation."
        })
        
    os.makedirs(os.path.dirname(output_json), exist_ok=True)
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(final_questions, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(final_questions)} questions to {output_json}")

if __name__ == "__main__":
    t0 = time.time()
    print("Building datasets...")
    process_session("source/MOCK 1 SS1.pdf", "source/MOCK 1 SS1 ANS.pdf", "public/data/mock1_ss1.json", "Mock 1 Session 1")
    process_session("source/MOCK 1 SS2.pdf", "source/MOCK 1 SS2 ANS.pdf", "public/data/mock1_ss2.json", "Mock 1 Session 2")
    print(f"Dataset extraction completed in {time.time()-t0:.2f}s!")
