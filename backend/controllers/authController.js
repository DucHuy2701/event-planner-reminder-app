import { User } from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ where: {email} })
        if (existingUser) return res.status(400).json({ message: 'Email existed!'})

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const user = await User.create({ email, password: hashedPassword })

        res.status(201).json({ message: 'Signup Successfully!', user: { id: user.id, email: user.email} })
    } catch (err) {
        res.status(500).json({ message: 'Server error!', error: err.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({where: {email}})
        if(!user) return res.status(400).json({message: 'Wrong Email!'})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({message: 'Wrong Password!'})

        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        res.json({
            message: 'Login Successfully!',
            token,
            user: {id: user.id, email: user.email}
        })
    } catch (err) {
        res.status(500).json({message: 'Server Error', error: err.message})
    }
}

export {signup, login}