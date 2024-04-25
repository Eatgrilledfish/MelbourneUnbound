import requests

def search_place_details(api_key, restaurant_name, address):
    """
    Search for a specific place using Google Places API by combining the restaurant name and address.

    Args:
        api_key (str): Your Google API key.
        restaurant_name (str): Name of the restaurant.
        address (str): Address of the restaurant.

    Returns:
        dict: The search results returned by the Google Places API.
    """
    url = "https://places.googleapis.com/v1/places:searchText"
    headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': api_key,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.types,places.rating'
    }
    
    full_query = f"{restaurant_name} {address}"
    data = {
        'textQuery': full_query
    }
    
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200:
        return response.json()  # Successfully received the JSON response from the API
    else:
        print(f"Failed to retrieve place details: {response.status_code} - {response.text}")
        return None

# Example usage
if __name__ == "__main__":
    api_key = 'AIzaSyBoLkW6O9ol1GFkd55Pds8wMQEju47FI2A'  # Replace YOUR_API_KEY with your actual Google API key
    restaurant_name = "Abbot's Seafood"
    address = "253 Abbotsford Street NORTH MELBOURNE VIC 3051"
    
    results = search_place_details(api_key, restaurant_name, address)
    print(results)
