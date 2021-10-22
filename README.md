# COMP30022 2021-sem2-IT-project Team DUCKROLL

Repository for creating website for the IT project subject at Melbourne Uni

![CI Workflow Status](https://github.com/github/docs/actions/workflows/node.js.yml/badge.svg)

See latest automated testing report here: mochawesome-report/mochawesome.html


# Team members:
| Name       | Role          |
| ------------- |:-------------:|
| Ayda Zhao      | Backend team |
| Bardia Zamani     | Scrum Master and Test Writer     |
| Callum Delaney    | Frontend team, repo owner     |
| Declan Gannon | Backend team, database owner      |
| Jiaqi Fu | Frontend team      |



# Stack and technologies being used:

We are using the MERN stack of MongoDB, Express, React, Node. We are also using Cloudinary to host our images, and Mocha to run tests.

# Licenses used:

https://barzamsr.atlassian.net/wiki/spaces/PD/pages/35291137/License+Agreement

# How to run our application:
Currently Heroku builds it (development branch: https://crm-duckroll-test.herokuapp.com/login , main branch: https://duckroll-crm.herokuapp.com/ , please note, that it may take a while to load because Heroku builds the application before the user can access it) , but if you want to run it manually, open the project up to the directory "2021-sem2-IT-project", command the terminal to 
```
npm install 
npm run build
npm start
```
Once the terminal has written the message of :

"Server listening on 3001

connection to MongoDB on cluster0-shard-00-01.uxvwm.mongodb.net:undefined

Success"

navigate to localhost:3001.


# API documentation:
https://barzamsr.atlassian.net/wiki/spaces/PD/pages/19791873/API+Documentation


# Some information about the repo:

It is found here [https://github.com/Wlzrad/2021-sem2-IT-project]


# Directories:

```models``` - holds our backend schemas, and also our connection to the database

```test``` - holds testing functions and data

```routes``` - holds our router file

```mochawesome-report``` - report generated by our mocha tests

```controllers``` - holds our backend functions

```client/src``` - holds the source code for the frontend side of the application

