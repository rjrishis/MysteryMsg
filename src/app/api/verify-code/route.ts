import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, code } = await request.json();
        console.log("Received username:", username, "Received code:", code);

        const decodedUsername = decodeURI(username);
        const user = await UserModel.findOne({
            username: decodedUsername
        });

        if (!user) {
            console.log("User not found");
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 500 });
        }

        const isCodeValid = user?.verifyCode == code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        console.log("Is code valid?", isCodeValid);
        console.log("Is code expired?", !isCodeNotExpired);

        if (isCodeValid && isCodeNotExpired) {
            if (!user.isVerified) {
                console.log("Updating user verification status...");
                user.isVerified = true;
                await user.save();
                console.log("User verified:", user);  // Log the updated user
            }

            return Response.json({
                success: true,
                message: "Account Verified Successfully"
            }, { status: 200 });

        } else if (!isCodeNotExpired) {
            return Response.json({
                success: false,
                message: "Verification code has expired, please signup again to get a new code"
            }, { status: 400 });

        } else {
            return Response.json({
                success: false,
                message: "Incorrect Verification Code"
            }, { status: 400 });
        }

    } catch (error) {
        console.error("Error Verifying User", error);
        return Response.json({
            success: false,
            message: "Error verifying user"
        }, { status: 500 });
    }
}
