import Joi from "joi"


export const createReviewSchema= Joi.object({
   name: Joi.string().min(2).max(20).required()
})

export const getReviewSchema= Joi.object({
   id:  Joi.string().hex().length(24).required()
})

export const updateReviewSchema= Joi.object({
   name: Joi.string().min(2).max(20),
   id: Joi.string().hex().length(24).required()
})

export const deleteReviewSchema= Joi.object({
   id: Joi.string().hex().length(24).required()
})