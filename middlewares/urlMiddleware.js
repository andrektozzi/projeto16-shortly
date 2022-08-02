import urlSchema from "../schemas/urlSchema.js";

export async function validateUrl(req, res, next) {
    const validation = urlSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
        res.sendStatus(422);
        return
    }
    next();
}