# Employment System

This project is an employment system that allows employers to manage job vacancies and applicants to apply for them. Below is a detailed guide on setting up and using the system.

---

## Features

### For Employers:
- **CRUD Operations for Vacancies**:
  - Create, read, update, and delete vacancies.
  - Vacancies have a maximum number of allowed applications.
  - Employers can post and deactivate vacancies.
  - Vacancies should have an expiry date; expired vacancies are automatically deactivated.
  - View the list of applicants for a specific vacancy.

### For Applicants:
- **Search for Vacancies**:
  - Applicants can search and view available vacancies.
- **Apply for Vacancies**:
  - Applicants can apply for a vacancy if it hasn’t exceeded the maximum number of allowed applications.
  - Applicants can apply for only one vacancy every 24 hours.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abdallah-Mobarak/employment-system---v1.0.git
   ```

2. Navigate to the project directory:
   ```bash
   cd employment-system---v1.0
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and configure the following variables:
  

5. Run database migrations or seed scripts if needed.

6. Start the application:
   ```bash
   npm start
   ```

---

## Endpoints



### Authentication Endpoints

#### 1. Register
- **Method**: POST  
- **URL**: `api/users/register`  
- **Body**:
  ```json
  {
    "username": "john_doe",
    "password": "secure_password",
    "role": "employer"
  }
  ```

#### 2. Login
- **Method**: POST  
- **URL**: `/api/users/login`  
- **Body**:
  ```json
  {
    "username": "john_doe",
    "password": "secure_password"
  }
  ```

---

### Employer Endpoints

#### 1. Create a Vacancy
- **Method**: POST  
- **URL**: `/api/users/newVacancy`  
- **Body**:
  ```json
  {
    "title": "Software Engineer",
    "description": "Develop and maintain applications",
    "maxApplications": 10,
    "expiryDate": "2024-12-31"
  }
  ```

#### 2. Get All Vacancies
- **Method**: GET  
- **URL**: `/api/vacancies`

#### 3. Get Vacancy by ID
- **Method**: GET  
- **URL**: `/api/vacancies/:id`

#### 4. Update a Vacancy
- **Method**: PUT  
- **URL**: `/api/vacancies/:id`  
- **Body**:
  ```json
  {
    "title": "Updated Title",
    "description": "Updated description",
    "maxApplications": 15
  }
  ```

#### 5. Deactivate a Vacancy
- **Method**: PATCH  
- **URL**: `/api/users/vacancyOff/:id`

#### 6. Delete a Vacancy
- **Method**: DELETE  
- **URL**: `/api/vacancy/:id`

#### 7. View Applicants for a Vacancy
- **Method**: GET  
- **URL**: `/api/users/vacancyForApplicants/:id`

### Applicant Endpoints

#### 1. Search for Vacancies
- **Method**: GET  
- **URL**: `/api/vacancies/search?query=<search_term>`

#### 2. Apply for a Vacancy
- **Method**: POST  
- **URL**: `/api/users/apply`  
- **Body**:
  ```json
  {
    "vacancyId": "6765bddf73846bd87c91f698"
  }
  ```


## Validation Rules

1. **Vacancy Creation/Update**:
   - `expiryDate` must be a future date.
   - `maxApplications` must be a positive integer.

2. **Application**:
   - Cannot apply for a vacancy if:
     - The vacancy is inactive.
     - The vacancy has reached its maximum number of applications.
   - Cannot apply for more than one vacancy within 24 hours.

---
## Project Structure
```
.
├── controllers          # API controllers
├── middleware           # Custom middleware (auth, error handling, etc.)
├── models               # Mongoose models
├── routes               # API route definitions
├── utils                # Utility functions
├── .env.example         # Example environment variables
├── server.js            # Entry point of the application
└── README.md            # Project documentation
```


## Author
[Abdallah Mobarak](https://github.com/Abdallah-Mobarak)

---
Feel free to contribute or raise issues on the repository!
