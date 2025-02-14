
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
const secret = process.env.JWT_SECRET;

export const authenticate =async(req)=>{
    const authHeader = req.headers['authorization'];   
     if(!authHeader){
        return new NextResponse(
            JSON.stringify
            ({
                status:401,
                message:"No token provided"
            }),
            {
                status:401,
                headers:{
                    "Content-Type":"application/json"
                }
            }
        )
    }

    const token=authHeader.split(" ")[1];

    try {
        const payload=jwt.verify(token,secret);
        return payload;

        
    } catch (error) {
        return new NextResponse(
            JSON.stringify
            ({
                status:401,
                message:"Invalid token"
            }),
            {
                status:401,
                headers:{
                    "Content-Type":"application/json"
                }
            }
        )
        
    }
}