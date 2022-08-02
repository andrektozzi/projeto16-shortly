import connection from "../dbStrategy/database.js";
import bcrypt from "bcryptjs";

export async function signUp(req, res) {
    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    const user = { ...req.body, password: passwordHash };
    const { name, email, password } = user;

    try {
        if(req.body.password !== req.body.confirmPassword) {
            return res.status(400).send("As senhas não conferem!");
        }

        const { rows: userExist } = await connection.query(
            "SELECT * FROM users WHERE email = $1;", [user.email]
        );

        if(userExist.length !== 0) {
            return res.sendStatus(409);
        }

        await connection.query(
            `INSERT INTO users (
                name,
                email,
                password)
                VALUES ($1, $2, $3);`,
                [name, email, password]
        );
        res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }
}