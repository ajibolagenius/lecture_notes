import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/userModel.js'


function generateToken(user) {
    return jwt.sign({
        sub: user.id,
        email: user.email,
    }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export const AuthService = {

    // Signup logic

    async signup(email, password) {
        const existing = await UserModel.findByEmail(email);
        if (existing) throw new Error('Email already in use')

        const passwordHash = await bcrypt.hash(password, 10)
        const user = await UserModel.create({ email, passwordHash })

        const token = generateToken(user)
        return { token, user }
    },

    // Login logic

    async login(email, password) {
        const user = await UserModel.findByEmail(email);
        if (!user) throw new Error('Invalid email or password')

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) throw new Error('Invalid email or password')

        const token = generateToken(user);
        return {
            token,
            user: { id: user.id, email: user.email }
        }
    }
}