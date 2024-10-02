
# CRM System Development

## Project Overview
This project is a CRM system for managing customer data. It is built using Spring Boot for the backend, MySQL as the database, and React.js for the frontend. The system includes basic CRUD operations, user authentication (login/logout), and the ability to filter customers by various criteria.

## Technologies
- **Backend:** Java, Spring Boot
- **Database:** MySQL
- **Frontend:** React.js
- **UI Library:** Chakra UI
- **API Documentation:** OpenAPI

## API Endpoints

### Customer Management /api/v1/customers

| HTTP Method | Endpoint                 | Description                    |
|-------------|--------------------------|--------------------------------|
| PUT         | /{customerId}            | Update a customer by ID.       |
| DELETE      | /{customerId}            | Delete a customer by ID.       |
| GET         | /                        | Retrieve all customers.        |
| POST        | /                        | Create a new customer.         |
| GET         | /{customerId}            | Find a customer by ID.         |
| GET         | /filter                  | Filter customers based on criteria. |

### Authentication /api/v1/auth

| HTTP Method | Endpoint                 | Description                    |
|-------------|--------------------------|--------------------------------|
| POST        | /register                | Register a new user.           |
| POST        | /authenticate            | Authenticate a user and issue a token. |


## Schemas

- **CustomerRequest**: Request body for creating/updating a customer.
- **CustomerResponse**: Response body for customer data.
- **RegistrationRequest**: Request body for user registration.
- **AuthenticateRequest**: Request body for user authentication.
- **AuthenticateResponse**: Response body for authentication.
- **PageResponseCustomerResponse**: Paginated response for customer data.

## Setup

### Backend
project

```bash
  git clone https://github.com/omerfarukkodat/crm-system-dev
```

### For Backend Services:
- You should go to **crm-dev/** to run docker compose file.

```bash
  docker-compose up
```


- Open **crm-system-development** folder in your preferred IDE. Go to terminal and run command below for all services in the project.

```bash
  mvn clean install
```


### For FrontEnd:

- Open **crm-fe** folder in your preferred IDE or Editor. Go to terminal.
```bash
  npm start
```

It is as easy as explained above. Now we are ready to see front end.


## Screenshots


### Screenshot 1

<img width="1440" alt="Ekran Resmi 2024-09-11 ÖS 5 39 38" src="https://github.com/user-attachments/assets/9803274d-5cd8-4c2c-a32d-abe78e20cbea">

### Screenshot 2

<img width="1434" alt="Ekran Resmi 2024-09-11 ÖS 5 40 45" src="https://github.com/user-attachments/assets/da4ab00a-4761-42a1-a32a-2172ad647c11">

### Screenshot 3

<img width="1436" alt="Ekran Resmi 2024-09-10 ÖS 7 28 14" src="https://github.com/user-attachments/assets/6729e263-44a1-4d6b-9681-e13371fa900e">

### Screenshot 4

<img width="1440" alt="Ekran Resmi 2024-09-10 ÖS 7 28 46" src="https://github.com/user-attachments/assets/7a91b7ba-7f57-47a6-a6cf-a7765eb08752">

### Screenshot 5
<img width="1439" alt="Ekran Resmi 2024-09-10 ÖS 7 29 04" src="https://github.com/user-attachments/assets/5cdcead8-2f53-4eda-8a60-b7153cf4089a">

## Contact

### Omer Faruk Kodat

<a href="https://github.com/omerfarukkodat" target="_blank">
<img  src=https://img.shields.io/badge/github-%2324292e.svg?&style=for-the-badge&logo=github&logoColor=white alt=github style="margin-bottom: 20px;" />
</a>
<a href = "mailto:farukkodat@gmail.com?subject = Feedback&body = Message">
<img src=https://img.shields.io/badge/send-email-email?&style=for-the-badge&logo=microsoftoutlook&color=CD5C5C alt=microsoftoutlook style="margin-bottom: 20px; margin-left:20px" />
</a>
<a href="https://linkedin.com/in/omerfarukkodat" target="_blank">
<img src=https://img.shields.io/badge/linkedin-%231E77B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white alt=linkedin style="margin-bottom: 20px; margin-left:20px" />
</a>  


<br />

## Jekirdek - Crm System Development
  



