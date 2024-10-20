import Joi from 'joi';

export const createContactSchema=Joi.object({
    name:Joi.string().min(3).max(20).required(),
    email:Joi.string().email().required(),
  gender: Joi.string().valid('male', 'female', 'other'),
  isFavourite:Joi.boolean().required(),
  contactType:Joi.string(),
  age:Joi.string().max(3),
  onDuty: Joi.boolean(),
  phoneNumber: Joi.string().pattern(/^\+\d{10,15}$/).optional(),
});

export const updatedContactSchema=Joi.object({
  name:Joi.string().min(3).max(20),
  email:Joi.string().email(),
gender: Joi.string().valid('male', 'female', 'other'),
isFavourite:Joi.boolean(),
contactType:Joi.string(),
age:Joi.string().max(3),
onDuty: Joi.boolean(),
phoneNumber: Joi.string().pattern(/^\+\d{10,15}$/).optional(),
});
