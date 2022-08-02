import connection from "../dbStrategy/database.js"
import { nanoid } from "nanoid";

export async function addUrl(req, res) {
    const { url } = req.body;
    const { id } = res.locals;

    const characters = 8;
    const shortUrl = nanoid(characters);

    try {
        await connection.query(
            `INSERT INTO urls (
                "userId", "url", "shortUrl")
                VALUES ($1, $2, $3);`,
                [id, url, shortUrl]
        );
        return res.status(201).send({ shortUrl });
    } catch (error) {
        return res.sendStatus(400);
    }
}