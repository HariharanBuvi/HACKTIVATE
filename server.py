from flask import Flask, request, jsonify
import openai

app = Flask(__name__)


openai.api_key = "sk-..."  

@app.route('/generate', methods=['POST'])
def generate_code():
    data = request.json
    user_prompt = data.get("prompt", "")

    if not user_prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an AI that generates web apps based on user input. Provide full HTML, CSS, and JavaScript."},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            max_tokens=1000
        )

        generated_code = response["choices"][0]["message"]["content"]
        return jsonify({"code": generated_code})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
