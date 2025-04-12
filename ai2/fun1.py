from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# ✅ Load environment variables from xyz.env
load_dotenv(dotenv_path="xyz.env")

app = Flask(__name__)
CORS(app)

# ✅ Load the API key from environment
api_key = os.environ.get("GEMINI_API_KEY")
print("🔑 Loaded API Key:", api_key)  # Debug print

# Gemini model
model = "gemini-2.0-flash"

def generate_text(prompt):
    if not api_key:
        return "❌ API key not loaded. Check your xyz.env file."

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
    headers = {'Content-Type': 'application/json'}
    data = {
        "contents": [{
            "parts": [{"text": prompt}]
        }]
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        result = response.json()

        if ('candidates' in result and result['candidates'] and
            'content' in result['candidates'][0] and
            'parts' in result['candidates'][0]['content']):
            return result['candidates'][0]['content']['parts'][0]['text']
        else:
            return "⚠️ Unexpected API response structure."
    except Exception as e:
        print("❌ API error:", e)
        return "Error communicating with Gemini API."

@app.route("/generate-recipe", methods=["POST"])
def generate_recipe():
    data = request.get_json()
    query = data.get("query", "")
    if not query:
        return jsonify({"error": "No query provided"}), 400

    prompt = f"""Generate a recipe for "{query}".

Please format the recipe with the following sections:

Recipe: (Title)

Ingredients:
* (List each ingredient)

Equipment:
* (List each item)

Instructions:
1. (Step by step)
"""
    result = generate_text(prompt)
    return jsonify({"recipe": result})

if __name__ == "__main__":
    app.run(debug=True)
