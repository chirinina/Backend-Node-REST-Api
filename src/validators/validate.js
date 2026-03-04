function validate(schema, target = 'body') {
    return (req, res, next) => {
        const data = req[target];

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ error: 'No se proporcionaron datos'
            });
        }

        const { error, value } = schema.validate(data,{ 
            abortEarly: false, allowUnknown: true,
         });

        if (error) {
            return res.status(400).json({ 
            error: error.details.map((detail) => detail.message) 
        });
        }
        req[target] = value;
        next();
    };
    }
export { validate };