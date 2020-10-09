# tap-estl-assessment
This repository is for the GovTech Technology Associate Programme (TAP) 2021 Take Home Assessment from ETL, due 14 October 2020.

## How to start
Ensure the following is installed:
- Docker version 19
- npm version 6.14.8

1. Run `docker-compose up` in root folder.
1a. If first time running, terminate docker after db instance logs: "database systen is ready to accept connections", and run `docker-compose up` again
2. Run `npm install` in \frontend folder
3. Run `npm start` in \frontend folder

## Design decisions
Due to relative lack of experience, the example site created at https://github.com/eugenefdw/to-do-site, which uses the guide from https://hassansaleh.info/,  will be used as the basis for this assessment submission. The tutorial uses a PERN stack, and roughly teaches how to use Docker for deployment.

Any design decisions, deviations and learning resources used during this process will be listed below as I create the application.


npm version 6.14.8
docker desktop for windows 2.4.0.0 running through WSL 2
docker version 19.03.13, build 4484c46d9d

checking postgres encoding - unknown how db is set up automatically by docker, how table is added immediately
https://stackoverflow.com/q/6454146

@m4dkip for discussing the table format
- originally set both pkey and login to UNIQUE, was explained that pkey is inherently unique
- warned not to do UNIQUE(id, login) as it makes it pairwise unique instead

https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard


