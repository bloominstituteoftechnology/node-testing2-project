const db = require("../../data/db-config.js")


module.exports = {
    getUserPosts(id){
        return db("users as u")
            .join("posts as p","p.user_id","u.id")
            .select("p.id as PostId","u.username as username","p.contents as contents")
            .where("u.id",id)
    }
}