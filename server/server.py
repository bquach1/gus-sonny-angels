import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})  # Allow requests from http://localhost:3000

url = 'https://www.sonnyangel.com/products/'
headers = {'Accept': 'text/html'}
response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, 'html.parser')

@app.route("/figures", methods=["GET"])
def fetch_figures():
    figures = []
    for item in soup.find_all('section', class_='inner'):
        for div in item.find_all('div'):
            current_figure = {}
            for caption in div.find_all('figcaption'):
                current_figure["caption"] = caption.text
            for img in div.find_all('img'):
                if img:
                    current_figure["image"] = img.get('data-src-fg')
                else:
                    continue
            if current_figure and not current_figure in figures:
                figures.append(current_figure)
    return jsonify(figures)  # Return JSON response

if __name__ == "__main__":
    app.run(debug=True, port=3004)
