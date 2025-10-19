import mongoose from 'mongoose'
import { app } from './app'
import { envVars } from './app/config/env'

const startServer = async () => {
    try {
        await mongoose.connect(envVars.MONGODB_URI)
        console.log("Mongodb connected");
        app.listen(envVars.PORT, () => {
            console.log(`Server is listening to port ${envVars.PORT}`)
        })
    } catch (error) {
        console.log('Error while database connection.', error)
    }
}

(async () => {
    await startServer()
})()