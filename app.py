from flask import Flask, jsonify, render_template
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/cards')
def get_cards():
    response = requests.get('https://pokeapi.co/api/v2/pokemon?limit=16')
    data = response.json()
    cards = [{'id': i, 'name': pokemon['name'], 'image': f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{i + 1}.png"} for i, pokemon in enumerate(data['results'])]
    return jsonify(cards)

if __name__ == '__main__':
    app.run(debug=True)
