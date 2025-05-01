import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true,
        });

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username already exists and is verified",
            }, {
                status: 400,
            });
        }

        const existingUserByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        let userToReturn;

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "Email already exists, please verify your email",
                }, {
                    status: 400,
                });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
                userToReturn = existingUserByEmail;
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date(Date.now() + 3600000);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: []
            });

            await newUser.save();
            userToReturn = newUser;
        }

        // Send verification email
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);
        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message,
            }, {
                status: 500,
            });
        }

        // Sanitize user before sending it back
        const { password: _, verifyCode: __, verifyCodeExpiry: ___, ...sanitizedUser } = userToReturn.toObject();

        return Response.json({
            success: true,
            message: "User registered successfully, please verify your email",
            user: sanitizedUser
        }, {
            status: 201,
        });

    } catch (error) {
        console.error("Error Registering User:", error);
        return Response.json({
            success: false,
            message: "Failed to register user",
        }, {
            status: 500,
        });
    }
}
