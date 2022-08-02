import signUpSchema  from "../schemas/userSchema.js";

export async function validateSignUp(req, res, next) {
    const validation = signUpSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
        res.sendStatus(422);
        return
    }
    next();
}