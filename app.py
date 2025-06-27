from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle

# List of features in the order expected by the model
FEATURES = [
    'DerogCnt', 'CollectCnt', 'BanruptcyInd', 'InqCnt06', 'InqTimeLast',
    'InqFinanceCnt24', 'TLTimeFirst', 'TLTimeLast', 'TLCnt03', 'TLCnt12',
    'TLCnt24', 'TLCnt', 'TLSum', 'TLMaxSum', 'TLSatCnt', 'TLDel60Cnt',
    'TLBadCnt24', 'TL75UtilCnt', 'TL50UtilCnt', 'TLBalHCPct', 'TLSatPct',
    'TLDel3060Cnt24', 'TLDel90Cnt24', 'TLDel60CntAll', 'TLOpenPct',
    'TLBadDerogCnt', 'TLDel60Cnt24', 'TLOpen24Pct'
]

app = Flask(__name__)
CORS(app)

# Load the trained Random Forest model at startup
with open('rf_model.pkl', 'rb') as f:
    model = pickle.load(f)

# For demonstration, use means from training (should be replaced with actual means)
# Here, we use zeros as placeholder; ideally, store means during training and load here
FEATURE_MEANS = {feature: 0 for feature in FEATURES}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    # Validate input
    missing = [f for f in FEATURES if f not in data]
    if missing:
        return jsonify({'error': f'Missing features: {missing}'}), 400

    # Prepare input in the correct order, fill missing with mean if needed
    input_data = []
    for feature in FEATURES:
        value = data.get(feature, FEATURE_MEANS[feature])
        if value is None:
            value = FEATURE_MEANS[feature]
        input_data.append(float(value))
    X = np.array(input_data).reshape(1, -1)

    # Predict probability and class
    prob = model.predict_proba(X)[0][1]  # Probability of class 1 (good)
    pred = int(model.predict(X)[0])

    # Classify
    if prob > 0.8:
        label = 'Excellent'
    elif prob > 0.5:
        label = 'Good'
    else:
        label = 'Poor'

    return jsonify({
        'predicted_class': pred,
        'probability': prob,
        'credit_score_label': label
    })

@app.route('/')
def home():
    return 'Credit Scoring Model API is running!'

if __name__ == '__main__':
    app.run(debug=True) 