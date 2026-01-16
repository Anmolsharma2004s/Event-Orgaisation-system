const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        unique: true,
        default: () => `EVT-${Date.now()}`,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        min: 0,
    },
    strength: {
        type: Number,
        default: 100,
        min: 1,
    },
    status: {
        type: String,
        enum: ['upcoming', 'pending', 'completed', 'cancelled'],
        default: 'pending',
    },
    category: {
        type: String,
        enum: ["Music", "Sports", "Tech", "Workshop", "Festival", "Other"],
        default: "Other",
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    activityMessage: {
        type: String,
        default: 'Event created',
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
