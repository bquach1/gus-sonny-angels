import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify
from flask_cors import CORS
from helpers import check_weird_caps

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

url_list = [
    'https://www.sonnyangel.com/products/',
    'https://www.sonnyangel.com/products/mini-figure-gift/',
    'https://www.sonnyangel.com/products/mini-figure-hippers/',
    'https://www.sonnyangel.com/products/mini-figure-limited/',
    'https://www.sonnyangel.com/products/artist-collection/',
    'https://www.sonnyangel.com/master-collection/',
    'https://www.sonnyangel.com/products/others/'
]
headers = {'Accept': 'text/html'}
final_response = ""
for url in url_list:
    final_response += requests.get(url, headers=headers).text
soup = BeautifulSoup(final_response, 'html.parser')

@app.route("/figures", methods=["GET"])
def fetch_figures():
    figures = []
    figure_name_set = set()
    figure_url_set = set()
    for item in soup.find_all('section', class_='inner'):
        for div in item.find_all('div'):
            current_figure = {}
            series_element = div.find("div", {"class": "tabcontent"})
            
            # Check for series elements and update current_figure["series"] if found
            if series_element:
                current_figure["series"] = series_element.find_previous_sibling().text

            # Process figcaption elements
            for caption in div.find_all('figcaption'):
                current_figure["caption"] = caption.text

            # Process img elements
            for img in div.find_all('img'):
                if img:
                    current_figure["series"] = img.find_parent().find_parent().find_parent().find_parent().find_parent().find_previous_sibling().text
                    current_figure["image"] = img.get('data-src-fg')
            
            # Validate and add current_figure to figures list
            if current_figure and current_figure.get("caption") and not (current_figure["caption"] in figure_name_set and current_figure["image"] in figure_url_set):
                normalized_caption = check_weird_caps(current_figure.get("caption"))
                # if normalized_caption not in figure_name_set and normalized_caption + "s" not in figure_name_set:
                figure_name_set.add(normalized_caption)
                figure_url_set.add(current_figure["image"])
                current_figure["caption"] = normalized_caption
                figures.append(current_figure)
    return jsonify(figures)

if __name__ == "__main__":
    app.run(debug=True, port=3004)
