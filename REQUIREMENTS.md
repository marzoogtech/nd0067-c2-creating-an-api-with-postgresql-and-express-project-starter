# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: api/products [GET] 
- Show: api/products/:id [GET]
- Create [token required]: api/products [POST]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]: api/users [GET]
- Show [token required]: api/users/:id [GET]
- Create [token required]: api/users [POST]

#### Orders
- Current Order by user (args: user id)[token required]: api/orders/:userId [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] not implemented.
- Create an Order [token required]: api/orders [POST] 
- Add product to order [token required]: api/orders [PUT]

## Data Shapes
#### products
- id (SERIAL PRIMARY KEY) 
- productName (VARCHAR(50))
- price (DECIMAL) 
- [OPTIONAL] category (CARCHAR(50))

#### users
- id (VARCHAR(50) UNIQUE PRIMARY KEY) 
- firstName (VARCHAR(50))
- lastName (VARCHAR(50))
- password (TEXT)

#### orders
- id (SERIAL PRIMARY KEY)
- userId (VARCHAR(50))
- orderStatues (ENUM(' active', 'complete'))

#### order_products 
- id (SERIAL PRIMARY KEY)
- order_id (BIGINT)
- product_id (BIGINT)
-product_qty (INTEGER)