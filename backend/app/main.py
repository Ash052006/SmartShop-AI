from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.classify import router as classify_router

from app.api.routes.ai import router as ai_router

app = FastAPI(
    title="SmartShop AI",
    description="Explainable Ecommerce Personalization Engine",
    version="1.0.0"
)

app.include_router(ai_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        # Production frontend
        "https://smart-shop-bb8254qpw-ashes24x7.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to SmartShop AI 🚀"}

@app.get("/health")
def health():
    return {"status": "healthy"}

app.include_router(classify_router)
