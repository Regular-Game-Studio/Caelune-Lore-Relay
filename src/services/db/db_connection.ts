import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const poolConfig: mysql.PoolOptions = {
    host: process.env.DB_HOSTNAME || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || '',
    port: parseInt(process.env.DB_PORT || '3306'),
    
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    charset: 'utf8mb4',
    timezone: 'Z',

    supportBigNumbers: true,
    bigNumberStrings: true,
    dateStrings: false
}

const pool = mysql.createPool(poolConfig);

export default pool