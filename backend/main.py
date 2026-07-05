from app.main import app
from app.api.routes.classify import router as classify_router
__all__ = ["app"]
app.include_router(classify_router)
