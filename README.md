# demo-mongoose-nodejs

## Install

### Install mongoDB
Check [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

### Install project

```sh
git clone https://github.com/hoaittt-1694/mongoose-demo.git
npm install
npm start
```

Then visit node server app in [http://localhost:1234/](http://localhost:1234/)

## Decription
### Database
Include 2 collection: users, posts

Collection users:

| Attributes | Data type    | Note              | Not null | References collection | Relationship |
|------------|--------------|-------------------|----------|-----------------------|--------------|
| _id        | integer      |                   | o        | posts                 | 1:n          |
| name       | string       |                   | o        |                       |              |
| email      | string       |                   | o        |                       |              |
| posts      | array DBrefs | reference to posts |          |                       |              |

Collection posts:

| Attributes | Data type    | Note               | Not null | Default | References collection | Relationship |
|------------|--------------|--------------------|----------|---------|-----------------------|--------------|
| _id        | integer      |                    | o        |         |                       | n:1          |
| author     | string       |                    | o        |         |                       |              |
| title      | string       |                    |          | ' '      |                       |              |
| content    | string       |                    |          | ' '      |                       |              |
| date       | Date         |                    | o        |         |                       |              |
| comments   | Embedded Documents |               |          |         |                       |              |
| likes      | array DBrefs | reference to users |          |         |                       |              |

### List function
1. CRUD user.
2. CRUD post.
3. Get list post of user.
4. Comment: Create comment, get comment a post, edit, delete comment.
5. Like: Create like, count like of post, delete like.

