// CommonJS Module (Default)

const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = {
    connectDB,
}

/* ES Module (Newer Way of Writing/Coding)

import { connect } from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await connect(process.env.MONGO_URI)

        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

export default {
    connectDB,
}

*/