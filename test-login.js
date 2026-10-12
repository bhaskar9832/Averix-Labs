const postgres = require('postgres');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function test() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString || connectionString.includes('your_user')) {
    console.error('❌ Error: DATABASE_URL is not set correctly in .env.local');
    process.exit(1);
  }

  console.log('Connecting to database:', connectionString.split('@')[1] || connectionString);
  const sql = postgres(connectionString, { ssl: 'require' });

  try {
    const users = await sql`SELECT * FROM admin_users WHERE email = 'admin@averixlabs.com'`;
    if (users.length === 0) {
      console.error('❌ User admin@averixlabs.com not found in database. Did you run setup-db.js?');
      process.exit(1);
    }
    
    const user = users[0];
    console.log('✅ User found:', user.email);

    const isValid = await bcrypt.compare('admin123', user.password_hash);
    if (!isValid) {
      console.error('❌ Password hash does not match "admin123". Hash in DB:', user.password_hash);
      process.exit(1);
    }

    console.log('✅ Password matches perfectly! Login SHOULD work.');
  } catch (err) {
    console.error('❌ Database error:', err);
  } finally {
    await sql.end();
  }
}

test();
