import mongoose from "mongoose";
import { config } from "dotenv";
import { User } from "../models/user.js";
import { RoleCount } from "../models/roleCount.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(process.env.MONGO_URI, {dbName: "be_my_eyes"})
    .then(async () => {
        console.log('Connected to MongoDB');

        async function initializeRoleCounts() {
            try {
                const blindCount = await User.countDocuments({ role: 'blind' });
                const volunteerCount = await User.countDocuments({ role: 'volunteer' });

                const blindDoc = await RoleCount.findOne({ role: 'blind' });
                const volunteerDoc = await RoleCount.findOne({ role: 'volunteer' });
                if (blindDoc) {
                    blindDoc.count = blindCount;
                    await blindDoc.save();
                }
                else {
                    await RoleCount.create({ role: 'blind' , count: blindCount });
                }
                if (volunteerDoc) {
                    volunteerDoc.count = volunteerCount;
                    await volunteerDoc.save();
                }
                else {
                    await RoleCount.create({ role: 'volunteer' , count: volunteerCount });
                }

                console.log('Role counts initialized successfully.');
            } catch (error) {
                console.error('Error initializing role counts:', error);
            }
        }

        await initializeRoleCounts();
        mongoose.disconnect();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });