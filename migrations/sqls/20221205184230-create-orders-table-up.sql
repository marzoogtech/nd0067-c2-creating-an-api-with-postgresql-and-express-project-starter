DO $$ BEGIN
    CREATE TYPE orderStatusType AS ENUM('active', 'complete'); 
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    userId VARCHAR(50) REFERENCES users(id),
    orderStatus orderStatusType
);
