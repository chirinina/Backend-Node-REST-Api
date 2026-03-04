import joi from 'joi';

export const createtaskSchema = joi.object({
    name: joi.string().required(),
});

