import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:Number;
}

const Connection : ConnectionObject = {}

const dbConnect = async ():Promise<void> =>{
    if(Connection.isConnected){
        console.log("Already connected to the database")
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '')
        Connection.isConnected = db.connections[0].readyState
        console.log("Connected to the database")
    } catch (error) {
        console.log("database connection failed: " + error)
        process.exit(1)
    }
}

export default dbConnect;