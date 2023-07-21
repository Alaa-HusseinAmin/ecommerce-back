import Joi from "joi"


export const createAddressSchema= Joi.object({
   name: Joi.string().min(2).max(20).required()
})

export const getAddressSchema= Joi.object({
   id:  Joi.string().hex().length(24).required()
})

export const deleteAddressSchema= Joi.object({
   id: Joi.string().hex().length(24).required()
})