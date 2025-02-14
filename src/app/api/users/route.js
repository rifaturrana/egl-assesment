import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { authenticate } from "@/middleware/auth";
import { NextResponse,NextRequest } from "next/server";

connectDB();

export async function GET(NextRequest) {
  const auth = await authenticate(NextRequest);
  if (!auth) return auth;

  try {
    const users = await User.find({}, { password: 0 }); 
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching users" }, { status: 500 });
  }
}

export async function POST(NextRequest) {
  try {
    const { name, email, password } = await NextRequest.json();
    
    if (!name || !email || !password) {
        return new Response(
            JSON.stringify({ success: false, message: "All fields are required" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );      
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return new Response(
            JSON.stringify({ success: false, message: "Email already exists" }),
            { status: 409, headers: { "Content-Type": "application/json" } }
          );    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    return new Response(
        JSON.stringify({ success: true, message: "User created" }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      ); 
     } catch (error) {
        return new Response(
            JSON.stringify({ success: false, message: "Error creating user" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );  
        }
}

