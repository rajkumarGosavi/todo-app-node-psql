const Pool = require('pg').Pool
const {
    PG_USERNAME,
    PG_PASSWORD,
    PG_HOSTNAME,
    PG_PORT,
    PG_DB
} = process.env;
const pool = new Pool({
    user: PG_USERNAME,
    host: PG_HOSTNAME,
    database: PG_DB,
    password: PG_PASSWORD,
    port: PG_PORT,
})

module.exports = { pool }