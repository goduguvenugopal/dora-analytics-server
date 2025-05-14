const postgres = require("pg");
const { Pool } = postgres;
require("dotenv").config();

// connecting to postgres db

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
   ssl: {
    rejectUnauthorized: false,  
  },
});


 

module.exports = pool