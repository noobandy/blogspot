How to run this app?
______________________

import data from data folder in mongo
1: users
    mogoimport -d blogspot-dev -c users users.json
2: blogs
    mogoimport -d blogspot-dev -c blogs blogs.json
3: posts
     mogoimport -d blogspot-dev -c posts posts.json
4: comments
     mogoimport -d blogspot-dev -c comments comments.json

create indexes
-------
db.users.createIndex({username: 1});

db.blogs.createIndex({owner: 1});

db.posts.createIndex({blogId: 1, postedAt: -1});

db.comments.createIndex({postId: 1, postedAt: -1});

Change cofig in config/dev.json

npm install (install server side dependencies)
bower install (install client side dependencies)
npm start (run application)

visit http://localhost:3000 to access the app

username anandm
password anandm
