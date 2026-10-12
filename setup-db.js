const postgres = require('postgres');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function setup() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('❌ Error: DATABASE_URL is not set in .env.local');
    process.exit(1);
  }

  console.log('Connecting to database...');
  const sql = postgres(connectionString, { ssl: 'require' });

  try {
    const schema = fs.readFileSync('schema.sql', 'utf8');
    
    console.log('Running schema.sql...');
    await sql.unsafe(schema);
    
    console.log('✅ Database setup complete! Tables and admin account created.');
  } catch (err) {
    console.error('❌ Error setting up database:', err);
  } finally {
    await sql.end();
  }
}

setup();
