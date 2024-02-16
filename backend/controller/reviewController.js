const asyncHandler = require('express-async-handler')
const Review = require("../models/reviewModel")
const User = require('../models/userModel')

// FUNCTIONS

// @desc    Get reviews
// @route   GET /api/reviews
// @access  Private
const getReviews = asyncHandler(async(req, res) => {
    const reviews = await Review.find({user: req.user.id})
    res.status(200).json(reviews)
})



// @desc    Set review
// @route   POST /api/reviews
// @access  Private
const setReview = asyncHandler(async(req, res) => {


    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
   
    // Create user's review
    const review = await Review.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(review)
})


// @desc    Update review
// @route   PUT /api/reviews/id
// @access  Private
const updateReview = asyncHandler(async(req, res) => {
    const review = await Review.findById(req.params.id)


    // Check if goal exists for specified id
    if(!review){
        res.status(400)
        throw new Error('Review not found')
    }
    //const user = await User.findById(req.user.id)


    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }


    // Make sure the logged in user matches the goal user
    if(review.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }


    const updatedReview =  await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
   
    res.status(200).json(updatedReview)
})

// @desc    Delete review
// @route   POST /api/reviews/id
// @access  Private
const deleteReview = asyncHandler(async(req, res) => {
    const review = await Review.findById(req.params.id)
   
    // Check for goal
    if(!review){
        res.status(400)
        throw new Error('Review not found')
    }
    //const user = await User.findById(req.user.id)


    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }


    // Make sure the logged in user matches the goal user
    // i.e. John (login) but the goal belongs to May
    if(review.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }


    const deletedReview = await Review.findByIdAndDelete(req.params.id)
   
    res.status(200).json(deletedReview)
})


module.exports = {
    getReviews,
    setReview,
    updateReview,
    deleteReview
}
