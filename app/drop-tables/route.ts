import postgres from 'postgres';

// Create SQL client with simpler configuration
const sql = postgres(process.env.POSTGRES_URL as string, { 
  ssl: 'require'
});

async function dropTables() {
  // Use a much simpler approach with individual statements
  await sql`DROP TABLE IF EXISTS invoices;`;
  await sql`DROP TABLE IF EXISTS customers;`;
  await sql`DROP TABLE IF EXISTS users;`;
  await sql`DROP TABLE IF EXISTS revenue;`;
  
  return { success: true, message: 'All tables dropped successfully' };
}

export async function GET() {
  try {
    const result = await dropTables();
    return Response.json(result);
  } catch (error: any) {
    console.error('Error dropping tables:', error);
    return Response.json({ 
      error: typeof error.message === 'string' ? error.message : 'Failed to drop tables'
    }, { status: 500 });
  }
}
