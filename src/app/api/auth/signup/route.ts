import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body)
    const response = await axios.post(`${process.env.NEST_API_URL}/auth/register`, body);
    console.log('responseee', response)
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    const status = 500;
    const message = 'Internal Server Error';
    console.log(error)
    return NextResponse.json({ message }, { status });
  }
}
