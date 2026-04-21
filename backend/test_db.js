const sql = require('mssql/msnodesqlv8');

const config = {
    server: "localhost\\SQLEXPRESS",
    database: "CampusRide",
    driver: "ODBC Driver 17 for SQL Server",
    options: {
        trustedConnection: true,
        enableArithAbort: true
    }
};

async function test() {
    try {
        await sql.connect(config);
        console.log("SUCCESS!");
        process.exit(0);
    } catch (err) {
        console.error("FAIL:", err);
        process.exit(1);
    }
}
test();
