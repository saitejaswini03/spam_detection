document.addEventListener("DOMContentLoaded", () => {
    const statusElement = document.getElementById("status");
    const refreshButton = document.getElementById("refresh");

    // Update status based on risk level
    function updateStatus(riskLevel) {
        if (riskLevel === "high") {
            statusElement.textContent = "Fraudulent Email Detected!";
            statusElement.className = "status fraudulent";
        } else if (riskLevel === "medium") {
            statusElement.textContent = "Suspicious Email Detected!";
            statusElement.className = "status suspicious";
        } else {
            statusElement.textContent = "No Issues Found.";
            statusElement.className = "status safe";
        }
    }

    // Simulate fetching risk level (replace with actual logic)
    refreshButton.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "analyzeEmail" }, (response) => {
                updateStatus(response.riskLevel);
            });
        });
    });

    // Initial status check
    updateStatus("low");
});
