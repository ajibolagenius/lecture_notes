import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/userModel.js'


function generateAccessToken(user) {
    return jwt.sign({
        sub: user.id,
        email: user.email,
        type: 'access',
    }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

function generateRefreshToken(user) {
    return jwt.sign({
        sub: user.id,
        email: user.email,
        type: 'refresh',
    }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

export const AuthService = {

    // Signup logic

    async signup(email, password) {
        const existing = await UserModel.findByEmail(email);
        if (existing) throw new Error('Email already in use')

        const passwordHash = await bcrypt.hash(password, 10)
        const user = await UserModel.create({ email, passwordHash })

        return {
            accessToken: generateAccessToken(user),
            refreshToken: generateRefreshToken(user),
            user: { id: user.id, email: user.email },
        }
    },

    // Login logic

    async login(email, password) {
        const user = await UserModel.findByEmail(email);
        if (!user) throw new Error('Invalid email or password')

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) throw new Error('Invalid email or password')

        return {
            accessToken: generateAccessToken(user),
            refreshToken: generateRefreshToken(user),
            user: { id: user.id, email: user.email },
        }
    },

    // Refresh logic

    async refresh(refreshToken) {
        if (!refreshToken) throw new Error('Refresh token is required')

        let payload
        try {
            payload = jwt.verify(refreshToken, process.env.JWT_SECRET)
        } catch (error) {
            throw new Error('Invalid or expired refresh token')
        }

        if (payload.type !== 'refresh') throw new Error('Invalid or expired refresh token')

        const user = { id: payload.sub, email: payload.email }
        return {
            accessToken: generateAccessToken(user),
            refreshToken: generateRefreshToken(user),
        }
    }
}
