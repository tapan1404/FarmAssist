import { useState } from 'react';
import axios from 'axios';
import './CropForm.css';

export default function CropForm() {
  const [form, setForm] = useState({
    nitrogen: '', phosphorus: '', potassium: '',
    temperature: '', humidity: '', ph: '', rainfall: ''
  });
  const [prediction, setPrediction] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/predict', form);
      setPrediction(res.data.prediction);
    } catch (error) {
      console.error('Prediction error:', error);
    }
  };

  const getCardStyle = () => {
    const temp = parseFloat(form.temperature);
    if (temp < 20) return { background: '#cce5ff', color: '#004085' };
    if (temp > 30) return { background: '#fff3cd', color: '#856404' };
    return { background: '#d4edda', color: '#155724' };
  };

  return (
    <div className="form-wrapper">
      <h2>🌱 Crop Recommendation</h2>
      <form className="crop-form" onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            required
            type="number"
            step="any"
          />
        ))}
        <button type="submit">Predict Crop</button>
      </form>

      {prediction && (
        <div className="result-card" style={getCardStyle()}>
          🌾 Recommended Crop: <strong>{prediction}</strong>
        </div>
      )}
    </div>
  );
}
