# mod14-mvctechblog
Module 14 Challenge - MVC Tech Blog

## Description
- A totally real tech blog with real content written by definite real people and not just me!
- Attempted to use a template and bootstrap but alas, we are in ugly box hell and flummoxed by these infernal columns.
- Created User, Blogpost, and Comment models, schemas in sequelize
- HTML and API routes, (for user, blogpost, and comments)
- CRUD routes for relevant routes
- Seed data for users, blogposts, and comments
- Break down pieces into handlebars for front end
- connecting front-end scripts to read or send data from database
- Routes and structure based on MVC app structure

## Dependencies
- Node.js
- Express
- Express-handlebars
- Express-session
- MySQL2 and Sequelize
- Bcrypt

## Github Repo Link

![This very repo!](https://github.com/kumih0/mod14-mvctechblog)

## Live Link

https://warm-mesa-74352-ae10bc56c399.herokuapp.com/

## Screenshot
<img width="1809" alt="Screen Shot 2023-08-08 at 12 28 01 AM" src="https://github.com/kumih0/mod14-mvctechblog/assets/132851569/74c0d155-39cf-4230-a77c-70b8da03d3c8">

pls no boolie he is uglee but he doing he best
<img width="1809" alt="Screen Shot 2023-08-08 at 12 27 30 AM" src="https://github.com/kumih0/mod14-mvctechblog/assets/132851569/496dfc26-aac9-4d7c-ac5b-6e813c55a2dc">

### Pseudo Code
>Everything from scratch
-set up file and folder struct., install npm
-setting initial files, follow mini proj layout
    -server
    -connections/env/schema
-models: make db tables
    -user table
        import bcrypt, sequelize, models
        {id, username, pw, hooks, timestamp true}
        hash pass
    -blogpost
        {id, title, content, user_id fk ref,timestamp true}
    -comment
        {id, comment,  user_id fk ref, blogpost_id fk ref, timstamp true}
    -index: relationships/associations
        user:many blogpost
        blogpost: one user
        user : many comment
        blogpost:many comment
        comment: one user
        comment: one blogpost
-seeds: seed db
    -userdata, blogpostdata, commentdata
-controller/routes
    -htmlroutes: homepg, dashboard, login, logout
    -res.sess.save
    -api>index, userroute, blogpost, comment
        -req.body json matching models (login compare hash pw)
    -getallX, includes:{model: X}/req.body...
    -post/ comment-create, update, delete
        -post/put/destroy> redirect to updated dash
-helper funct in utils
-handlebars>views>layouts>main
    layout skeleton html
    static container
    login/sign up/logout
    dashboard if login: create post
    blogpost (one) if login comment, if not readonly
    homepage
-public 
    js:
        login.js
        logout
        dashboard (render dash all posts, all comments, create newp)
        create new post partial
    css:
        styles
