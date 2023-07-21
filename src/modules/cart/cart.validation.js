import Joi from "joi"


export const createCartSchema= Joi.object({
   name: Joi.string().min(2).max(20).required()
})

// export const getCouponSchema= Joi.object({
//    id:  Joi.string().hex().length(24).required()
// })

// export const updateCouponSchema= Joi.object({
//    name: Joi.string().min(2).max(20),
//    id: Joi.string().hex().length(24).required()
// })

export const deleteCartSchema= Joi.object({
   id: Joi.string().hex().length(24).required()
})