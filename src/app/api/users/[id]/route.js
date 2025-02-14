import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { authenticate } from "@/middleware/auth";

connectDB();

export async function GET(req, { params }) {
  const auth = await authenticate(req);
  if (!auth) return auth;

  try {
    const user = await User.findById(params.id).select("-password"); 
    if (!user) {
      return res.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return res.json({ success: true, user }, { status: 200 });
  } catch (error) {
    return res.json({ success: false, message: "Invalid user ID" }, { status: 400 });
  }
}
