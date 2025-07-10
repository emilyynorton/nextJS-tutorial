import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    // Execute your SQL query
    const query = `
      DROP TABLE IF EXISTS invoices;
      DROP TABLE IF EXISTS customers;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS revenue;
    `;
    
    await sql.unsafe(query);
    
    return Response.json({ 
      message: 'Tables dropped successfully',
      note: 'You can now go to /seed to recreate and reseed the tables'
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
