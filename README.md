# Superheroes API Project

## Overview
This project is a simple API and database setup that allows for the creation, retrieval, and management of superheroes and their roles. The project fulfills the following requirements:

1. **API Endpoints**:
    - A POST endpoint to add new superheroes to the database.
    - A GET endpoint to retrieve superheroes and their roles.
    - A GET endpoint to retrieve superheroes by their ID.
2. **Database**:
    - A SQL database with two tables: `superheroes` and `roles`.
3. **Join Tables**:
    - A GET endpoint that retrieves superheroes with their associated roles by performing a SQL join.
4. **Flexible Data**:
    - Data stored includes superhero names, power levels, and their role (hero or villain).

## Deliverables

### GitHub Repository
[GitHub Repository Link](https://github.com/TomChrister/database-ca)

### Deployed Website
[Deployed Website Link](https://api-database-five.vercel.app/)

## Instructions to Run the API

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/TomChrister/database-ca
   cd database-ca
   ```

2. **Install Dependencies**:
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Set Up the Database**:
    - Use the following SQL statements to create the database tables:
      ```sql
      CREATE TABLE roles (
          id INT AUTO_INCREMENT PRIMARY KEY,
          role_type VARCHAR(255) NOT NULL
      );
 
      CREATE TABLE superheroes (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          power INT NOT NULL,
          role_id INT,
          FOREIGN KEY (role_id) REFERENCES roles(id)
      );
      ```
    - Populate the `roles` table:
      ```sql
      INSERT INTO roles (role_type) VALUES ('hero'), ('villain');
      ```

4. **Start the Server**:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3010` by default.

## API Endpoints Documentation

### 1. Add a New Superhero
**Endpoint**: `POST /superheroes`

**Request Body**:
```json
{
    "name": "string",
    "power": "number",
    "role_type": "string"
}
```

**Response**:
```json
{
    "status": "success",
    "id": "number"
}
```

### 2. Get All Superheroes with Roles
**Endpoint**: `GET /superheroes`

**Response**:
```json
[
    {
        "name": "string",
        "power": "number",
        "role_type": "string"
    }
]
```

### 3. Get a Superhero by ID
**Endpoint**: `GET /superheroes/:id`

**Response**:
```json
{
    "id": "number",
    "name": "string",
    "power": "number",
    "role_id": "number"
}
```

## Technologies Used
- **Node.js**
- **Express.js**
- **MySQL**

## Additional Notes
- Ensure you update the `.env` file with your database credentials:
  ```
  DB_HOST=your-database-host
  DB_USER=your-database-username
  DB_PASSWORD=your-database-password
  DB_NAME=your-database-name
  ```
- If deploying, configure the `BASE_URL` in your frontend code to point to the deployed API URL.
