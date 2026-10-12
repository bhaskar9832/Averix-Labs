const postgres = require('postgres');
require('dotenv').config({ path: '.env.local' });

async function fix() {
  const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
  try {
    await sql`UPDATE admin_users SET password_hash = '$2b$10$Rgy5wJH.Ou.rivX2LHNtzu8CPyiS9Zq6F6KTzTVzA64Fox8BF/sdK' WHERE email = 'admin@averixlabs.com'`;
    console.log('✅ Password hash fixed in database!');
  } catch (err) {
    console.error(err);
  } finally {
    await sql.end();
  }
}
fix();
