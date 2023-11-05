# SmartStrom

SmartStrom is a platform designed to compare annual electricity costs based on user-input consumption in kWh. It consists of two main components: a backend built with Node.js, Express, and MySQL for managing tariffs and calculations, and a frontend developed using Angular for a user-friendly interface.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running the Backend](#running-the-backend)
  - [Running the Frontend](#running-the-frontend)
  - [Running with Docker](#running-with-docker)
- [Usage](#usage)
  - [Using the Frontend](#using-the-frontend)
  - [API Endpoints](#api-endpoints)

## Getting Started

### Prerequisites

Before you start, make sure you have the following software installed on your system:

- Node.js and npm
- Docker (if you plan to run with Docker)

### Running the Backend

1. Navigate to the `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on the provided `.env.example`. Update it with your database configuration.
4. Run the database setup and migrations: `npm run create-db` and `npm run migrate`
5. Start the server: `npm start`


### Running the Frontend

1. Navigate to the `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Angular development server: `npm start`


The frontend will be accessible at [http://localhost:4200](http://localhost:4200).

### Running with Docker

If you prefer to run the entire project with Docker:

1. Ensure Docker is installed on your system.
2. Navigate to the project root directory.
3. Create a `.env` file based on the provided `.env.example` inside /backend. Update it with your database configuration.
4. Run the following command to build the containers: `docker-compose up`
5. To start the containers: `docker-compose start`
6. The frontend will be accessible at [http://localhost:4200](http://localhost:4200).
7. To stop the Docker containers: `docker-compose down`


## Usage

### Using the Frontend

- Access the frontend at [http://localhost:4200](http://localhost:4200).
- On home page, enter your annual consumption in kWh and click "Submit".
- You can log in with the following credentials at [http://localhost:4200/#/login](http://localhost:4200/#/login) :
    - Email: `admin@mail.com`
    - Password: `password`
- Once logged in, you can view, add, edit, and delete tariffs.

### API Endpoints

#### Authentication

- `POST api/auth/login`: Authenticate a user and return a token. This endpoint is used in the app.
- `POST api/auth/register`: Register a new user. 

The request body should be a JSON object with the following properties:
    - `email`: The user's email address. For example, "admin@email.com".
    - `password`: The user's password. For example, "password".

Example request body:

```json
{
        "email": "admin@email.com",
        "password": "password"
}
```

#### Products

- `GET api/product/calculate-cost?consumption=3500`: Calculate the cost based on the provided consumption.
- `POST api/product/insert-product`: Insert a new product.
- `PUT api/product/update-product/:id`: Update a product with the given ID.
- `POST api/product/delete-products`: Delete products.
- `GET api/product/get-products`: Get all products.

Each endpoint may require specific parameters or body content. Please check the [API documentation](https://documenter.getpostman.com/view/9802662/2s9YXfaNdF) for more information.

