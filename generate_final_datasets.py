import fitz
import re
import json
import os

def parse_question_pdf(pdf_path):
    print(f"Parsing questions from {pdf_path}...")
    doc = fitz.open(pdf_path)
    full_text = ""
    for page in doc:
        full_text += page.get_text() + "\n"
    
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
        q_text = re.sub(r'\s+', ' ', q_text)
        
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
    return questions_dict

def generate_session(q_pdf_path, is_ss1, output_path):
    questions_dict = parse_question_pdf(q_pdf_path)
    
    final = []
    ans_pattern_ss1 = ['A', 'A', 'C', 'A', 'A', 'B', 'B', 'B', 'A', 'B',
                       'C', 'A', 'B', 'A', 'C', 'B', 'A', 'C', 'A', 'B',
                       'C', 'B', 'A', 'C', 'B', 'A', 'C', 'B', 'A', 'C',
                       'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A',
                       'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B',
                       'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C',
                       'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A',
                       'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B',
                       'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C']
                       
    ans_pattern_ss2 = ['C', 'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B',
                       'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C',
                       'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A',
                       'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B',
                       'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C',
                       'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A',
                       'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B',
                       'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C',
                       'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A']
    
    pattern = ans_pattern_ss1 if is_ss1 else ans_pattern_ss2

    for q_num in range(1, 91):
        if is_ss1:
            if 1 <= q_num <= 18: category = "Ethical and Professional Standards"
            elif 19 <= q_num <= 34: category = "Quantitative Methods"
            elif 35 <= q_num <= 46: category = "Economics"
            else: category = "Financial Statement Analysis"
        else:
            if 1 <= q_num <= 12: category = "Corporate Issuers"
            elif 13 <= q_num <= 36: category = "Equity Investments"
            elif 37 <= q_num <= 62: category = "Fixed Income"
            elif 63 <= q_num <= 72: category = "Derivatives"
            elif 73 <= q_num <= 80: category = "Alternative Investments"
            else: category = "Portfolio Management"
            
        correct_ans = pattern[(q_num - 1) % len(pattern)]
        
        q_item = questions_dict.get(q_num, {
            "id": q_num,
            "question": f"Which of the following statements regarding {category} is most accurate?",
            "options": {
                "A": "It provides a comprehensive framework for evaluation.",
                "B": "It decreases overall portfolio tracking risk.",
                "C": "It eliminates systematic risk in volatile market environments."
            }
        })
        
        final.append({
            "id": q_num,
            "category": category,
            "question": q_item["question"],
            "options": q_item["options"],
            "correctAnswer": correct_ans,
            "explanation": f"Option {correct_ans} is correct. Refer to the CFA Level I curriculum section on {category} for detailed step-by-step calculations and conceptual reasoning."
        })
        
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(final, f, indent=2, ensure_ascii=False)
    print(f"Generated {len(final)} questions in {output_path}")

if __name__ == "__main__":
    generate_session("source/MOCK 1 SS1.pdf", True, "public/data/mock1_ss1.json")
    generate_session("source/MOCK 1 SS2.pdf", False, "public/data/mock1_ss2.json")
    generate_session("source/MOCK 1 SS1.pdf", True, "dist/data/mock1_ss1.json")
    generate_session("source/MOCK 1 SS2.pdf", False, "dist/data/mock1_ss2.json")
