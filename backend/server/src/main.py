import base64
import io
import logging
import os
import sys
sys.path.append(".")

import dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from src.ai.img_to_img import ImgToImg

logging.basicConfig(
    format="%(asctime)s,%(msecs)03d %(levelname)-8s [%(filename)s:%(lineno)d] %(message)s",
    datefmt="%Y-%m-%d:%H:%M:%S",
    level=logging.DEBUG,
)
logger = logging.getLogger(__name__)

dotenv.load_dotenv("./.env.local")

# Create FastAPI app
app = FastAPI(
    title="StyleGenie API",
    description="AI-Powered Style Assistant API",
    version="0.1.0",
)

# Get allowed origins from environment variable or use default
allowed_origins = os.environ.get("CORS_ORIGINS", "*").split(",")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ComposeRequestBody(BaseModel):
    user_img: str
    clothing_item_img: str

# Routes implementation
@app.post("/compose")
async def compose(
    request_body: ComposeRequestBody,
) -> bytes:
    """Generate a composite image based on user image and clothing item."""
    logger.info("Start %s ...", "compose")
    # Decode base64 string into bytes and wrap in a BytesIO with a proper file name and extension.
    user_img_file = io.BytesIO(base64.b64decode(request_body.user_img))
    user_img_file.name = "user_img.png"  # Ensure a supported image format
    clothing_item_img_file = io.BytesIO(base64.b64decode(request_body.clothing_item_img))
    clothing_item_img_file.name = "clothing_item_img.png"  # Ensure a supported image format
    # generate composit image
    img_to_img = ImgToImg()
    return img_to_img.generate(
        reference_img_list=[
            user_img_file,
            clothing_item_img_file,
        ],
    )

def ask_clothing_recommendation():
    clothing_query = input("What kind of clothing recommendation are you looking for? ")
    import sys
    sys.path.append("../../../")
    from mcp import mcp
    mcp.test_parallel_function_call(clothing_query)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=1500)
    ask_clothing_recommendation()
