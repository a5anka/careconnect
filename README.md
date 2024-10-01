# CareConnect: Medical Appointment Booking System

CareConnect is a medical appointment booking system designed to streamline the process of scheduling healthcare appointments. It features a web interface for patients and a backend for managing appointments, including automated email reminders to ensure patients stay informed about their upcoming visits.

## Prerequisites

Before you start, make sure you have:

1. **GitHub Account**
   - Ensure you have a GitHub account. Sign up or log in here: [GitHub](https://github.com/)
2. **Microsoft Visual Studio Code**
   - Download and install Visual Studio Code if not already installed: [VSCode](https://code.visualstudio.com/)
   - Install the WSO2 Ballerina plugin from the VSCode extensions marketplace.
3. **Git**
   - Install Git for version control. Follow the installation guide here: [Git](https://git-scm.com/downloads)
4. **Web Browser**
   - A recent version of Google Chrome or Mozilla Firefox is required.
5. **Choreo Account**
    - Sign up for a Choreo account to integrate and deploy services efficiently.

## Architecture Overview

CareConnect utilizes the Backend for Frontend (BFF) pattern to create a seamless connection between the frontend web application and the backend services. The architecture is divided into two primary domains:

- **Web Portal**: Handles user interactions and presents a responsive interface for appointment management.
- **Appointment Management**: Backend domain that orchestrates appointment scheduling, reminders, and database interactions.

![Usecase Diagram](doc/usecase.png)

### Project Setup Guidance 
[Set up guidance](/doc/training_guide.pdf)
