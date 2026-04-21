const sql = require('mssql/msnodesqlv8');

const dbConfig = {
    server: "localhost\\SQLEXPRESS",
    database: "CampusRide",
    driver: "ODBC Driver 17 for SQL Server",
    options: {
        trustedConnection: true,
        enableArithAbort: true,
        trustServerCertificate: true
    }
};

let globalPool = null;

const connectDB = async () => {
    try {
        console.log('Connecting to SQL Server...');
        globalPool = await sql.connect(dbConfig);
        console.log('✅ Connected to SQL Server');
        return globalPool;
    } catch (err) {
        console.error('❌ Database connection failed:', err);
        return null;
    }
};

const getPool = () => {
    if (!globalPool) {
        throw new Error('Database not connected. Call connectDB first.');
    }
    return globalPool;
};

module.exports = { sql, getPool, connectDB };