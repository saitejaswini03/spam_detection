import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report

# Sample dataset
data = {
    'text': [
        "Congratulation! You've won a lottery. Click here to claim.",
        "Your invoice from our recent purchase is attached.",
        "Urgent: Verify your account immediately!",
        "Hello! Just checking in to see how you're doing.",
        "Important: update your payment information.",
        "Meet your new colleague at the office."
    ],
    'label': [1, 0, 1, 0, 1, 0]  # 1 for spam, 0 for not spam
}

# Creating a DataFrame
df = pd.DataFrame(data)
print("Dataset:\n", df)

# Splitting data into features (X) and labels (y)
X = df['text']
y = df['label']

# Splitting dataset into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Vectorizing text using CountVectorizer
vectorizer = CountVectorizer()
X_train_vectorized = vectorizer.fit_transform(X_train)
X_test_vectorized = vectorizer.transform(X_test)

# Initializing and training the model
model = MultinomialNB()
model.fit(X_train_vectorized, y_train)

# Making predictions
y_pred = model.predict(X_test_vectorized)

# Calculating accuracy and classification report
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

# Printing results
print(f"\nAccuracy: {accuracy:.2f}")
print("\nClassification Report:\n", report)