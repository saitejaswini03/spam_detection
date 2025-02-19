// manifest.json
{
  "manifest_version": 3,
  "name": "Gmail Phishing Detector",
  "version": "1.0",
  "permissions": ["storage", "activeTab", "scripting"],
  "host_permissions": ["https://mail.google.com/*"],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["https://mail.google.com/*"],
      "js": ["content.js"],
      "run_at": "document_end"
    }
  ],
  "action": {
    "default_popup": "popup.html"
  }
}
// content.js
function showWarning() {
    let banner = document.createElement("div");
    banner.style.background = "red";
    banner.style.color = "white";
    banner.style.padding = "10px";
    banner.style.position = "fixed";
    banner.style.top = "0";
    banner.style.width = "100%";
    banner.style.textAlign = "center";
    banner.innerText = "⚠️ Warning: This email may be phishing!";
    document.body.prepend(banner);
}
function analyzeEmail() {
    let emailBody = document.querySelector(".a3s"); // Gmail email content container
    if (!emailBody) return;
    let emailText = emailBody.innerText;
    let suspiciousPatterns = ["urgent", "verify", "click here", "login now", "update account"];
    for (let pattern of suspiciousPatterns) {
        if (emailText.toLowerCase().includes(pattern)) {
            showWarning();
            break;
        }
    }
}
setTimeout(analyzeEmail, 3000);
// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log("Gmail Phishing Detector Extension Installed");
});
