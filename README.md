# Example MongoDB Connection Project

Requires MongoDB running locally

```Javascript
sudo mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork


Queries the database to extract all the films via `http://localhost:3000/allfilms/`

Query the database to extract one record by passing the object ID in the URL ie `http://localhost:3000/film/5f5a11347b75c904c01552c5`

Amend to see if you can get the images to dislayed that are in the static folder

Notes for using nodemon on Window VMs use:

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
