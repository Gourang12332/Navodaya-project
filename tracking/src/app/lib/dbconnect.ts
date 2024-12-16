import mongoose, { Connection } from "mongoose";

type ConnectionObject = {
    isConnected? : number
}

const connection : ConnectionObject = {}
export default async function dbconnect() : Promise<void> {
    if(connection.isConnected){
       console.log("Already connected")
       return
    } else{
       try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '');
        console.log("printing db itself" + db)

        connection.isConnected = db.connections[0].readyState;
        console.log("database connected successfully")
       } catch (error) {
        console.log("database connection failed")
        process.exit(1)
       }
    }
}