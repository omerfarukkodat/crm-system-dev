
# JEKIRDEK - CRM System Development

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
  git clone https://github.com/omerfarukkodat/crm-dev
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
![Screenshot 2](https://github.com/omerfarukkodat/aaa/blob/769f0c0304a53dd1fd26e0cfda279c1a96706d1c/Ekran%20Resmi%202024-09-10%20O%CC%88S%207.26.41.png)

### Screenshot 2
![Screenshot 3](https://github.com/omerfarukkodat/aaa/blob/769f0c0304a53dd1fd26e0cfda279c1a96706d1c/Ekran%20Resmi%202024-09-10%20O%CC%88S%207.28.14.png)

### Screenshot 3

![Screenshot 2](https://github.com/omerfarukkodat/aaa/blob/769f0c0304a53dd1fd26e0cfda279c1a96706d1c/Ekran%20Resmi%202024-09-10%20O%CC%88S%207.28.46.png)

### Screenshot 4
![Screenshot 5](https://github.com/omerfarukkodat/aaa/blob/769f0c0304a53dd1fd26e0cfda279c1a96706d1c/Ekran%20Resmi%202024-09-10%20O%CC%88S%207.29.04.png)

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
  



