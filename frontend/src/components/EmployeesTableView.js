import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

import * as Constants from '../constants';

const headCells = [
  { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
  { id: 'login', numeric: false, disablePadding: false, label: 'Login' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'salary', numeric: true, disablePadding: false, label: 'Salary' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    padding: '25px',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 512,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  const { minimumSalary, maximumSalary } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(-1);
  const [rows, setRows] = React.useState([]);
  const rowsPerPage = 30;


  const getRowCount = useCallback(() => {
    const params = {
      minSalary: minimumSalary,
      maxSalary: maximumSalary,
    }
    axios.get(Constants.BACKEND_URL + Constants.EMPLOYEE_COUNT_API, { params })
      .then(res => {
        setCount(+res.data[0].count);
      }).catch(err => console.error(err));
  }, [minimumSalary, maximumSalary]);

  const getRows = useCallback(() => {
    const params = {
      minSalary: minimumSalary,
      maxSalary: maximumSalary,
      offset: page * rowsPerPage,
      limit: 30,
      sort: `${order === 'asc' ? '+' : '-'}${orderBy}`,
    }
    axios.get(Constants.BACKEND_URL + Constants.EMPLOYEE_DATA_API, { params })
      .then(res => {
        setRows(res.data.results);
      }).catch(err => console.error(err));
  }, [order, orderBy, page, minimumSalary, maximumSalary]);

  useEffect(() => {
    getRowCount();
    getRows();
  }, [orderBy, page, order, getRows, getRowCount])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };



  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                  >
                    <TableCell width="15%" component="th" id={labelId} scope="row" padding="none">
                      {row.id}
                    </TableCell>
                    <TableCell width="25%" align="left">{row.login}</TableCell>
                    <TableCell width="30%" align="left">{row.name}</TableCell>
                    <TableCell width="30%" align="right">{row.salary.toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[30]}
          page={page}
          onChangePage={handleChangePage}
        />
      </Paper>
    </div>
  );
}

EnhancedTable.propTypes = {
  minimumSalary: PropTypes.number.isRequired,
  maximumSalary: PropTypes.number.isRequired,
};


