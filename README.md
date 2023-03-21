# Storefront Backend Project

## Setup

- After downloading the project locally run `npm install` to install the the dependencies. 
- Create a local PSQL database.
- Create a .env file in with DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PEPPER, TOKEN_SECRET, TEST_DB_NAME, ENV variable.
- To run the tests `npm run test`
- To run the api you can use `npm run watch`

## Database setup
**Create user**
```
CREATE USER full_stack_user WITH PASSWORD 'Pass1234';
```
**Create databases**
```
CREATE DATABASE store_db;
CREATE DATABASE store_test_db;
```
**Grant all databases privileges to user**
```
GRANT ALL PRIVILEGES ON DATABASE store_db TO full_stack_user;
GRANT ALL PRIVILEGES ON DATABASE store_test_db TO full_stack_user;
```
## Ports:
- Backend: 3000
- Database: 5432