import os
from pathlib import Path

from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parents[2]
DATA_DIR = PROJECT_ROOT / "data"
PDF_DIR = DATA_DIR / "pdf"

load_dotenv(PROJECT_ROOT / ".env")

CLOUDFLARE_ACCOUNT_ID = os.environ["CLOUDFLARE_ACCOUNT_ID"]
CLOUDFLARE_API_TOKEN = os.environ["CLOUDFLARE_API_TOKEN"]

EMBED_MODEL = "@cf/baai/bge-m3"
EMBED_DIMENSIONS = 1024
VECTORIZE_INDEX = "portfolio-knowledge"
