import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

def run_ml_pipeline(csv_path):
    print("\n[INFO] Starting ML Fundamental Analysis Pipeline...")

    # PHASE 1: Data Ingestion & Cleaning
    print(f"[INFO] Loading raw data from {csv_path}")
    df = pd.read_csv(csv_path)
    initial_rows = len(df)
    
    # Drop rows with missing critical financial metrics (This proves your cleaning logic works)
    df = df.dropna(subset=['Return_on_Equity', 'Sales_Growth_5Yr', 'Profit_Growth_5Yr'])
    cleaned_rows = len(df)
    print(f"[SUCCESS] Data cleaned. Dropped {initial_rows - cleaned_rows} corrupted/incomplete rows.")

    # PHASE 2: Feature Engineering (The Custom Score)
    print("[INFO] Engineering Custom Fundamental Score...")
    df['Fundamental_Score'] = (df['Return_on_Equity'] * 0.4) + \
                              (df['Sales_Growth_5Yr'] * 0.3) + \
                              (df['Profit_Growth_5Yr'] * 0.3)

    # Create Target Variable (1 = Strong Buy if Score > 15, else 0 = Hold/Sell)
    df['Target_Classification'] = np.where(df['Fundamental_Score'] > 15, 1, 0)

    # PHASE 3: The Machine Learning Pipeline
    features = ['Return_on_Equity', 'Sales_Growth_5Yr', 'Profit_Growth_5Yr', 'Debt_to_Equity']
    X = df[features]
    y = df['Target_Classification']

    # 80/20 Train-Test Split (Hiding 20% of data to prevent overfitting)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("[INFO] Initializing and Training Random Forest Classifier (100 Trees)...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train) # The CPU spikes here - this is where the AI actually learns

    # PHASE 4: Evaluation & Output
    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    print(f"[SUCCESS] Model trained! Real-world Test Accuracy: {accuracy * 100:.2f}%")

    # Show a sneak peek of the final data
    print("\n--- SAMPLE OUTPUT READY FOR DATABASE ---")
    print(df[['Company', 'Fundamental_Score', 'Target_Classification']])

    # In a full production environment, this is where you'd write to the DB:
    # print("\n[INFO] Pushing final classifications to the PostgreSQL/MySQL database...")
    # df.to_sql('ipo_ml_predictions', con=database_engine, if_exists='replace')

if __name__ == "__main__":
    # Point this to the CSV file you just created
    run_ml_pipeline(r"C:\Users\Dell\OneDrive\Desktop\Internship Projects\Machine Learning\data\nifty100_keystats.csv")