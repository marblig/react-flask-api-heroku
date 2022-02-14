from app import create_app
from config import DevConfig, ProdConfig

app=create_app(ProdConfig)