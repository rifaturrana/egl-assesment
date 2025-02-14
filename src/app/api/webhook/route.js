import { NextResponse } from 'next/server';
import fs from 'fs';
import crypto from 'crypto';

const SECRET_KEY = process.env.SECRET_KEY;

const verifySignature = (req) => {
  const signature = req.headers['x-signature']; 
  const payload = JSON.stringify(req.body); 

  const hmac = crypto.createHmac('sha256', SECRET_KEY);
  hmac.update(payload);
  const generatedSignature = hmac.digest('hex');

  return signature === generatedSignature;
};

const storeData = (eventData) => {
  const dbPath = './db.json';
  
  let data = [];
  if (fs.existsSync(dbPath)) {
    data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  }

  data.push(eventData);

  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

export async function POST(req) {
  if (!verifySignature(req)) {
    return new NextResponse(
        JSON.stringify({ success: false, message: 'Invalid signature' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    
  }
  const { eventType, data } = await req.json();

  storeData({ eventType, data });

  return new NextResponse(
    JSON.stringify({ success: false, message: 'Received' }),
    { status: 200 }
  );
}
