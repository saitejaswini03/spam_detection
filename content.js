// Function to inject a warning banner into Gmail
function showWarning(riskLevel) {
    let banner = document.createElement("div");
    banner.style.background = riskLevel === "high" ? "red" : "orange";
    banner.style.color = "white";
    banner.style.padding = "10px";
    banner.style.position = "fixed";
    banner.style.top = "0";
    banner.style.width = "100%";
    banner.style.textAlign = "center";
    banner.style.zIndex = "1000";
    banner.innerText =
        riskLevel === "high"
            ? "⚠️ Warning: This email is highly suspicious!"
            : "⚠️ Caution: This email may be suspicious.";
    document.body.prepend(banner);
}

// Function to analyze email content for phishing patterns
function analyzeEmail() {
    let emailBody = document.querySelector(".a3s"); // Gmail email content container
    if (!emailBody) return;

    let emailText = emailBody.innerText.toLowerCase();
    let suspiciousPatterns = ["urgent", "verify", "click here", "login now", "update account"];
    let suspiciousLinks = emailBody.querySelectorAll("a");

    // Check for suspicious words
    let phishingScore = 0;
    for (let pattern of suspiciousPatterns) {
        if (emailText.includes(pattern)) {
            phishingScore += 1;
        }
    }

    // Check for suspicious links
    suspiciousLinks.forEach((link) => {
        let href = link.href;
        if (href && !href.startsWith("https://")) {
            phishingScore += 1;
        }
    });

    // Determine risk level
    if (phishingScore >= 3) {
        showWarning("high");
    } else if (phishingScore >= 1) {
        showWarning("medium");
    }
}

// Run email analysis when the email content is loaded
setTimeout(analyzeEmail, 3000);
