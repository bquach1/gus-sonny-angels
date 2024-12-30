import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from helpers import check_weird_caps
from dotenv import load_dotenv
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, support_credentials=True)

load_dotenv()

# MongoDB client setup
client = MongoClient(
    os.getenv("MONGODB_URI"), ssl=True, tlsAllowInvalidCertificates=True
)
db = client.get_database("figures")

collection = db["items"]

# URLs to scrape
url_list = [
    "https://www.sonnyangel.com/products/",
    "https://www.sonnyangel.com/products/mini-figure-gift/",
    "https://www.sonnyangel.com/products/mini-figure-hippers/",
    "https://www.sonnyangel.com/products/mini-figure-limited/",
    "https://www.sonnyangel.com/products/artist-collection/",
    "https://www.sonnyangel.com/master-collection/",
    "https://www.sonnyangel.com/products/others/",
]

headers = {"Accept": "text/html"}
final_response = ""
for url in url_list:
    final_response += requests.get(url, headers=headers).text

soup = BeautifulSoup(final_response, "html.parser")


@app.route("/figures", methods=["GET", "POST"])
def fetch_figures():
    figures = []
    figure_name_set = set()
    figure_url_set = set()
    for item in soup.find_all("section", class_="inner"):
        for div in item.find_all("div"):
            current_figure = {}
            series_element = div.find("div", {"class": "tabcontent"})

            if series_element:
                current_figure["series"] = series_element.find_previous_sibling().text

            for caption in div.find_all("figcaption"):
                current_figure["caption"] = caption.text

            for img in div.find_all("img"):
                if img:
                    current_figure["series"] = (
                        img.find_parent()
                        .find_parent()
                        .find_parent()
                        .find_parent()
                        .find_parent()
                        .find_previous_sibling()
                        .text
                    )
                    current_figure["image"] = img.get("data-src-fg")

            if (
                current_figure
                and current_figure.get("caption")
                and not (
                    current_figure["caption"] in figure_name_set
                    and current_figure["image"] in figure_url_set
                )
            ):
                normalized_caption = check_weird_caps(current_figure.get("caption"))
                figure_name_set.add(normalized_caption)
                figure_url_set.add(current_figure["image"])
                current_figure["caption"] = normalized_caption
                figures.append(current_figure)
    return jsonify(figures)


@app.route("/add_figures", methods=["POST"])
def add_figures():
    figure = request.get_json()

    collection.insert_one(figure)

    return jsonify({"message": "Figures added to the database successfully."}), 201


if __name__ == "__main__":
    app.run(debug=True, port=3004)
