from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the model
model = pickle.load(open("Model/crop_model.pkl", "rb"))

@app.route('/')
def home():
    return "Farm Assist Backend Running"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    try:
        features = [
            float(data['nitrogen']),
            float(data['phosphorus']),
            float(data['potassium']),
            float(data['temperature']),
            float(data['humidity']),
            float(data['ph']),
            float(data['rainfall'])
        ]

        prediction = model.predict([features])[0]
        return jsonify({'prediction': prediction})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
