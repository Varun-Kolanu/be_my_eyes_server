import mongoose from "mongoose";
import { config } from "dotenv";
import { User } from "../models/user.js";
import { RoleCount } from "../models/roleCount.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(process.env.MONGO_URI, { dbName: "be_my_eyes" })
    .then(async () => {
        console.log('Connected to MongoDB');

        function initializeLanguages() {
            User.updateMany({ language: { $exists: false } }, { $set: { language: 'English' } })
                .then(result => {
                    console.log(`Users updated.`);
                    mongoose.disconnect();
                })
                .catch(err => {
                    console.error('Error updating users:', err);
                    mongoose.disconnect();
                });
        }

        initializeLanguages();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });