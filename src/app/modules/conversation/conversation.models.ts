import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const Conversation = mongoose.model("Conversation", ConversationSchema);
