// Function to process the resume text and calculate the similarity
function analyzeResume() {
    const resumeText = document.getElementById("resumeText").value;

    if (resumeText.trim() === "") {
        alert("Please fill in the resume text.");
        return;
    }

    // Simple text matching algorithm for this example (cosine similarity could be used in a real implementation)
    const similarityScore = getSimilarityScore(resumeText);

    // Show the results
    document.getElementById("similarityScore").innerText = `Similarity Score: ${similarityScore.toFixed(2)}`;
    document.getElementById("feedback").innerText = getFeedback(similarityScore);

    // Show the result section
    document.getElementById("result").classList.remove("hidden");
}

// Function to calculate a basic "similarity" score by comparing word frequency
function getSimilarityScore(resume) {
    const resumeWords = resume.toLowerCase().split(/\s+/);

    // For simplicity, we'll assume a static example of a "matchable" resume
    const exampleWords = ["python", "developer", "machine", "learning", "software", "engineer"];

    const commonWords = resumeWords.filter(word => exampleWords.includes(word));
    const totalWords = new Set([...resumeWords, ...exampleWords]);

    return commonWords.length / totalWords.size;
}

// Function to generate feedback based on the similarity score
function getFeedback(similarityScore) {
    if (similarityScore > 0.8) {
        return "Great match! Your resume is highly relevant to the job description.";
    } else if (similarityScore > 0.5) {
        return "Good match. You might want to adjust some areas for better alignment.";
    } else {
        return "Low match. Consider tailoring your resume to include more relevant skills and experience.";
    }
}

// Event listener for the "Analyze Resume" button
document.getElementById("analyzeBtn").addEventListener("click", analyzeResume);

// Chatbot functionality
const chatOutput = document.getElementById("chatOutput");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

function appendMessage(message, sender) {
    const div = document.createElement("div");
    div.classList.add(sender);
    div.textContent = message;
    chatOutput.appendChild(div);
    chatOutput.scrollTop = chatOutput.scrollHeight; // Scroll to the latest message
}

sendBtn.addEventListener("click", () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        appendMessage(userMessage, "user");
        getChatbotResponse(userMessage);
        chatInput.value = ""; // Clear the input
    }
});

function getChatbotResponse(message) {
    let response = "Sorry, I didn't understand that.";
    if (message.toLowerCase().includes("analyze resume")) {
        response = "Sure! Please paste your resume text to get started.";
    } else if (message.toLowerCase().includes("similarity score")) {
        response = "The similarity score reflects how well your resume matches a sample job description.";
    } else if (message.toLowerCase().includes("help")) {
        response = "I'm here to help you analyze your resume! You can ask for the similarity score or resume feedback.";
    }

    // Simulate a delay before chatbot responds
    setTimeout(() => {
        appendMessage(response, "bot");
    }, 1000);
}
