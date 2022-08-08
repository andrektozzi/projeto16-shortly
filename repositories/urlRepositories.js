import connection from "../dbStrategy/database.js";

async function addUrl(id, url, shortUrl) {
    return connection.query(
        `INSERT INTO urls (
            "userId", "url", "shortUrl")
            VALUES ($1, $2, $3);`,
        [id, url, shortUrl]
    );
}

async function getUrl(id) {
    return connection.query(
        `SELECT id, "shortUrl", "url" FROM urls WHERE id = $1;`,
        [id]
    );
}

async function getUrlById(idUrl) {
    return connection.query(
        `SELECT * FROM urls WHERE id = $1;`,
        [idUrl]
    );
}

async function getShortUrl(shortUrl) {
    return connection.query(
        `SELECT * FROM urls WHERE "shortUrl" = $1;`,
        [shortUrl]
    );
}

async function updateUrl(shortUrl) {
    return connection.query(
        `UPDATE urls
          SET "visitCount"= "visitCount" + 1
          WHERE "shortUrl" = $1;`,
    [shortUrl]
  );
}

async function deleteUrl(idUrl) {
    return connection.query(
        `DELETE FROM urls WHERE id = $1`,
        [idUrl]
    );
}

export const urlRepository = {
    addUrl,
    getUrl,
    getUrlById,
    getShortUrl,
    updateUrl,
    deleteUrl
}