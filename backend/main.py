from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from typing import Dict, Any
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Currency Converter API",
    description="Real-time currency conversion API",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Configuration
API_KEY = "a1e061319802080f39890672"
BASE_URL = f"https://v6.exchangerate-api.com/v6/{API_KEY}"

class ConversionRequest(BaseModel):
    from_currency: str
    to_currency: str
    amount: float

class ConversionResponse(BaseModel):
    from_currency: str
    to_currency: str
    amount: float
    exchange_rate: float
    converted_amount: float
    timestamp: str
    success: bool
    error: str = None

@app.get("/")
async def root():
    return {"message": "Currency Converter API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "currency-converter-api"}

@app.post("/convert", response_model=ConversionResponse)
async def convert_currency(request: ConversionRequest):
    """
    Convert amount from one currency to another using real-time exchange rates.
    
    Args:
        request: ConversionRequest containing from_currency, to_currency, and amount
    
    Returns:
        ConversionResponse with conversion details
    
    Raises:
        HTTPException: If conversion fails
    """
    try:
        # Validate input
        if request.amount <= 0:
            raise HTTPException(status_code=400, detail="Amount must be greater than 0")
        
        if not request.from_currency or not request.to_currency:
            raise HTTPException(status_code=400, detail="Currency codes are required")
        
        # Make API call to exchange rate service
        async with httpx.AsyncClient() as client:
            url = f"{BASE_URL}/pair/{request.from_currency}/{request.to_currency}/{request.amount}"
            logger.info(f"Making request to: {url}")
            
            response = await client.get(url)
            response.raise_for_status()
            
            data = response.json()
            
            if data.get("result") != "success":
                error_type = data.get("error-type", "Unknown error")
                logger.error(f"API Error: {error_type}")
                raise HTTPException(status_code=400, detail=f"Conversion failed: {error_type}")
            
            # Format response
            conversion_response = ConversionResponse(
                from_currency=request.from_currency,
                to_currency=request.to_currency,
                amount=request.amount,
                exchange_rate=data.get("conversion_rate", 0),
                converted_amount=data.get("conversion_result", 0),
                timestamp=str(data.get("time_last_update_unix", "")),
                success=True
            )
            
            logger.info(f"Successfully converted {request.amount} {request.from_currency} to {request.to_currency}")
            return conversion_response
            
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error occurred: {e}")
        raise HTTPException(status_code=503, detail="External API service unavailable")
    except httpx.RequestError as e:
        logger.error(f"Request error occurred: {e}")
        raise HTTPException(status_code=503, detail="Failed to connect to exchange rate service")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/currencies")
async def get_supported_currencies():
    """
    Get list of supported currencies.
    """
    try:
        async with httpx.AsyncClient() as client:
            url = f"{BASE_URL}/codes"
            response = await client.get(url)
            response.raise_for_status()
            
            data = response.json()
            
            if data.get("result") != "success":
                raise HTTPException(status_code=400, detail="Failed to fetch currency codes")
            
            return {
                "supported_codes": data.get("supported_codes", []),
                "success": True
            }
            
    except Exception as e:
        logger.error(f"Error fetching currencies: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch supported currencies")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
