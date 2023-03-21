CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    "productName" VARCHAR(50) NOT NULL,
    price DECIMAL NOT NULL,
    category VARCHAR(50)
);
