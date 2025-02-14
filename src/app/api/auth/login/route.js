import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse ,NextRequest} from "next/server";

connectDB();

const SECRET_KEY = process.env.JWT_SECRET;

export async function POST(NextRequest) {
  try {
    const { email, password } = await NextRequest.json();
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      )
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return new NextResponse(
            JSON.stringify({ success: false, message: "Invalid credentials" }),
            { status: 401, headers: { "Content-Type": "application/json" } }
          )    }

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    return new NextResponse(
        JSON.stringify({ success: true, token }),
        { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
  return new NextResponse(
    JSON.stringify({ success: false, message: "Server Error" }),
    { status: 500, headers: { "Content-Type": "application/json" } }
  )

}
}
