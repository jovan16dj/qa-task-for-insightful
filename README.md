
# OrangeHRM Cypress Automation Suite

This project is a comprehensive end-to-end automation suite for [OrangeHRM Demo Site](https://opensource-demo.orangehrmlive.com/).  
It showcases best practices in test design, dynamic data generation, modular structure, and advanced Cypress features.  
Built as part of a QA Automation Engineer interview task.

---

## Project Structure

```
├── cypress
│   ├── downloads
│   ├── e2e
│   │   ├── admin/userManagement.cy.js
│   │   ├── dashboard/dashboard.cy.js
│   │   ├── login/login.cy.js
│   │   ├── myInfo/myInfo-attachments.cy.js
│   │   └── recruitment/recruitment-vacancies.cy.js
│   ├── fixtures
│   │   ├── userData.json
│   │   └── sample.pdf
│   ├── pages
│   │   ├── BasePage.js
│   │   ├── DashboardPage.js
│   │   ├── LoginPage.js
│   │   ├── MyInfoPage.js
│   │   ├── PIMPage.js
│   │   ├── RecruitmentPage.js
│   │   └── UserManagementPage.js
│   └── support
│       ├── commands.js
│       ├── e2e.js
│       ├── routes.js
│       └── utils.js
├── cypress.config.js
├── jsconfig.json
├── package.json
├── .env
└── README.md
```

---

## Test Scenarios Covered

- **Login tests**
  - Valid credentials
  - Invalid credentials
  - Required field validation

- **User Management**
  - Create employee (dynamic faker + fixture names)
  - Add user with faker username/password
  - Edit user (toggle status)
  - Delete user
  - Data-driven user scenarios (`userData.json`)

- **My Info → Attachments**
  - Upload (mocked using `cy.intercept` due to UI limitations)
  - Verify attachment listing
  - Download attachment (visual verification)
  - Delete attachment

- **Dashboard**
  - Validate key widgets (`Time at Work`, `Employee Distribution by Sub Unit`, `Employee Distribution by Location`)
  - Negative assertions on non-existent widgets

- **Recruitment → Vacancies**
  - Search using:
    - Job Title
    - Vacancy (dynamic dropdown selection)
    - Hiring Manager (dynamic dropdown selection)
    - Status
    - Combination of all filters

---

## Dependencies Used

| Dependency | Purpose |
| ---------- | ------- |
| `cypress` | Core E2E test framework |
| `@faker-js/faker` | Dynamic test data generation (usernames, passwords) |
| `cypress-file-upload` | File upload support |
| `mochawesome` | Reporting (HTML + JSON) |
| `dotenv` | Manage environment variables (`.env`) |
| `@cypress/webpack-preprocessor` | Webpack preprocessor for aliases |
| `babel-loader`, `@babel/preset-env` | Required by webpack for transpilation |
| `path` | Node.js native module used for resolving paths in `cypress.config.js` |

---

## Installation & Setup

### Clone the repository:
```bash
git clone <repo-url>
cd <repo-folder>
```

### Install all dependencies:
```bash
npm install --save-dev \
  cypress \
  @faker-js/faker \
  cypress-file-upload \
  mochawesome \
  dotenv \
  @cypress/webpack-preprocessor \
  babel-loader \
  @babel/preset-env
```

### Setup environment variables:
Create a `.env` file:
```env
USERNAME=Admin
PASSWORD=admin123
```

### Verify fixture files exist:
- `cypress/fixtures/sample.pdf` (for attachment tests)  
- `cypress/fixtures/userData.json`:

```json
[
  { "firstName": "Olivia", "lastName": "Taylor", "role": "ESS", "status": "Enabled" },
  { "firstName": "Liam", "lastName": "Walker", "role": "Admin", "status": "Disabled" }
]
```

---

## Running tests

Run all tests headlessly:
```bash
npx cypress run
```

Run interactively:
```bash
npx cypress open
```

Reports generated in:
```
cypress/reports/
```

---

## Design Notes

- Modular **Page Object Model (POM)** structure  
- Dynamic selectors for unstable demo data (`Vacancy`, `Hiring Manager`)  
- `faker` ensures unique user credentials on every run  
- `userData.json` enables clean separation of static employee names from dynamic user credentials  
- Assertions are kept inside test cases for readability and separation of concerns  
- Hybrid UI + API strategy for file upload simulation (`My Info` Attachments) using `cy.intercept`

---

## Future Improvements

- **Data-driven employee creation:**  
  Instead of static employee names from `userData.json`, implement fully dynamic employee records (e.g., Faker + persisted employee ID tracking) to avoid brittle dependencies on existing demo records.

- **Dynamic selector resilience:**  
  Abstract frequently used selectors (e.g., `Employee Id`, `Username`) into centralized locator utility for easier maintenance and adaptation to DOM changes.

- **Advanced search filter tests:**  
  Expand recruitment vacancy filter tests to cover filter combinations dynamically rather than fixed values.

- **Realistic file upload verification:**  
  If API constraints are removed, switch from mock to actual file upload + download validation to fully exercise file handling workflow.

- **Optimized test stability:**  
  Further investigate load-time variability and replace `cy.wait` where possible with robust `cy.intercept` or state assertions.

---

## Known Limitations

- **File upload API limitations:**  
  The OrangeHRM demo environment does not allow reliable direct file uploads via UI/API, so this test uses `cy.intercept` to simulate attachment records.

- **Load-time variability:**  
  The demo site often suffers from slow or inconsistent page loads.  
  To mitigate this, some tests include longer timeouts and additional assertions to stabilize execution.

- **Dynamic dataset volatility:**  
  The shared demo environment means Admin/User/Employee datasets are frequently modified by external users, making some test scenarios inherently brittle.

---
