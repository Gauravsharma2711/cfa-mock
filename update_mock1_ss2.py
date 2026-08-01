import json

data = [
  {
    "id": 1,
    "category": "Corporate Issuers",
    "question": "Which of the following statements is most accurate? Cryptocurrencies:",
    "options": {
      "A": "exhibit low volatility.",
      "B": "have no limits on the total amount of currency that may be issued.",
      "C": "allow transactions between parties without the need for an intermediary."
    },
    "correctAnswer": "C",
    "explanation": "Correct because a cryptocurrency, also known as a digital currency, operates as electronic currency and allows near-real-time transactions between parties without the need for an intermediary, such as a bank."
  },
  {
    "id": 2,
    "category": "Corporate Issuers",
    "question": "Private equity funds invest:",
    "options": {
      "A": "in privately held companies only.",
      "B": "in publicly traded companies only.",
      "C": "both in privately held and in publicly traded companies."
    },
    "correctAnswer": "C",
    "explanation": "Correct because private equity funds invest in both publicly traded and privately held companies, not only privately held companies. Private equity refers to investment in privately owned companies or in public companies with the intent to take them private."
  },
  {
    "id": 3,
    "category": "Fixed Income",
    "question": "If a bond has a modified duration of 7.1 and convexity of 49.2, the percentage change in price for a 50 basis point increase in yield is closest to:",
    "options": {
      "A": "-3.61%.",
      "B": "-3.49%.",
      "C": "-1.65%."
    },
    "correctAnswer": "B",
    "explanation": "Correct because %ΔPVFull ≈ (-AnnModDur × ΔYield) + (1/2 × AnnConvexity × (ΔYield)²). Using the data provided: (-7.1 × 0.005) + (1/2 × 49.2 × (0.005)²) = -0.0355 + 0.000615 = -0.034885 ≈ -3.49%."
  },
  {
    "id": 4,
    "category": "Alternative Investments",
    "question": "Which of the following hedge fund strategies emphasizes a top-down approach?",
    "options": {
      "A": "Macro",
      "B": "Equity hedge",
      "C": "Event-driven"
    },
    "correctAnswer": "A",
    "explanation": "Correct. Macro hedge funds emphasize a 'top down' approach to identify economic trends and trade on expected movements in economic variables."
  },
  {
    "id": 5,
    "category": "Fixed Income",
    "question": "Which of the following most likely exhibits negative convexity?",
    "options": {
      "A": "A callable bond",
      "B": "A putable bond",
      "C": "An option-free bond"
    },
    "correctAnswer": "A",
    "explanation": "Correct because a callable bond exhibits negative convexity at low yield levels and positive convexity at high yield levels."
  },
  {
    "id": 6,
    "category": "Equity Investments",
    "question": "The risk-free rate is 5%, and the market risk premium is 8%. If the beta of TRL Corp. is 1.5, based on the capital asset pricing model (CAPM), the expected return of TRL's stock is closest to:",
    "options": {
      "A": "9.5%.",
      "B": "15.5%.",
      "C": "17.0%."
    },
    "correctAnswer": "C",
    "explanation": "Correct because using the CAPM relationship E(Ri) = Rf + βi[E(Rm) - Rf] where [E(Rm) - Rf] is the market risk premium: E(Ri) = 5% + 1.5 × (8%) = 17.0%."
  },
  {
    "id": 7,
    "category": "Equity Investments",
    "question": "Dividend per share (D0) = $3.00, Dividend payout ratio = 25%, Equity beta = 1.6, Expected risk-free rate of return = 3.5%, Expected market rate of return = 9.0%, ROE = 7.0%. Using the Gordon growth model, the stock's intrinsic value is closest to:",
    "options": {
      "A": "$24.96.",
      "B": "$42.55.",
      "C": "$44.79."
    },
    "correctAnswer": "C",
    "explanation": "Correct because V0 = D1 / (r - g). Step 1: calculate g = b × ROE = (1 - 0.25) × 7.0% = 5.25%. Step 2: calculate D1 = D0 × (1 + g) = $3.00 × 1.0525 = $3.1575. Step 3: calculate r using CAPM = Rf + β × (Rm - Rf) = 3.5% + 1.6 × (9.0% - 3.5%) = 12.3%. Step 4: V0 = $3.1575 / (12.3% - 5.25%) = $44.79."
  },
  {
    "id": 8,
    "category": "Equity Investments",
    "question": "A security's market value and intrinsic value are most likely the same if:",
    "options": {
      "A": "the market is efficient.",
      "B": "active investment is profitable.",
      "C": "the security's cash flows are complex."
    },
    "correctAnswer": "A",
    "explanation": "Correct because if investors believe a market is highly efficient, they will usually accept market prices as accurately reflecting intrinsic value."
  },
  {
    "id": 9,
    "category": "Equity Investments",
    "question": "All else being equal, which of the following indexes requires frequent rebalancing to adjust for price changes in the underlying securities?",
    "options": {
      "A": "Price-weighted index",
      "B": "Equal-weighted index",
      "C": "Market-capitalization-weighted index"
    },
    "correctAnswer": "B",
    "explanation": "Correct because under the equal-weighted method, after the index is constructed and prices change, the index is no longer equally weighted. Maintaining equal weights requires frequent rebalancing."
  },
  {
    "id": 10,
    "category": "Equity Investments",
    "question": "Par value = $100.00, Annual dividend per share = $6.00, Current market price = $85.71, Maturity = 10 years. If the required rate of return is 7% and the company's marginal tax rate is 30%, the preferred shares are most likely:",
    "options": {
      "A": "undervalued.",
      "B": "fairly valued.",
      "C": "overvalued."
    },
    "correctAnswer": "A",
    "explanation": "Correct because intrinsic value V0 = Σ [D / (1+r)^t] + [F / (1+r)^n]. With D = $6, F = $100, n = 10, r = 7%, V0 = $92.98. Given the market price of $85.71 is less than intrinsic value ($92.98), the preferred shares are undervalued. Tax rate is not applicable to dividends."
  },
  {
    "id": 11,
    "category": "Alternative Investments",
    "question": "Compared to a European waterfall, an American waterfall is:",
    "options": {
      "A": "less advantageous to the general partner.",
      "B": "equally advantageous to the general partner.",
      "C": "more advantageous to the general partner."
    },
    "correctAnswer": "C",
    "explanation": "Correct because deal-by-deal (American) waterfalls allow the general partner to collect performance fees on a per-deal basis before limited partners receive their initial investment and hurdle rate on the entire fund."
  },
  {
    "id": 12,
    "category": "Corporate Issuers",
    "question": "Which of the following is most likely a factor that results in different credit ratings for debt issued by a subsidiary and debt issued by its parent company?",
    "options": {
      "A": "Differences in duration",
      "B": "Structural subordination",
      "C": "Cross-default provisions"
    },
    "correctAnswer": "B",
    "explanation": "Correct because structural subordination arises when operating subsidiaries hold the operational assets and debt at the subsidiary level gets serviced before cash flow can be passed to the holding parent company."
  },
  {
    "id": 13,
    "category": "Portfolio Management",
    "question": "Which of the following types of investors most likely has a long-term investment time horizon and high liquidity needs?",
    "options": {
      "A": "Endowments",
      "B": "Life insurance companies",
      "C": "Defined benefit pension plans"
    },
    "correctAnswer": "B",
    "explanation": "Correct because life insurance companies have a long-term investment horizon and high liquidity needs to meet potential policy claims."
  },
  {
    "id": 14,
    "category": "Equity Investments",
    "question": "In a semi-strong-form efficient market, which of the following is reflected in prices?",
    "options": {
      "A": "Past market data only",
      "B": "Private information only",
      "C": "Both past market data and private information"
    },
    "correctAnswer": "A",
    "explanation": "Correct because in a semi-strong-form efficient market, prices reflect all publicly known and available information (which encompasses past market data). Private information is not reflected."
  },
  {
    "id": 15,
    "category": "Fixed Income",
    "question": "With respect to securitization, time tranching is best described as the redistribution of:",
    "options": {
      "A": "default risk.",
      "B": "inflation risk.",
      "C": "prepayment risk."
    },
    "correctAnswer": "C",
    "explanation": "Correct because time tranching refers to creating bond classes with different expected maturities to redistribute prepayment risk."
  },
  {
    "id": 16,
    "category": "Portfolio Management",
    "question": "The mental discomfort that occurs when new information conflicts with previously held beliefs is best described as:",
    "options": {
      "A": "regret aversion.",
      "B": "mental accounting.",
      "C": "cognitive dissonance."
    },
    "correctAnswer": "C",
    "explanation": "Correct because cognitive dissonance is the mental discomfort experienced when new information conflicts with existing beliefs."
  },
  {
    "id": 17,
    "category": "Portfolio Management",
    "question": "According to behavioral finance, observed overreaction in securities markets most likely occurs because of:",
    "options": {
      "A": "loss aversion.",
      "B": "disposition effect.",
      "C": "gambler's fallacy."
    },
    "correctAnswer": "A",
    "explanation": "Correct because loss aversion causes investors to dislike losses significantly more than gains of equivalent magnitude, which can explain market overreactions."
  },
  {
    "id": 18,
    "category": "Portfolio Management",
    "question": "Portfolio Return = 11%, SD = 4%, Beta = 1.2. Market Return = 10%, SD = 3%, Beta = 1.0. If the risk-free rate is 3%, Jensen's alpha for the portfolio is:",
    "options": {
      "A": "-4.0%.",
      "B": "-0.4%.",
      "C": "0.4%."
    },
    "correctAnswer": "B",
    "explanation": "Correct because Jensen's alpha = Rp - [Rf + βp(Rm - Rf)] = 11% - [3% + 1.2 × (10% - 3%)] = 11% - 11.4% = -0.4%."
  },
  {
    "id": 19,
    "category": "Fixed Income",
    "question": "Which of the following is least likely a component of yield spread?",
    "options": {
      "A": "Taxation",
      "B": "Credit risk",
      "C": "Expected inflation rate"
    },
    "correctAnswer": "C",
    "explanation": "Correct because the expected inflation rate is a component of the benchmark risk-free rate of return, not the yield spread."
  },
  {
    "id": 20,
    "category": "Equity Investments",
    "question": "In comparison to the makeup of fixed-income indexes, the constituent securities of equity indexes are best described as:",
    "options": {
      "A": "more liquid.",
      "B": "harder to price.",
      "C": "drawn from a larger universe."
    },
    "correctAnswer": "A",
    "explanation": "Correct because constituent securities of equity indexes trade on public exchanges and are significantly more liquid than fixed-income securities."
  },
  {
    "id": 21,
    "category": "Corporate Issuers",
    "question": "Net income = £1,500M, Average total assets = £11,500M, Average shareholders' equity = £7,500M. If the dividend payout ratio is 45%, the sustainable growth rate is closest to:",
    "options": {
      "A": "7%.",
      "B": "9%.",
      "C": "11%."
    },
    "correctAnswer": "C",
    "explanation": "Correct because ROE = Net Income / Equity = 1,500 / 7,500 = 20%. Retention rate b = 1 - 0.45 = 0.55. Sustainable growth rate g = b × ROE = 0.55 × 20% = 11%."
  },
  {
    "id": 22,
    "category": "Derivatives",
    "question": "Which of the following is most accurate? A derivative:",
    "options": {
      "A": "transforms risk of the underlying.",
      "B": "derives its value from an underlying.",
      "C": "derives its value based on the principle that arbitrage opportunities exist in the market."
    },
    "correctAnswer": "B",
    "explanation": "Correct because a derivative is a financial contract whose value derives from the performance of an underlying asset."
  },
  {
    "id": 23,
    "category": "Derivatives",
    "question": "Risk-free rate per annum = 1.50%, Exercise price = $9.75, 9-month call option price = $3.25. According to put-call-forward parity, the price of a 9-month fiduciary call is closest to:",
    "options": {
      "A": "$12.89.",
      "B": "$13.00.",
      "C": "$13.11."
    },
    "correctAnswer": "A",
    "explanation": "Correct because Fiduciary Call = c0 + X / (1+r)^T = $3.25 + $9.75 / (1.015)^(9/12) = $3.25 + $9.64 = $12.89."
  },
  {
    "id": 24,
    "category": "Derivatives",
    "question": "Compared to trading an underlying directly, trading a derivative on the underlying most likely involves:",
    "options": {
      "A": "higher transaction costs.",
      "B": "a lower degree of leverage.",
      "C": "a smaller amount of required recapital."
    },
    "correctAnswer": "C",
    "explanation": "Correct because derivative markets require significantly less capital to achieve equivalent asset exposure."
  },
  {
    "id": 25,
    "category": "Derivatives",
    "question": "During its life, the value of a forward contract is most likely equal to the price of the underlying minus the price of the:",
    "options": {
      "A": "forward.",
      "B": "forward, discounted over the original term of the contract.",
      "C": "forward, discounted over the remaining term of the contract."
    },
    "correctAnswer": "C",
    "explanation": "Correct because forward contract value during its life equals spot price minus present value of the forward price discounted over the remaining term."
  },
  {
    "id": 26,
    "category": "Fixed Income",
    "question": "All else being equal, a bond issuer is most likely to be evaluated as less creditworthy than its peers if it has a:",
    "options": {
      "A": "lower debt/EBITDA and a lower EBITDA/interest expense.",
      "B": "lower debt/EBITDA and a higher EBITDA/interest expense.",
      "C": "higher debt/EBITDA and a lower EBITDA/interest expense."
    },
    "correctAnswer": "C",
    "explanation": "Correct because higher debt/EBITDA signifies higher leverage while lower EBITDA/interest expense indicates weaker capacity to service interest payments."
  },
  {
    "id": 27,
    "category": "Portfolio Management",
    "question": "Which of the following is most likely considered an investor constraint in an investment policy statement?",
    "options": {
      "A": "Time horizon",
      "B": "Risk tolerance",
      "C": "Return requirement"
    },
    "correctAnswer": "A",
    "explanation": "Correct because constraints include liquidity, time horizon, tax concerns, legal and regulatory factors, and unique circumstances. Risk and return are objectives."
  },
  {
    "id": 28,
    "category": "Portfolio Management",
    "question": "A lifecycle fund will most likely:",
    "options": {
      "A": "maintain a fixed asset allocation of stocks and bonds.",
      "B": "use tactical asset allocation to capture market opportunities.",
      "C": "change the asset allocation as the fund nears its target date."
    },
    "correctAnswer": "C",
    "explanation": "Correct because lifecycle / target-date funds automatically shift asset mix from higher-risk equities to lower-risk fixed income as the target retirement date approaches."
  },
  {
    "id": 29,
    "category": "Fixed Income",
    "question": "Measuring the duration of a bond portfolio as a weighted average of the individual bond durations:",
    "options": {
      "A": "is difficult to use as a measure of interest rate risk.",
      "B": "assumes the yield curve shifts in a parallel manner.",
      "C": "assumes the yield curve shifts in a non-parallel manner."
    },
    "correctAnswer": "B",
    "explanation": "Correct because weighted average bond duration assumes that all yield curve interest rates shift by equal amounts in the same direction (parallel shift)."
  },
  {
    "id": 30,
    "category": "Fixed Income",
    "question": "Analytical duration:",
    "options": {
      "A": "assumes that government bond yields and spreads are independent variables.",
      "B": "is lower than empirical duration for high-yield bonds under market stress scenarios.",
      "C": "uses statistical methods and historical bond prices to derive the price-yield relationship for bond portfolios."
    },
    "correctAnswer": "A",
    "explanation": "Correct because mathematical/analytical duration formulas assume benchmark government yields and credit spreads are uncorrelated independent variables."
  },
  {
    "id": 31,
    "category": "Derivatives",
    "question": "Which of the following best describes the process of changing the distribution of risk outcomes by using derivatives?",
    "options": {
      "A": "Risk shifting",
      "B": "Risk transfer",
      "C": "Risk avoidance"
    },
    "correctAnswer": "A",
    "explanation": "Correct because risk shifting uses derivatives to alter the probability distribution of risk outcomes."
  },
  {
    "id": 32,
    "category": "Fixed Income",
    "question": "All else being equal, for option-free bonds, the percentage price change for a given yield change is most likely greater for a bond:",
    "options": {
      "A": "with a high coupon than for a bond with a low coupon.",
      "B": "with a short time-to-maturity than for a bond with a long time-to-maturity.",
      "C": "when the market discount rate goes down than when the market discount rate goes up."
    },
    "correctAnswer": "C",
    "explanation": "Correct because the convexity effect causes the percentage price gain when yields drop to exceed the percentage price drop when yields rise by an equal amount."
  },
  {
    "id": 33,
    "category": "Derivatives",
    "question": "A swap is similar to a series of implicit forward contracts with each contract created at a price that corresponds to the:",
    "options": {
      "A": "floating rate on the swap at each payment date.",
      "B": "net cash flows on the swap at each payment date.",
      "C": "fixed price of the swap with payments made at the same dates as the series of forward contracts."
    },
    "correctAnswer": "C",
    "explanation": "Correct because each implicit forward contract in a swap is priced at the swap's fixed rate."
  },
  {
    "id": 34,
    "category": "Portfolio Management",
    "question": "The capital asset pricing model (CAPM) is based on the assumption that investors are risk:",
    "options": {
      "A": "averse.",
      "B": "neutral.",
      "C": "seeking."
    },
    "correctAnswer": "A",
    "explanation": "Correct because CAPM assumes all investors are risk-averse, rational, utility-maximizing individuals."
  },
  {
    "id": 35,
    "category": "Derivatives",
    "question": "Based on put-call parity, an investor holding a long position in an underlying asset most likely creates a risk-free position by:",
    "options": {
      "A": "only selling a call.",
      "B": "selling a put and buying a call.",
      "C": "selling a call and buying a put."
    },
    "correctAnswer": "C",
    "explanation": "Correct because put-call parity states S0 + p0 - c0 = X / (1+r)^T. Holding long stock, long put, and short call constructs a synthetic risk-free asset."
  },
  {
    "id": 36,
    "category": "Fixed Income",
    "question": "All else being equal, which of the following bonds most likely has the lowest price?",
    "options": {
      "A": "Putable bond",
      "B": "Callable bond",
      "C": "Option-free bond"
    },
    "correctAnswer": "B",
    "explanation": "Correct because the call option embedded in a callable bond benefits the issuer, forcing the bond to sell at a discount compared to option-free bonds."
  },
  {
    "id": 37,
    "category": "Portfolio Management",
    "question": "Security A: SD = 16%, Weight = 60%. Security B: SD = 27%, Weight = 40%. If the portfolio's standard deviation of returns is 20.4%, the correlation between the securities is closest to:",
    "options": {
      "A": "-1.",
      "B": "0.",
      "C": "1."
    },
    "correctAnswer": "C",
    "explanation": "Correct because when correlation = 1, portfolio SD = wAσA + wBσB = (0.60 × 16%) + (0.40 × 27%) = 9.6% + 10.8% = 20.4%."
  },
  {
    "id": 38,
    "category": "Equity Investments",
    "question": "Industry classification systems are developed by:",
    "options": {
      "A": "commercial entities only.",
      "B": "governmental agencies only.",
      "C": "both commercial entities and government agencies."
    },
    "correctAnswer": "C",
    "explanation": "Correct because industry classification standards are established by both commercial index providers (e.g. MSCI/S&P GICS) and government bodies (e.g. NAICS)."
  },
  {
    "id": 39,
    "category": "Derivatives",
    "question": "Using the one-period binomial option pricing model, the value of an option will be affected by:",
    "options": {
      "A": "the volatility of the underlying.",
      "B": "a measure of investor risk aversion.",
      "C": "the probabilities of up and down moves in the underlying."
    },
    "correctAnswer": "A",
    "explanation": "Correct because risk-neutral option pricing uses factors u and d which reflect the volatility of the underlying asset."
  },
  {
    "id": 40,
    "category": "Fixed Income",
    "question": "An analyst uses a valuation model to estimate the value of an option-free bond at 92.733 to yield 11%. If the value is 94.474 for a 60 bps decrease in yield and 91.041 for a 60 bps increase in yield, the approximate modified duration of the bond is closest to:",
    "options": {
      "A": "1.85.",
      "B": "3.09.",
      "C": "6.17."
    },
    "correctAnswer": "B",
    "explanation": "Correct because ApproxModDur = (PV- - PV+) / (2 × ΔYield × PV0) = (94.474 - 91.041) / (2 × 0.0060 × 92.733) = 3.433 / 1.1128 = 3.09."
  },
  {
    "id": 41,
    "category": "Fixed Income",
    "question": "For an option-free bond, effective duration:",
    "options": {
      "A": "will be equal to modified duration if the yield curve is absolutely flat.",
      "B": "measures interest rate risk for both parallel and non-parallel benchmark yield curve shifts.",
      "C": "is an estimate of the percentage change in bond price given a change in the bond's yield to maturity."
    },
    "correctAnswer": "A",
    "explanation": "Correct because effective duration and modified duration for option-free bonds are identical only under a perfectly flat yield curve."
  },
  {
    "id": 42,
    "category": "Equity Investments",
    "question": "Securities dealers most likely:",
    "options": {
      "A": "arrange IPOs.",
      "B": "provide liquidity.",
      "C": "securitize assets."
    },
    "correctAnswer": "B",
    "explanation": "Correct because dealers trade for their own accounts (proprietary trading) to supply market liquidity."
  },
  {
    "id": 43,
    "category": "Fixed Income",
    "question": "Forward rates: 0y1y = 1.20%, 1y1y = 1.88%, 2y1y = 2.46%, 3y1y = 2.93%. The price of a three-year, 5% annual-pay bond is closest to:",
    "options": {
      "A": "107.42.",
      "B": "109.18.",
      "C": "111.73."
    },
    "correctAnswer": "B",
    "explanation": "Correct because using forward rates: PV = 5 / (1.012) + 5 / (1.012 × 1.0188) + 105 / (1.012 × 1.0188 × 1.0246) = 4.94 + 4.85 + 99.39 = 109.18."
  },
  {
    "id": 44,
    "category": "Corporate Issuers",
    "question": "A company's cost of equity is a proxy for the:",
    "options": {
      "A": "company's intrinsic value.",
      "B": "company's accounting return on equity.",
      "C": "minimum required rate of return of investors in the company's equity."
    },
    "correctAnswer": "C",
    "explanation": "Correct because cost of equity reflects the hurdle rate or minimum return equity investors require to hold the stock."
  },
  {
    "id": 45,
    "category": "Derivatives",
    "question": "At initiation, the price of a forward contract is most likely:",
    "options": {
      "A": "less than the value of the forward contract.",
      "B": "equal to the value of the forward contract.",
      "C": "greater than the value of the forward contract."
    },
    "correctAnswer": "C",
    "explanation": "Correct because at initiation, forward contract value is 0, whereas forward price is a positive agreed value; thus price > value."
  },
  {
    "id": 46,
    "category": "Alternative Investments",
    "question": "Which of the following statements about private debt is most accurate? Mezzanine debt is:",
    "options": {
      "A": "funding provided to start-up or early-stage companies generating negative cash flow.",
      "B": "subordinated to senior secured debt but senior to equity in the borrower's capital structure.",
      "C": "a hybrid loan structure that combines different tranches of secured and unsecured debt into a single loan."
    },
    "correctAnswer": "B",
    "explanation": "Correct because mezzanine debt occupies a junior position to senior debt but remains senior to equity."
  },
  {
    "id": 47,
    "category": "Equity Investments",
    "question": "Enterprise value is most useful when:",
    "options": {
      "A": "determining a measure of dividend-paying capacity.",
      "B": "no market quotations for the company's debt are available.",
      "C": "comparing companies with significant differences in capital structure."
    },
    "correctAnswer": "C",
    "explanation": "Correct because enterprise value includes net debt alongside equity value, neutralizing capital structure distortions."
  },
  {
    "id": 48,
    "category": "Alternative Investments",
    "question": "Which real estate sector is the largest globally by market value?",
    "options": {
      "A": "Industrial",
      "B": "Residential",
      "C": "Commercial"
    },
    "correctAnswer": "B",
    "explanation": "Correct because residential real estate accounts for more than 75% of global real estate value."
  },
  {
    "id": 49,
    "category": "Alternative Investments",
    "question": "Management fees for private equity funds are most likely based on:",
    "options": {
      "A": "invested capital.",
      "B": "committed capital.",
      "C": "assets under management."
    },
    "correctAnswer": "B",
    "explanation": "Correct because private equity funds levy management fees on committed capital rather than invested capital or AUM."
  },
  {
    "id": 50,
    "category": "Equity Investments",
    "question": "Security 1 (Beg $50, End $60, Shares 300), Security 2 (Beg $75, End $95, Shares 350), Security 3 (Beg $60, End $65, Shares 400). If the number of constituent shares is constant, the weighting method that results in the highest return is:",
    "options": {
      "A": "price weighting.",
      "B": "equal weighting.",
      "C": "value weighting."
    },
    "correctAnswer": "A",
    "explanation": "Correct because price-weighted return = (60+95+65)/(50+75+60) - 1 = 18.92%, which exceeds equal weighting (~18.33%) and value weighting (~18.39%)."
  },
  {
    "id": 51,
    "category": "Alternative Investments",
    "question": "A greenfield infrastructure investment is best described as an asset that has:",
    "options": {
      "A": "yet to be constructed.",
      "B": "already been constructed.",
      "C": "reached the end of its useful life."
    },
    "correctAnswer": "A",
    "explanation": "Correct because greenfield infrastructure refers to developing brand-new assets from scratch."
  },
  {
    "id": 52,
    "category": "Alternative Investments",
    "question": "Which of the following drivers of timberland returns is not applicable to farmland?",
    "options": {
      "A": "Land prices",
      "B": "Commodity prices",
      "C": "Harvesting flexibility"
    },
    "correctAnswer": "C",
    "explanation": "Correct because standing timber acts as both factory and warehouse (harvesting can be delayed), whereas farm crops must be harvested immediately."
  },
  {
    "id": 53,
    "category": "Equity Investments",
    "question": "An investor buys a stock for $108 on margin by posting 40% of the initial stock price as equity. If the maintenance margin requirement for the position is 20%, a margin call first occurs when the price falls below:",
    "options": {
      "A": "$64.80.",
      "B": "$81.00.",
      "C": "$86.40."
    },
    "correctAnswer": "B",
    "explanation": "Correct because Initial Equity/share = $43.20. Loan/share = $64.80. Margin call price P satisfies: (P - $64.80) / P = 0.20 => 0.80 P = $64.80 => P = $81.00."
  },
  {
    "id": 54,
    "category": "Fixed Income",
    "question": "Bond 1 (Monthly, Amortizing Yes), Bond 2 (Quarterly, Amortizing Yes), Bond 3 (Monthly, Amortizing No). All else being equal, the bond with the greatest reinvestment risk is most likely:",
    "options": {
      "A": "Bond 1.",
      "B": "Bond 2.",
      "C": "Bond 3."
    },
    "correctAnswer": "A",
    "explanation": "Correct because Bond 1 amortizes principal on a monthly basis, returning cash flows most frequently and exposing the holder to the greatest reinvestment risk."
  },
  {
    "id": 55,
    "category": "Alternative Investments",
    "question": "Which of the following statements regarding alternative asset co-investing is correct? Statement 1: The investor invests in assets indirectly through a fund. Statement 2: The investor possesses rights to invest directly in the same assets.",
    "options": {
      "A": "Statement 1 only",
      "B": "Statement 2 only",
      "C": "Both Statement 1 and Statement 2"
    },
    "correctAnswer": "C",
    "explanation": "Correct because co-investing involves indirect investment through a fund plus co-investment rights to invest directly in target assets."
  },
  {
    "id": 56,
    "category": "Derivatives",
    "question": "A European call option has an exercise price of $80 and an option premium of $12. The price of the underlying is $75. The intrinsic value of the option is:",
    "options": {
      "A": "$0.",
      "B": "$5.",
      "C": "$7."
    },
    "correctAnswer": "A",
    "explanation": "Correct because intrinsic value of a call option = Max(0, ST - X) = Max(0, $75 - $80) = $0."
  },
  {
    "id": 57,
    "category": "Equity Investments",
    "question": "The free-cash-flow-to-equity model:",
    "options": {
      "A": "excludes net borrowings.",
      "B": "can be used to value non-dividend paying stocks.",
      "C": "requires an estimate of future dividend payments."
    },
    "correctAnswer": "B",
    "explanation": "Correct because FCFE models evaluate dividend-paying capacity rather than actual paid dividends, making them ideal for non-dividend paying stocks."
  },
  {
    "id": 58,
    "category": "Fixed Income",
    "question": "If an investor buys a 5-year, 8% annual-pay bond for 96.11, the bond's yield-to-maturity is closest to:",
    "options": {
      "A": "7.33%.",
      "B": "8.32%.",
      "C": "9.00%."
    },
    "correctAnswer": "C",
    "explanation": "Correct because using TVM calculator inputs: N = 5, PV = -96.11, PMT = 8, FV = 100 => I/Y = 9.00%."
  },
  {
    "id": 59,
    "category": "Portfolio Management",
    "question": "In an investment policy statement, which of the following investment constraints most likely outlines a client's preference for environmentally sustainable investments?",
    "options": {
      "A": "Time horizon",
      "B": "Unique circumstances",
      "C": "Legal and regulatory factors"
    },
    "correctAnswer": "B",
    "explanation": "Correct because ESG considerations and sustainability preferences are categorized under unique circumstances in the IPS."
  },
  {
    "id": 60,
    "category": "Equity Investments",
    "question": "If the current share price is $60, a trader who wants to purchase the share at $58 or less will most likely place a:",
    "options": {
      "A": "limit order.",
      "B": "market order.",
      "C": "stop-buy order."
    },
    "correctAnswer": "A",
    "explanation": "Correct because a limit order to buy sets a maximum acceptable price ceiling ($58)."
  },
  {
    "id": 61,
    "category": "Equity Investments",
    "question": "Sponsored depository receipts are most likely subject to:",
    "options": {
      "A": "less reporting requirements than unsponsored ones.",
      "B": "the same level of reporting requirements as unsponsored ones.",
      "C": "greater reporting requirements than unsponsored ones."
    },
    "correctAnswer": "C",
    "explanation": "Correct because sponsored DRs involve the issuing firm directly and require compliance with stricter regulatory disclosure rules."
  },
  {
    "id": 62,
    "category": "Portfolio Management",
    "question": "Which of the following is best classified as a nonsystematic risk?",
    "options": {
      "A": "Political uncertainty",
      "B": "Widespread natural disasters",
      "C": "Bankruptcy of a major automobile producer"
    },
    "correctAnswer": "C",
    "explanation": "Correct because the failure of a single auto manufacturer is company-specific risk that can be diversified away."
  },
  {
    "id": 63,
    "category": "Fixed Income",
    "question": "Four years ago, a 5% coupon, annual-pay bond with a 10-year maturity was issued at par. If the current market discount rate is 7%, the price of the bond per 100 of par value is closest to:",
    "options": {
      "A": "90.34.",
      "B": "90.47.",
      "C": "93.23."
    },
    "correctAnswer": "B",
    "explanation": "Correct because remaining maturity = 10 - 4 = 6 years. With N = 6, PMT = 5, FV = 100, I/Y = 7 => PV = 90.47."
  },
  {
    "id": 64,
    "category": "Fixed Income",
    "question": "The price of a fixed-rate corporate bond with an annual modified duration of 7.15 increases from 92 to 97 per 100 of par value. If the government benchmark yield increases by 5 bps, the estimated decline in the spread over the benchmark yield is closest to:",
    "options": {
      "A": "71 bps.",
      "B": "76 bps.",
      "C": "81 bps."
    },
    "correctAnswer": "C",
    "explanation": "Correct because %ΔP = (97 - 92) / 92 = +5.435%. ΔYTM = -5.435% / 7.15 = -0.760% (-76 bps). ΔSpread = ΔYTM - ΔBenchmark = -76 bps - 5 bps = -81 bps (a decline of 81 bps)."
  },
  {
    "id": 65,
    "category": "Fixed Income",
    "question": "Commercial paper with a face value of $25,000,000 and a term of 120 days was issued 55 days ago. If the current market value is $24,855,000, the implied discount rate assuming a 360-day year is closest to:",
    "options": {
      "A": "3.21%.",
      "B": "3.23%.",
      "C": "3.80%."
    },
    "correctAnswer": "A",
    "explanation": "Correct because remaining days = 120 - 55 = 65 days. Discount Rate = (360 / 65) × [($25,000,000 - $24,855,000) / $25,000,000] = 3.21%."
  },
  {
    "id": 66,
    "category": "Alternative Investments",
    "question": "Beginning AUM = $100M, High-water mark = $110M, Return before fees = 20%, Mgmt fee = 1% on EOY AUM, Incentive fee = 10%, Hurdle rate = 5%. If incentive fees are based on returns in excess of the hurdle rate and calculated independent of mgmt fees, investor's net return for the year is:",
    "options": {
      "A": "17.30%.",
      "B": "17.80%.",
      "C": "18.35%."
    },
    "correctAnswer": "C",
    "explanation": "Correct because EOY AUM before fees = $120M. Management fee = 1% × $120M = $1.2M. Incentive fee = 10% × [$120M - $110M × 1.05] = 10% × [$120M - $115.5M] = $0.45M. Net Return = ($120M - $1.2M - $0.45M - $100M) / $100M = 18.35%."
  },
  {
    "id": 67,
    "category": "Portfolio Management",
    "question": "The capital allocation line is best described as combinations of a risky portfolio and the:",
    "options": {
      "A": "risk-free asset.",
      "B": "market portfolio.",
      "C": "minimum variance portfolio."
    },
    "correctAnswer": "A",
    "explanation": "Correct because the CAL plots returns of combinations of the risk-free asset and an optimal risky portfolio."
  },
  {
    "id": 68,
    "category": "Alternative Investments",
    "question": "Which of the following most likely provides the greatest redemption flexibility?",
    "options": {
      "A": "Hedge funds",
      "B": "Private equity funds",
      "C": "Funds of hedge funds"
    },
    "correctAnswer": "C",
    "explanation": "Correct because funds of hedge funds maintain cash reserves and special redemption terms that provide investors more flexibility than direct hedge funds or private equity."
  },
  {
    "id": 69,
    "category": "Alternative Investments",
    "question": "AUM Yr 1 start = $100M, Yr 1 end = $125M, Yr 2 end = $110M. Mgmt fee = 2% on EOY AUM, Performance fee = 20% above HWM. The cumulative fee (in $ millions) earned by the hedge fund manager for the two years is closest to:",
    "options": {
      "A": "5.2.",
      "B": "7.2.",
      "C": "9.2."
    },
    "correctAnswer": "C",
    "explanation": "Correct because Year 1 Mgmt Fee = 2% × $125M = $2.5M. Year 1 Perf Fee = 20% × ($125M - $2.5M - $100M) = $4.5M. High-water mark = $118M. Year 2 Mgmt Fee = 2% × $110M = $2.2M. Year 2 Perf Fee = $0. Total = $2.5M + $4.5M + $2.2M = $9.2M."
  },
  {
    "id": 70,
    "category": "Equity Investments",
    "question": "All else being equal, if a company declares a dividend of $1 per share, the company's share price is most likely to decrease by $1 on the:",
    "options": {
      "A": "declaration date.",
      "B": "ex-dividend date.",
      "C": "holder-of-record date."
    },
    "correctAnswer": "B",
    "explanation": "Correct because on the ex-dividend date, buyers no longer acquire the right to the upcoming dividend, driving the share price down by the dividend amount."
  },
  {
    "id": 71,
    "category": "Derivatives",
    "question": "A call option with an exercise price of $38 was bought for $3. The price of the underlying increases from $42 to $47. At expiration, the payoff to the call buyer is equal to:",
    "options": {
      "A": "$4.",
      "B": "$6.",
      "C": "$9."
    },
    "correctAnswer": "C",
    "explanation": "Correct because Call Payoff = Max(0, ST - X) = Max(0, $47 - $38) = $9. (Profit = $9 - $3 = $6)."
  },
  {
    "id": 72,
    "category": "Derivatives",
    "question": "Arbitrage is best described as an opportunity to earn:",
    "options": {
      "A": "risk-free returns with no investment capital.",
      "B": "risk-free returns with large amounts of investment capital.",
      "C": "abnormal returns applying an absolute valuation methodology."
    },
    "correctAnswer": "A",
    "explanation": "Correct because pure arbitrage yields risk-free returns without committing capital."
  },
  {
    "id": 73,
    "category": "Fixed Income",
    "question": "In the event of a default, which of the following mortgage structures exposes a lender to the greatest risk of loss?",
    "options": {
      "A": "Interest-only, recourse loan",
      "B": "Fully amortizing, recourse loan",
      "C": "Balloon payment, non-recourse loan"
    },
    "correctAnswer": "C",
    "explanation": "Correct because non-recourse loans prevent recovery against borrower personal assets, and balloon payments leave a high unpaid principal balance."
  },
  {
    "id": 74,
    "category": "Derivatives",
    "question": "Contracts entered into at one point in time that require both parties to engage in a transaction at a later point in time on terms agreed upon at the start are called:",
    "options": {
      "A": "options contracts.",
      "B": "contingent claims.",
      "C": "forward commitments."
    },
    "correctAnswer": "C",
    "explanation": "Correct because forward commitments legally bind both counterparties to fulfill the transaction at expiration."
  },
  {
    "id": 75,
    "category": "Derivatives",
    "question": "A holder of a put option is best described as having a:",
    "options": {
      "A": "short exposure to the option contract.",
      "B": "long exposure to the underlying instrument.",
      "C": "short exposure to the underlying instrument."
    },
    "correctAnswer": "C",
    "explanation": "Correct because the holder of a put option gains when the underlying asset falls, creating a short exposure to the underlying."
  },
  {
    "id": 76,
    "category": "Portfolio Management",
    "question": "A risk-neutral investor most likely seeks to maximize:",
    "options": {
      "A": "both risk and return.",
      "B": "return irrespective of risk.",
      "C": "return for a given level of risk."
    },
    "correctAnswer": "B",
    "explanation": "Correct because a risk-neutral investor focuses entirely on maximizing expected return regardless of risk."
  },
  {
    "id": 77,
    "category": "Corporate Issuers",
    "question": "Pricing power is most likely lowest in markets characterized by:",
    "options": {
      "A": "strong customer loyalty.",
      "B": "high barriers to firm entry.",
      "C": "low switching costs for customers."
    },
    "correctAnswer": "C",
    "explanation": "Correct because low switching costs allow customers to easily switch to competitors, limiting pricing power."
  },
  {
    "id": 78,
    "category": "Derivatives",
    "question": "The value of a European call option is inversely related:",
    "options": {
      "A": "only to the risk-free interest rate.",
      "B": "only to the dividends paid by the underlying stock.",
      "C": "both to the risk-free interest rate and to the dividends paid by the underlying stock."
    },
    "correctAnswer": "B",
    "explanation": "Correct because expected cash dividends reduce the growth rate of the underlying stock, lowering European call option values."
  },
  {
    "id": 79,
    "category": "Portfolio Management",
    "question": "In which of the following stages of the enterprise risk management process will a company's board most likely identify shortfalls within the company that would cause it to fail to achieve critical goals? When:",
    "options": {
      "A": "monitoring and mitigating risk",
      "B": "making the risk tolerance decision",
      "C": "allocating capital to risky activities"
    },
    "correctAnswer": "B",
    "explanation": "Correct because determining organizational risk tolerance starts with an internal assessment of shortfalls that could cause failure in achieving critical goals."
  },
  {
    "id": 80,
    "category": "Fixed Income",
    "question": "The underlying assets of an asset-backed security are directly owned by the:",
    "options": {
      "A": "originator.",
      "B": "special purpose vehicle.",
      "C": "investors in the asset-backed securities."
    },
    "correctAnswer": "B",
    "explanation": "Correct because securitization transfers ownership of the underlying assets from the originator to the Special Purpose Vehicle (SPV)."
  },
  {
    "id": 81,
    "category": "Equity Investments",
    "question": "The earnings multiplier for a stock increases with a decrease in the:",
    "options": {
      "A": "expected dividend growth rate.",
      "B": "expected dividend payout ratio.",
      "C": "estimated required rate of return on equity."
    },
    "correctAnswer": "C",
    "explanation": "Correct because P0/E1 = (D1/E1) / (r - g). A decrease in required return r decreases the denominator, increasing P/E."
  },
  {
    "id": 82,
    "category": "Portfolio Management",
    "question": "With respect to portfolio construction, combining long-term capital market expectations with the objectives and constraints from the investment policy statement determines a portfolio's:",
    "options": {
      "A": "security selection.",
      "B": "tactical asset allocation.",
      "C": "strategic asset allocation."
    },
    "correctAnswer": "C",
    "explanation": "Correct because strategic asset allocation balances long-term capital market expectations with client IPS constraints and goals."
  },
  {
    "id": 83,
    "category": "Corporate Issuers",
    "question": "The central bank funds market is most likely used by:",
    "options": {
      "A": "central banks looking to obtain short-term funding.",
      "B": "lenders of last resort to transfer funds between each other.",
      "C": "banks to manage the imbalances in their required reserves."
    },
    "correctAnswer": "C",
    "explanation": "Correct because commercial banks borrow and lend excess reserves in the central bank funds market to satisfy reserve requirements."
  },
  {
    "id": 84,
    "category": "Derivatives",
    "question": "Consider a put option selling for $4 in which the exercise price is $58. What is the profit for a put buyer if the price of the underlying at expiration is $57?",
    "options": {
      "A": "-$3",
      "B": "$1",
      "C": "$3"
    },
    "correctAnswer": "A",
    "explanation": "Correct because Value at Expiration = Max(0, $58 - $57) = $1. Profit = $1 - $4 = -$3."
  },
  {
    "id": 85,
    "category": "Portfolio Management",
    "question": "In an equally weighted portfolio of many assets, an increase in the correlation between the assets' returns most likely decreases the portfolio's:",
    "options": {
      "A": "overall risk.",
      "B": "expected return.",
      "C": "diversification benefit."
    },
    "correctAnswer": "C",
    "explanation": "Correct because higher correlation among asset returns degrades the diversification benefits."
  },
  {
    "id": 86,
    "category": "Fixed Income",
    "question": "Which of the following is most likely considered an affirmative covenant?",
    "options": {
      "A": "A minimum interest coverage ratio",
      "B": "A limit on the level of share buybacks",
      "C": "What the issuer will do with the proceeds of a bond issue"
    },
    "correctAnswer": "C",
    "explanation": "Correct because affirmative covenants state required actions, such as specifying how bond proceeds will be utilized."
  },
  {
    "id": 87,
    "category": "Equity Investments",
    "question": "An investor purchased shares on margin at €50 per share using a leverage ratio of 2.0. If the shares are sold for €70 per share, the return on the investor's equity investment is:",
    "options": {
      "A": "40%.",
      "B": "80%.",
      "C": "180%."
    },
    "correctAnswer": "B",
    "explanation": "Correct because price return = (€70 - €50) / €50 = 40%. Return on equity = 40% × 2.0 leverage = 80%."
  },
  {
    "id": 88,
    "category": "Equity Investments",
    "question": "Bid/Ask order book: CHF 42.56 (Bid 2,000), 42.52 (Bid 4,000), 42.44 (Bid 7,100), 42.42 (Bid 5,000). She receives an order to sell 9,000 shares with a limit price of CHF 42.52. The average price (in CHF) at which the trades will be executed is closest to:",
    "options": {
      "A": "42.52.",
      "B": "42.50.",
      "C": "42.53."
    },
    "correctAnswer": "C",
    "explanation": "Correct because only 6,000 shares can fill at or above the CHF 42.52 limit price (2,000 @ 42.56 and 4,000 @ 42.52). Average price = (2,000 × 42.56 + 4,000 × 42.52) / 6,000 = CHF 42.53."
  },
  {
    "id": 89,
    "category": "Portfolio Management",
    "question": "The two-fund separation theorem states that all investors will hold a combination of the:",
    "options": {
      "A": "risk-free asset and the optimal risky portfolio.",
      "B": "risk-free asset and the global minimum-variance portfolio.",
      "C": "optimal risky portfolio and the global minimum-variance portfolio."
    },
    "correctAnswer": "A",
    "explanation": "Correct because two-fund separation asserts that all investors combine the risk-free asset and the optimal portfolio of risky assets."
  },
  {
    "id": 90,
    "category": "Portfolio Management",
    "question": "With respect to an investment policy statement, a maximum acceptable level of tracking risk is best described as a(n):",
    "options": {
      "A": "relative risk objective.",
      "B": "absolute risk objective.",
      "C": "systematic risk objective."
    },
    "correctAnswer": "A",
    "explanation": "Correct because tracking risk measures standard deviation of excess returns relative to a benchmark index (a relative risk objective)."
  }
]

with open('public/data/mock1_ss2.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Successfully wrote {len(data)} questions to public/data/mock1_ss2.json")
