import { Grid, Input, makeStyles, Paper } from '@material-ui/core';
import EmployeesTableView from '../components/EmployeesTableView';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    margin: '25px 0px 0px 0px'
  },
  salaryFilterRow: {

  },
  table: {
    margin: '25px',
  },
}));

export default function Employees() {
  const classes = useStyles();

  const [minSalary, setMinSalary] = React.useState(0);
  const [maxSalary, setMaxSalary] = React.useState(40000);

  const handleMinSalarySubmit = (event) => {
    if (!(isNaN(event.target.value) || event.target.value === null || event.target.value < 0 || event.target.value === '' || event.target.value > maxSalary)) {
      setMinSalary(Number(event.target.value));
    }

  };

  const handleMaxSalarySubmit = (event) => {
    if (!(isNaN(event.target.value) || event.target.value === null || event.target.value < 0 || event.target.value === '' || event.target.value < minSalary)) {
      setMaxSalary(Number(event.target.value));
    }
  };


  return (
    <div className={classes.root}>
      <Grid container className={classes.container} alignItems="center" justify="center">
        <Grid container item xs={12} spacing={4} alignItems="center" justify="center">
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <Paper>
              <Input type="number" value={minSalary} onChange={handleMinSalarySubmit} />
              FILTER
            </Paper>
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <Paper>
              <Input type="number" value={maxSalary} onChange={handleMaxSalarySubmit} />
              FILTER
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.table}>
            <EmployeesTableView minimumSalary={minSalary} maximumSalary={maxSalary} />
          </div>
        </Grid>
      </Grid>
    </div>

  )
}