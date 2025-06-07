import base64
import io
import logging
import os
import dotenv
from fastapi import FastAPI, Query, middleware, WebSocket,WebSocketDisconnect
from fastapi.middleware import cors
from pydantic import BaseModel
from src.ai.img_to_img import ImgToImg
import sys
# sys.path.append(".")
from src.mcp.mcp import fetch_elements_from_vector_db, mcp_completion

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
    cors.CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ComposeRequestBody(BaseModel):
    user_img: str
    clothing_item_img: str

class RecommendationResponse(BaseModel):
    recommendation: str

# Routes implementation
@app.post("/compose")
async def compose(
    request_body: ComposeRequestBody,
) -> bytes:
    """Generates a composite image based on user image and clothing item.

    Args:
        request_body (ComposeRequestBody): The request body containing the user image and clothing item image.

    Returns:
        bytes: The generated composite image.
    """
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

# create a websocket manager 
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, session_id: str):
        await websocket.accept()
        self.active_connections[session_id] = websocket

    def disconnect(self, session_id: str):
        if session_id in self.active_connections:
            del self.active_connections[session_id]

manager = ConnectionManager()

@app.websocket("/ws/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str):
    await manager.connect(websocket, session_id)
    try:
        # Handle WebSocket communication
        pass
    except WebSocketDisconnect:
        manager.disconnect(session_id)


@app.get("/test_vector_db", response_model=RecommendationResponse)
async def test_vector_db(query: str = Query(..., description="Vector database query")):
    """Tests the vector database.

    Args:
        query (str): The query to use to test the vector database (e.g., "What is a good casual outfit?").
    Example:
        curl "http://localhost:1500/test_vector_db?query=What%20is%20a%20good%20casual%20outfit?"

    Returns:
        RecommendationResponse: The results from the vector database.
    """
    result = fetch_elements_from_vector_db(query)
    return {"recommendation": str(result)}




# --------> OLD <---------
# @app.get("/recommendation", response_model=RecommendationResponse)
# async def get_recommendation(query: str = Query(..., description="Clothing recommendation query")):
#     """Gets a clothing recommendation based on the given query.

#     Args:
#         query (str): The clothing recommendation query (e.g., "What should I wear to a party?").
#         model (str): The model to use (e.g., local_ollama, gemini, openwebui).

#     Returns:
#         RecommendationResponse: The clothing recommendation.
#     """
#     result = mcp_completion([{"role": "user", "content": query}])
    
#     return {"recommendation": str(result)}
