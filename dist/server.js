"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const env_1 = require("./app/config/env");
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const message_services_1 = require("./app/modules/message/message.services");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(env_1.envVars.MONGODB_URI);
        console.log("Mongodb connected");
        const server = http_1.default.createServer(app_1.app);
        const io = new socket_io_1.Server(server, {
            cors: {
                origin: ['http://localhost:3000', 'https://safe-childhood-network-client.vercel.app'],
                credentials: true
            }
        });
        // To store online users
        let onlineUsers = {};
        io.on('connection', (socket) => {
            console.log('A user connected:', socket.id);
            // When a user joins, send their email
            socket.on('join', (userEmail) => {
                onlineUsers[userEmail] = socket.id;
                console.log('Online users:', onlineUsers);
            });
            // Listen for sending messages
            socket.on('sendMessage', (data) => __awaiter(void 0, void 0, void 0, function* () {
                // Save message to DB
                const savedMessage = yield message_services_1.MessageServices.createMessage(data);
                // Emit to all members in conversation (we can enhance later)
                io.emit('receiveMessage', savedMessage);
            }));
            // Disconnect
            socket.on('disconnect', () => {
                console.log('User disconnected:', socket.id);
                // Remove from online users
                onlineUsers = Object.fromEntries(Object.entries(onlineUsers).filter(([_, value]) => value !== socket.id));
                console.log('Online users:', onlineUsers);
            });
        });
        server.listen(env_1.envVars.PORT, () => {
            console.log(`Server is listening to port ${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.log('Error while database connection.', error);
    }
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield startServer();
}))();
