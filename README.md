# SaleMate - RESTful API for Inventory Management and Point of Sales (POS)

Welcome to SaleMate, a RESTful API designed to empower local businesses by providing comprehensive Inventory Management and Point of Sales (POS) solutions. Our mission is to support local businesses in growing and managing their assets with ease, while also enhancing their online presence, automating marketing efforts, and offering customer relationship management (CRM) tools tailored specifically to their needs.

## Overview 
SaleMate is more than just an inventory management system. It's a comprehensive solution tailored specifically for local businesses, focusing on:
- Inventory Management: Easily track, manage, and update your inventory in real-time.
- Point of Sales (POS): Streamline sales transactions, making it simple to manage orders, payments, and customer interactions.
- Online Presence: Boost your business’s visibility with features that help you establish and manage an online presence.
- Marketing Automation: Automate marketing tasks to reach more customers and grow your business effortlessly.
- Customer Relationship Management (CRM): Build and maintain strong relationships with your customers, tailored to their needs.

## Technologies Used:
1. Node.js with Nest.js Framework: Server-side JavaScript runtime.
2. Express.js: Web framework for building RESTful APIs.
3. Prisma: ORM for managing database operations.
4. PostgreSQL: Relational database for data storage.
5. JWT: JSON Web Tokens for authentication.
6. Docker: Containerization for easy deployment.
7. API Documentation: Swagger

## Installation
1. Clone the repository
```bash
git clone https://github.com/SamuelAlvianM/SaleMate-BE.git
```
2. Install Project Dependencies
```bash
$ npm install
```

3. Set up Prisma

    a. Install the Prisma CLI as a development dependency:
```bash
$ npm install -D prisma
```

 b. Initialize Prisma inside your Project:
```bash
$ npx prisma init
```

4. Set up the Database: configure your database setting in the `.env` file

    a. Localhost:
```bash
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET_KEY="YOUR-JWT-SECRET-KEY"
```

b. Deployment Link:
```bash
DATABASE_URL="postgresql://postgres:pkYBhndFhQhiKNXwqgDtkmiweJUNMUiL@viaduct.proxy.rlwy.net:27020/railway"
JWT_SECRET_KEY="YOUR-JWT-SECRET-KEY"
```

5. Prisma Schema
 - Migrate the database
```bash
$ npx prisma migrate dev --name init
```
 - Generate the database
 ```bash
 $ npx prisma generate
 ```


## Usage/Examples

### Running the App:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Documentation

[PostgreSQL ERD] <img src="https://github.com/SamuelAlvianM/SaleMate-BE/blob/main/src/assets/SaleMate%20ERD.jpg?raw=true">

[Railway Production] <img src="https://github.com/SamuelAlvianM/SaleMate-BE/blob/main/src/assets/Railway%20Production.jpg?raw=true">

[Swagger Documentation] <img src="https://github.com/SamuelAlvianM/SaleMate-BE/blob/main/src/assets/API%20Documentation.png?raw=true">

## API Documentation Reference : [SaleMate API Collection](http://localhost:3000/api)


## Deployment Link

To deploy this project run:

```bash
  http://salemate-be-production.up.railway.app
```

