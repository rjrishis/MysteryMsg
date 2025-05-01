import dbConnect from "@/lib/dbConnect";
import { auth } from "@/auth";
import UserModel from "@/models/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();
  const session = await auth();

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const user = session.user as User;
  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const result = await UserModel.aggregate([
      { $match: { _id: userId } }, // ❗ Fix: was `id` instead of `_id`
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      {
        $group: {
          _id: "$_id",
          messages: { $push: "$messages" }, // ❗ Fix: was string 'messages'
        },
      },
    ]);

    if (!result || result.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        messages: result[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return Response.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
