import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  try {
    const response = await axios.post('http://localhost:8000/api/encode/', { code });
    return NextResponse.json({ encoded: response.data.encoded });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to encode the confirmation code' }, { status: 500 });
  }
}
