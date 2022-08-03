import connetction from "../dbStrategy/database.js";

export async function getUser(req, res) {
    const { id } = res.locals;

    try {
        const { rows: user } = await connection.query(
            `
            SELECT 
              users.id, 
              users.name, 
              users."visitCount",
              json_agg(json_build_object( 
                  'id', urls.id, 
                  'shortUrl', urls."shortUrl", 
                  'url', urls."url", 
                  'visitCount', urls."visitCount")
                ORDER BY urls.id) 
                FILTER (WHERE urls.id IS NOT NULL)
              AS "shortenedUrls"
            FROM users
            LEFT JOIN urls 
            ON urls."userId" = users.id
            WHERE users.id = $1
            GROUP BY users.id;
            `,
            [id]
          );

          if(user.length === 0) {
            return res.sendStatus(404);
          }

          return res.status(200).send(user);
    } catch (error) {
        return res.sendStatus(500);
    }
}