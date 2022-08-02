import signUpSchema  from "../schemas/singUpSchema.js";
import signInSchema from "../schemas/signInSchema.js";

export async function validateSignUp(req, res, next) {
    const validation = signUpSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
        res.sendStatus(422);
        return
    }
    next();
}

export async function validateSignIn(req, res, next) {
    const validation = signInSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
        res.sendStatus(422);
        return
    }
    next();
}