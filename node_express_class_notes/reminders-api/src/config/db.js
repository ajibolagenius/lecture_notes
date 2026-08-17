import pg from 'pg'

const pool = new pg.Pool(
    { connectionString: process.env.DATABASE_URL, }
)

// Sanity Check: Confirming if we can actualy reach the database

async function getPgVersion() {
    const client = await pool.connect();

    try {
        const result = await client.query('SELECT version()');

        console.log(`Database connection successful.`);
    } finally {
        client.release();
    }
}

getPgVersion();

export default pool;