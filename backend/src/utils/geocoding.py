import urllib.request
import urllib.parse
import json
import logging
from typing import Optional, Tuple

logger = logging.getLogger(__name__)

def geocode_address_nominatim(address: str) -> Optional[Tuple[float, float]]:
    """
    Geocodes physical address to coordinates (lat, lng) using Nominatim OpenStreetMap API.
    Returns (lat, lng) tuple or None if geocoding fails.
    """
    if not address or not address.strip():
        return None
        
    try:
        # Append Ho Chi Minh City, Vietnam to prioritize correct region
        full_query = f"{address.strip()}, Ho Chi Minh City, Vietnam"
        encoded_query = urllib.parse.quote(full_query)
        url = f"https://nominatim.openstreetmap.org/search?q={encoded_query}&format=json&limit=1"
        
        req = urllib.request.Request(
            url,
            headers={
                # User-Agent is strictly required by Nominatim Acceptable Use Policy
                "User-Agent": "SmartDroneDelivery/1.0 (contact@smartdrone.vn)",
                "Accept-Language": "vi"
            }
        )
        
        with urllib.request.urlopen(req, timeout=10) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                if data and len(data) > 0:
                    lat = float(data[0]["lat"])
                    lon = float(data[0]["lon"])
                    logger.info(f"Geocoded address '{address}' success: ({lat}, {lon})")
                    return lat, lon
            
            logger.warning(f"Geocoding returned status: {response.status}")
    except Exception as e:
        logger.error(f"Error geocoding address '{address}' via Nominatim: {e}", exc_info=True)
        
    return None
