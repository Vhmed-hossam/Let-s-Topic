import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    voiceUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      enum: ["text", "image", "voice" , "video"],
      default: "text",
    },
    edited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
MessageSchema.index({ senderId: 1, receiverId: 1, createdAt: 1 });
MessageSchema.index({ receiverId: 1, senderId: 1, createdAt: 1 });

const Message = mongoose.model("Message", MessageSchema);

export default Message;
