import mongoose from "mongoose";
import { User } from "../models/user.js";
import { RoleCount } from "../models/roleCount.js";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {dbName: "be_my_eyes"})
    .then(async (c) => {
        console.log(`Database connected with ${c.connection.host}`);

        const userChangeStream = User.watch([], { fullDocumentBeforeChange: "required" });

        // Listen for deletion events
        userChangeStream.on('change', async (change) => {
            if (change.operationType === 'delete') {
                const { fullDocumentBeforeChange } = change;
                if (fullDocumentBeforeChange.role) {
                    await RoleCount.findOneAndUpdate(
                        { role: fullDocumentBeforeChange.role },
                        { $inc: { count: -1 }}
                    )
                }
                console.log("Updated role");
            }
        });
    })
    .catch(err => console.log("Error connecting"));
}