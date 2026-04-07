---

### 2. Machine Learning Pipeline (`Machine Learning/README.md`)

```markdown
# Nifty100 Stock Prediction Pipeline

A machine learning pipeline utilizing a Random Forest Classifier to analyze and predict stock metrics based on Nifty100 key statistics.

## Architecture
* **Language:** Python
* **Core Libraries:** Pandas, NumPy, Scikit-Learn

## Prerequisites
* Python 3.8 or higher
* Git

## Phase 1: Environment Provisioning

1. **Clone and Navigate:**
   Clone the repository and move into the ML context.
   ```bash
   git clone <repository-url>
   cd "Machine Learning"
Establish Virtual Environment:

Bash
python -m venv venv

# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
Install Data Science Primitives:

Bash
pip install pandas numpy scikit-learn
Phase 2: Execution & Training
Verify Dataset:
Ensure that your training data file is correctly positioned at data/nifty100_keystats.csv.

Execute the Model:
Run the prediction script to train the classifier.

Bash
python Stock_Prediction.py
Expected Output: The script will read the CSV, perform train/test splits, train the Random Forest model, and output the model's accuracy score and classification report directly to your terminal.
