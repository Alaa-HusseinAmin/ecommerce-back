import Joi from "joi"


export const createWishListSchema= Joi.object({
   name: Joi.string().min(2).max(20).required()
})

export const getWishListSchema= Joi.object({
   id:  Joi.string().hex().length(24).required()
})

export const deleteWishListSchema= Joi.object({
   id: Joi.string().hex().length(24).required()
})