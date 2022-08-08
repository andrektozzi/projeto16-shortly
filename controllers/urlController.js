import { nanoid } from "nanoid";
import { urlRepository } from "../repositories/urlRepositories.js";
import { userRepository } from "../repositories/userRepositories.js";

export async function addUrl(req, res) {
    const { url } = req.body;
    const { id } = res.locals;

    const characters = 8;
    const shortUrl = nanoid(characters);

    try {
        await urlRepository.addUrl(id, url, shortUrl);
        return res.status(201).send({ shortUrl });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getUrl(req, res) {
    const { id } = req.params;

    try {
        const { rows: url } = await urlRepository.getUrl(id);

        if(url.length === 0) {
            return res.sendStatus(404);
        }

        return res.status(200).send(url[0]);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function openUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const { rows: url } = await urlRepository.getShortUrl(shortUrl);
        const userId = url[0].userId;

        if(url.length === 0) {
            return res.sendStatus(404);
        }

        await urlRepository.updateUrl(shortUrl);

        await userRepository.updateUser(userId);

        return res.redirect(url[0].url);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function deleteUrl(req, res) {
    const idUser = res.locals.id;
    const idUrl = req.params.id;

    try {
        const { rows: url } = await urlRepository.getUrlById(idUrl);

        if(url.length === 0) {
            return res.sendStatus(404);
        }

        if(url[0].userId !== idUser) {
            return res.sendStatus(401);
        }

        await urlRepository.deleteUrl(idUrl);

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}