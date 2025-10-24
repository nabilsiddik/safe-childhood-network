import mongoose from 'mongoose'
import { app } from './app'
import { envVars } from './app/config/env'
import http from 'http'
import { Server } from 'socket.io'
import { MessageServices } from './app/modules/message/message.services'

const startServer = async () => {
    try {
        await mongoose.connect(envVars.MONGODB_URI)
        console.log("Mongodb connected");

        const server = http.createServer(app)
        const io = new Server(server, {
            cors: {
                origin: ['http://localhost:3000', 'https://safe-childhood-network-client.vercel.app'],
                credentials: true
            }
        })

        // To store online users
        let onlineUsers: { [key: string]: string } = {}

        io.on('connection', (socket) => {
            console.log('A user connected:', socket.id)

            // When a user joins, send their email
            socket.on('join', (userEmail: string) => {
                onlineUsers[userEmail] = socket.id
                console.log('Online users:', onlineUsers)
            })

            // Listen for sending messages
            socket.on('sendMessage', async (data: { conversationId: string, sender: string, text: string }) => {
                // Save message to DB
                const savedMessage = await MessageServices.createMessage(data)

                // Emit to all members in conversation (we can enhance later)
                io.emit('receiveMessage', savedMessage)
            })

            // Disconnect
            socket.on('disconnect', () => {
                console.log('User disconnected:', socket.id)
                // Remove from online users
                onlineUsers = Object.fromEntries(
                    Object.entries(onlineUsers).filter(([_, value]) => value !== socket.id)
                )
                console.log('Online users:', onlineUsers)
            })
        })

        server.listen(envVars.PORT, () => {
            console.log(`Server is listening to port ${envVars.PORT}`)
        })
    } catch (error) {
        console.log('Error while database connection.', error)
    }
}

(async () => {
    await startServer()
})()