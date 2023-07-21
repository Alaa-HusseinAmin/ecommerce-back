import Joi from "joi"


export const createUserSchema= Joi.object({
   name:  Joi.string().min(2).max(20).required()
})

export const getUserSchema= Joi.object({
   id:  Joi.string().hex().length(24).required()
})

export const updateUserSchema= Joi.object({
   name: Joi.string().min(2).max(20),
   id:  Joi.string().hex().length(24).required()
})

export const deleteUserSchema= Joi.object({
   id:  Joi.string().hex().length(24).required()
})