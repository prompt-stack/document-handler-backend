import User from "../models/user";
import { userRepository } from "../repository.ts/userRepository";
import bcrypt from 'bcrypt';

export async function insertDefaultUser() {
    try {
        const existingUser = await userRepository.findByUsername(String(process.env.DEFAULT_USERNAME));
    
        if (existingUser) {
            console.log('Default user already exists.');
            return;
        }
    
        const user = new User({
            username: String(process.env.DEFAULT_USERNAME),
            password: bcrypt.hashSync(String(process.env.DEFAULT_PASSWORD), 10),
        });
    
        await user.save();
    } catch(e) {
        console.log("Error inserting default user: ", e);
        
    }

}