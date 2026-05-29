import User from "../models/user";

export const userRepository = {
    async findByUsername(username: string): Promise<User | null> {
        try {
            return await User.findOne({ where: { username } });
        }catch(e) {
            console.error('Error finding user by username:', e);
            return null
        }
    }
}