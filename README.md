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

Tests are not implemented for this assessment due to time constraints.

### Test plan
A rough set of considerations and tests will be listed below.

#### Database
Unsure. Spinning up and populating the postgres server takes a while, so it seems rather unreasonable to do database testing as part of regression testing.

However, basic tests with queries that match queries used in the application would be done otherwise. This would be done through the EmployeesModel class.

- Table creation
  - Single column tests
    - varchar
    - salary
  - Multi column tests
    - single column type (all varchar)
    - multi column type (mix of varchar, salary)
  - Unique keyword test
  
- Uploading ('upsert' tests)
  - Transaction tests
	- Single insert in transaction
	- Multiple insert in transaction
	- Single failed insert in trasaction
	  - Verify failure
	- Multiple successful insert, followed by single failed insert
	  - Verify failure, non-insertion of earlier inserts
  - Update tests
    - Single value update
	- Multiple value update
  - On Conflict test
  
- Retrieval
  - Selection test
    - Select *
	- Select specific columns
	- Select column with modification (e.g. salary::money::...)
  - Conditional test
    - Single conditional
	- Double conditional (1 AND)
	- Multiple conditional (>1 AND)
  - Sorting test
	- Ascending order by
	  - Repeated tests for each of the 4 columns
	- Descending order by for one column
  - Limit test
    - With less rows than limit
	- With more rows than limit
	- With exact rows as limit
  - Offset test
    - 0 offset
	- 30 offset with >30 rows
	- 60 offset with <60 rows
	
- Count
  - Similar to retrieval but only up to conditionals
  
#### Backend
The two service files do a bit of data validation after receiving them from the APIs.
Basic boundary test cases such as empty input would be tested.
Specific white-box testing would be done to ensure wrong data does not pass, such as min salary > max salary, invalid column count in csv etc.

For APIs, some form of mocking incoming API calls would be needed, which may be part of Jest. Again, the normal boundary tests, such as empty data, extra params in /users/, etc would be tested.

#### Frontend
Unsure given that it would involve some form of GUI testing to ensure the visual correctness of the site. I understand there's some kind of DOM element checking to run a headless frontend test. 

These tests would likely check that the table rows are properly created under EmployeesTableView, check that sorts are updating state values properly, pagination making correct API calls, etc. For the upload, acceptance of only csv files, successful API calls for uploading, successful clearing of files state on successful upload, etc. would be tested.


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

