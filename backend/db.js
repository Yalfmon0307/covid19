import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const query = await pool.query("SELECT NOW()");
if (query) {
    console.log("Connected to database");
}


    const querydb = await pool.query("CREATE TABLE IF NOT EXISTS covid_data (country character varying(36) NOT NULL primary key, population integer, cases integer, deaths integer, recovered integer)");

    if (querydb) {
        console.log("Table created");
    }
export default pool;