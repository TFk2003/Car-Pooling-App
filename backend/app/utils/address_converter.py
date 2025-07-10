import requests

def fetch_coordinates(address: str) -> tuple[float, float] | None:
    query = f"{address}, Karachi Division, Pakistan"
    params = {
        "q": query,
        "key": "9416bf2c8b1d4751be6a9a9e94ea85ca",
        "no_annotations": "1",
        "language": "en"
    }

    headers = {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "x-requested-with": "XMLHttpRequest",
        "referer": "https://www.gps-coordinates.net/"
    }

    response = requests.get("https://www.gps-coordinates.net/geoproxy", params=params, headers=headers)

    if response.status_code != 200:
        return None

    data = response.json()

    try:
        geometry = data["results"][0]["geometry"]
        return geometry["lat"], geometry["lng"]
    except (IndexError, KeyError):
        return None
