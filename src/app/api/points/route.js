import db from '@/app/utils/db';
import { broadcastUpdate } from '@/app/api/socket/route';  // Importuj broadcastUpdate

export async function GET(req) {
  try {
    const [rows] = await db.query('SELECT * FROM points');
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error('Error fetching points:', error);
    return new Response('Error retrieving points', { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { id, active } = await req.json();

    // Zaktualizuj punkt w bazie danych
    await db.query('UPDATE points SET active = ? WHERE id = ?', [active, id]);



    return new Response('Point updated successfully', { status: 200 });
  } catch (error) {
    console.error('Error updating point:', error);
    return new Response('Error updating point', { status: 500 });
  }
}
