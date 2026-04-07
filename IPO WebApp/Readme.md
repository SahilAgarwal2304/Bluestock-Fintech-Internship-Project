
# IPO WebApp User Guide

A Django-based web application for managing and tracking Initial Public Offerings (IPOs).

## Architecture
* **Backend:** Python / Django REST Framework
* **Database:** Relational Database (MySQL or PostgreSQL)

## Prerequisites
Ensure the following are installed on your system:
* Python 3.8 or higher
* A local SQL server (MySQL or PostgreSQL)
* Git

## Phase 1: Environment Provisioning

1. **Clone and Navigate:**
   Clone the repository and move into the project directory.
   ```bash
   git clone <repository-url>
   cd "IPO WebApp"
Isolate Dependencies:
Create and activate a virtual environment to prevent dependency conflicts.

Bash
python -m venv venv

# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
Install Packages:
Install Django and required dependencies.

Bash
pip install django djangorestframework
(Note: If a requirements.txt file is present, use pip install -r requirements.txt instead).

Phase 2: Database Initialization
Create the Database:
Start your local SQL server and create a new database (e.g., ipo_db).

Ingest Existing Data:
Import the provided SQL dump into your new database.

Bash
# Example for MySQL
mysql -u root -p ipo_db < ipo_db.sql

# Example for PostgreSQL
psql -U postgres -d ipo_db -f ipo_db.sql
Configure Django Settings:
Open ipoproject/settings.py, locate the DATABASES dictionary, and update it with your active database credentials (ENGINE, NAME, USER, PASSWORD, HOST, PORT).

Phase 3: Execution
Sync Database State:
Apply any pending Django migrations.

Bash
python manage.py migrate
Boot the Server:
Start the development server.

Bash
python manage.py runserver
Verify Operation:
Open a web browser and navigate to:

Application: http://127.0.0.1:8000/

Admin Panel: http://127.0.0.1:8000/admin/
