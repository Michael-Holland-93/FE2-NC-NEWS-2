This is an explanation of the nc-news project.

The back-end had to be created first.
A PostgreSQL database was provided along with some data (the database was not provided). The data are comprised of topics, articles, comments and users, each of these is an array of objects with a variety of keys where some of the keys are common to multiple arrays. 
The standard files to create a REST API were made, such as app and listen, and all the necessary dependecies were installed and imported into the app. 
A database was created using knex and four tables were then created with the corresponding data: topics, articles, comments and users. The format of these tables was designed in the specified way and then they were seeded with the given data. 
The routes for the app were defined and imported along with the controller functions. Then the configuration was implpemented.
The front-end had to be created next.
The standard files were created within the correct folders, such as the app file and index files. 
Finally components were then built along with the css files and then linked to each other and the app file.