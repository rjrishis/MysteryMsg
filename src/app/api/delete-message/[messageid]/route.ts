import dbConnect from "@/lib/dbConnect";
import { auth } from "@/auth";
import { User } from "next-auth";
import mongoose from "mongoose";
import UserModel from "@/models/User";


export async function DELETE(request: Request, { params }: { params: { messageid: string } }){
    const messageId = params.messageid;
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
        const updateResult = await UserModel.updateOne({
            _id: userId
        },
    {
        $pull: { messages: { _id: messageId } } 
    })
    if (updateResult.modifiedCount === 0) {
        return Response.json(
          { message: 'Message not found or already deleted', success: false },
          { status: 404 }
        );
      }
  
      return Response.json(
        { message: 'Message deleted', success: true },
        { status: 200 }
      );
    } catch (error) {
        console.error('Error deleting message:', error);
        return Response.json(
          { message: 'Error deleting message', success: false },
          { status: 500 }
        ); 
    }
}