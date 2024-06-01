import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';
import { dbConnect } from '../lib/dbConnect'
import User from '../model/User';
 
const authMiddleware = async(req, res, next) => {
    try {
        const token = localStorage.getItem('token');

        if(!token) {
            return NextResponse.json({
                success: false,
                message: "Token not found"
            }, {status: 401})
        }
        dbConnect();

        const user = await User.findOne({token: token});
        if(!user) {
            return NextResponse.json({
                success: false,
                message: "Use does not exists :: authMiddleware"
            }, {status: 404})
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
              return res.status(401).json({ message: 'Unauthorized' });
        }})
        const isTokenExpired = user.tokenExpiry > Date.now()

        if(!isTokenExpired) {
            // Token is not expired
            return NextResponse.json({
                sucess: false,
                message: "User is not authorized"
            }, {status: 404})  
        }
        next();

    } catch (error) {
        return NextResponse.json({
            success: false,
            messsage: "User is unauthorized"
        }, {status: 500})
    }
}

export default authMiddleware;