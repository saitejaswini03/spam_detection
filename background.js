// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "analyzeEmail") {
        // Perform background analysis (e.g., API calls or ML model processing)
        sendResponse({ status: "success", riskLevel: "medium" });
    }
});
