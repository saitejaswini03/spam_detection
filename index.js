// Sample function to check for suspicious words or phrases
function checkForSpam(email) {
    const suspiciousPatterns = [
        "urgent", "verify", "click here", "login now", "update account",
        "bank details", "processing fee", "send money", "claim your prize", 
        "suspicious activity", "action required"
    ];

    let spamScore = 0;
    suspiciousPatterns.forEach(pattern => {
        if (email.body.toLowerCase().includes(pattern)) {
            spamScore += 1;
        }
    });

    if (spamScore > 2) {
        return "High Spam Risk";
    } else if (spamScore > 0) {
        return "Medium Spam Risk";
    } else {
        return "Low Spam Risk";
    }
}

// Example use case
const result = checkForSpam(phishingEmail);
console.log(result); // Output: High Spam Risk
7