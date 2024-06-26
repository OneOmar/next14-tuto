import mongoose from 'mongoose'

const dbUrl = process.env.DB_URL
const connections = {}

const handleError = (error) => {
    console.error('Database connection error:', error)
    throw new Error('Database connection error')
}

export const connectToDb = async () => {
    try {
        if (connections.isConnected) {
            console.log('Using existing database connection')
            return
        }

        // I had to add the following to the connection string to fix the error "MongoError: bad auth Authentication failed."
        // https://stackoverflow.com/questions/55695565/error-message-mongoerror-bad-auth-authentication-failed-through-uri-string
        await mongoose.connect(dbUrl)
        connections.isConnected = mongoose.connections[0].readyState // 1 for connected and 0 for disconnected
        console.log('New database connection established')
    }
    catch (error) { handleError(error) }
}
