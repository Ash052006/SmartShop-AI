# 🛍️ SmartShop AI
### Explainable Ecommerce Personalization Rules Engine with AI Business Insights

> A deterministic, explainable ecommerce personalization engine that analyzes customer event streams, classifies shopper personas using a rule-based engine, and generates AI-powered business insights to help improve conversion and customer engagement.

---

## 📌 Overview

SmartShop AI is a mini decision engine built for ecommerce personalization.

It analyzes **mock user event streams**, extracts behavioral features, classifies shoppers into predefined personas, explains **why** the classification was made, calculates confidence, recommends the next business action, and finally leverages **Groq AI** to generate actionable business insights.

Unlike many AI-first solutions, SmartShop AI uses a **deterministic rules engine** for classification and an **LLM only for business reasoning**, making the system transparent, explainable, and reproducible.

To Visit-> https://smart-shop-ai-one.vercel.app/

---

## ✨ Features

### 📊 Rule-Based Shopper Classification

Classifies users into:

- 👀 Browser
- ⚖️ Comparer
- 🏷️ Discount Seeker
- 🛒 Cart Abandoner
- ⭐ Loyal Customer

---

### 📈 Behavioral Feature Extraction

Extracts session metrics such as:

- Search Count
- Product Views
- Comparison Count
- Review Reads
- Cart Additions
- Cart Removals
- Coupon Usage
- Checkout Attempts
- Purchases
- Engagement Score

---

### 🔍 Explainable Decisions

Every classification includes:

- Supporting Evidence
- Confidence Score
- Business Recommendations

No black-box decisions.

---

### 🤖 AI Business Insights (Groq)

After classification, SmartShop AI generates:

- Customer Summary
- Business Impact
- Marketing Strategy
- Next Best Action
- Conversion Probability
- Risk Level

The AI **does not classify customers**.

Instead, it acts as a business analyst that interprets the rule engine's output.

---

### 🎮 Interactive Session Simulator

Simulate customer journeys in real time.

Build event streams by adding actions such as:

- Search
- View Product
- Compare Products
- Read Reviews
- Add to Cart
- Remove from Cart
- Apply Coupon
- Checkout
- Purchase
- Leave Site

Instantly observe how shopper behavior changes the final classification.

---

## 🏗️ System Architecture

```
                Mock User Event Stream
                         │
                         ▼
                Event Validator
                         │
                         ▼
              Feature Extractor
                         │
                         ▼
                 Rule Engine
                         │
                         ▼
             Confidence Calculator
                         │
                         ▼
          Explainability Generator
                         │
                         ▼
          Recommendation Engine
                         │
                         ▼
              Groq AI Insights
                         │
                         ▼
                  React Dashboard
```

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios
- Lucide React

### Backend

- FastAPI
- Python
- Pydantic
- Groq API
- python-dotenv

---

## 📁 Project Structure

```
SmartShop-AI
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── services
│   │   ├── schemas
│   │   ├── data
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
└── frontend
    ├── src
    ├── components
    ├── services
    ├── pages
    ├── package.json
    └── vite.config.ts
```

---

# 🚀 Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/SmartShop-AI.git

cd SmartShop-AI
```

---

## 2. Backend Setup

```bash
cd backend

python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Linux / Mac

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create

```
backend/.env
```

```
GROQ_API_KEY=YOUR_API_KEY

GROQ_MODEL=llama-3.3-70b-versatile
```

Run backend

```bash
uvicorn app.main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

Swagger

```
http://127.0.0.1:8000/docs
```

---

## 3. Frontend Setup

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🔄 Workflow

```
User Events

↓

Feature Extraction

↓

Rule Engine

↓

Classification

↓

Confidence

↓

Evidence

↓

Recommendations

↓

Generate AI Insight

↓

Groq AI

↓

Business Insights
```

---

# 📚 Example Input

```json
{
    "session_id":"S001",
    "events":[
        {
            "event":"search",
            "metadata":{
                "query":"nike shoes"
            }
        },
        {
            "event":"view_product",
            "metadata":{
                "product_id":"P101"
            }
        },
        {
            "event":"compare_products",
            "metadata":{
                "product_ids":[
                    "P101",
                    "P102"
                ]
            }
        }
    ]
}
```

---

# 📦 Example Output

```json
{
    "classification":"Comparer",

    "confidence":91,

    "persona":"Research-Oriented Shopper",

    "evidence":[
        "Compared multiple products.",
        "Viewed several products."
    ],

    "recommendations":[
        "Highlight product differences.",
        "Display customer reviews."
    ]
}
```

---

# 💡 Engineering Decisions

### Why Rules Instead of AI?

Classification is deterministic.

Using business rules provides:

- Explainability
- Consistency
- Predictable behavior
- Easier debugging

The LLM is only responsible for generating business insights.

This separation keeps the engine reliable while still benefiting from AI reasoning.

---

# 🔮 Future Improvements

- User profile memory
- ML-based personalization
- Rule configuration UI
- Event replay
- A/B testing recommendations
- Analytics dashboard
- Multi-session customer tracking

---

# 📷 Screenshots

<img width="1918" height="876" alt="Screenshot 2026-07-05 211738" src="https://github.com/user-attachments/assets/c5afd273-e3ce-4d49-851a-c84be50ecf85" />

<img width="1903" height="867" alt="Screenshot 2026-07-05 202855" src="https://github.com/user-attachments/assets/9bdda86a-3020-4efb-b94d-6c58b9e8452e" />

---

# 🎥 Demo

https://drive.google.com/file/d/1_-uGEBmAaNPE8Mc7GDTPuj-XkX5vQ9k8/view?usp=drive_link

---

# 👨‍💻 Author

**Aishwary Saxena**

GitHub: https://github.com/Ash052006

LinkedIn: www.linkedin.com/in/aishwary-saxena-2b0258322

---

## ⭐ If you found this project useful, consider giving it a star!
