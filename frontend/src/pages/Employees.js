import { Grid, makeStyles, Paper } from '@material-ui/core';
import EmployeesTableView from '../components/EmployeesTableView';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    margin: '25px 0px 0px 0px'
  },
  salaryFilterRow: {

  },
}));

export default function Employees() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container xs={12} className={classes.container} alignItems="center" justify="center">
        <Grid container item xs={12} spacing={4} alignItems="center" justify="center">
          <Grid item md={6} sm={12}>
            <Paper>
              FILTER
            </Paper>
          </Grid>
          <Grid item md={6} sm={12} >
            <Paper>
              FILTER
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <EmployeesTableView />
        </Grid>
      </Grid>
    </div>

  )
}