async function generateApp() {
  const userPrompt = document.getElementById('appPrompt').value;
  const generatedCodeElement = document.getElementById('generatedCode');
  const appPreview = document.getElementById('appPreview');

  if (!userPrompt) {
    alert("Please enter a description of the app you want.");
    return;
  }

  generatedCodeElement.textContent = "Generating your app... Please wait.";

  try {
    const response = await fetch("http://127.0.0.1:5000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: userPrompt })
    });

    const data = await response.json();
    if (data.error) {
      generatedCodeElement.textContent = "Error: " + data.error;
      return;
    }

    generatedCodeElement.textContent = data.code;

    const blob = new Blob([data.code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    appPreview.src = url;

  } catch (error) {
    console.error("Error:", error);
    generatedCodeElement.textContent = "Error generating the app. Please try again.";
  }
}