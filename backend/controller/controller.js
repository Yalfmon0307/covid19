import pool from "../db.js";
import { getdata} from "../getdata.js";

export const update_data = async (req, res) => {
    const data = await getdata();
    
    const response = data.response;

    const delete_data = await pool.query("truncate table covid_data");

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

