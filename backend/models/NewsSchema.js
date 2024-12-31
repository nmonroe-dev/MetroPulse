const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true,
    },
    description: { 
        type: String,
        required: true,
    },
    link: { 
        type: String,
        unique: true, 
        required: true,
    },
    story: {
        type: String,
    },
    category: { 
        type: [String], 
        
        default: ["General"], 
    },
    
    pubDate: { 
        type: Date,
        required: true,  
    },
    img: { 
        type: String, 
    },
    comment: [
        {
            text: {
                type: String,
                required: true,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Login",
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },

        },
    ],
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Login",
        required: false,
    },
});

module.exports = mongoose.model("News", NewsSchema);