const mongoose = require('mongoose')


const reviewSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, // _id
            required: true,
            ref: 'User'
        },
        text: {
            type: String,
            required: [true, 'Please add a text value']
        },
    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model('Review', reviewSchema)