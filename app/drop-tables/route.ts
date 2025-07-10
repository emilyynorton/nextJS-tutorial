import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function dropTables() {
  // Drop tables in the correct order to avoid foreign key constraint issues
  await sql`DROP TABLE IF EXISTS invoices`;
  await sql`DROP TABLE IF EXISTS customers`;
  await sql`DROP TABLE IF EXISTS users`;
  await sql`DROP TABLE IF EXISTS revenue`;
  
  return { success: true, message: 'All tables dropped successfully' };
}

export async function GET() {
  try {
    const result = await dropTables();
    return Response.json(result);
  } catch (error) {
    console.error('Error dropping tables:', error);
    return Response.json({ error: 'Failed to drop tables' }, { status: 500 });
  }
}
