# tap-estl-assessment
This repository is for the GovTech Technology Associate Programme (TAP) 2021 Take Home Assessment from ETL, due 14 October 2020.

## How to start
Ensure the following is installed:
- Docker version 19
- npm version 6.14.8

1. Run `docker-compose up` in root folder.
- If first time running, terminate docker after db instance logs: "database systen is ready to accept connections", and run `docker-compose up` again. This is to ensure the database instance is fully initialised.
2. Run `npm install` in \frontend folder
3. Run `npm start` in \frontend folder

## Misc
Due to relative lack of experience, the example site created at https://github.com/eugenefdw/to-do-site, which uses the guide from https://hassansaleh.info/,  will be used as the basis for this assessment submission. The tutorial uses a PERN stack, and roughly teaches how to use Docker for deployment.

Major credit to @m4dkip and @DigiPie for discussions and help with postgres, especially with confirming that my schemas and queries aren't too weird. Postgres has pretty cool documentation too.

https://medium.com/welldone-software/an-overview-of-javascript-testing-7ce7298b9870 for a really comprehensive overview on JS testing frameworks and telling me to try Jest.




## Software/Packages used
- npm version 6.14.8
- docker desktop for windows 2.4.0.0 running through WSL 2
- docker version 19.03.13, build 4484c46d9d

### Backend
- express 4.17.1
- cors 2.8.5
- body-parser 1.19.0
- pg 8.4.0
- express-fileupload 1.2.0
  - For handling multipart formdata file uploading
- papaparse 5.3.0
  - For simple csv parsing
  
### Frontend
- react 16.13.1
- react-router-dom 5.2.0
- axios 0.20.0
- @material-ui/core 4.11.0
- @material-ui/icons 4.9.1
- material-ui-dropzone 3.5.0
  - For simple file uploading
- @material-ui's dashboard template
  - https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard

