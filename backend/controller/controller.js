import pool from "../db.js";
import { getdata} from "../getdata.js";

export const update_data = async (req, res) => {
    const data = await getdata();
    
    const response = data.response;

    const delete_data = await pool.query("DROP table covid_data");

    const create_table = await pool.query("CREATE TABLE covid_data (country character varying(36) NOT NULL primary key, population integer, cases integer, deaths integer, recovered integer)")



    const records = response.map((record) => {
        const dato = {
            country: record.country,
            population: record.population,
            cases: record.cases.total,
            deaths: record.deaths.total,
            recovered: record.cases.recovered
        }

        
        const query = pool.query("INSERT INTO covid_data (country, population, cases, deaths, recovered) VALUES ($1, $2, $3, $4, $5)", [dato.country, dato.population, dato.cases, dato.deaths, dato.recovered]);

    });

    res.json({message: "Data updated" });
};

export const get_data = async (req, res) => {
    const response = await pool.query("SELECT * FROM covid_data");
    res.json(response.rows);
};

export const get_data_country = async (req, res) => {
    const { country } = req.body;
    const response = await pool.query("SELECT * FROM covid_data WHERE country = $1", [country]);
    if (response.rows.length === 0) {
        res.status(404).json({message: "Country not found" });
    } else {
        res.json(response.rows);
    }
};

export const delete_data = async (req, res) => {
    const { country } = req.body;
    const response = await pool.query("DELETE FROM covid_data WHERE country = $1", [country]);
    res.json({message: "Data deleted" });
};

