import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
  },
  table: {
  },
});

class ExpensesTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      expenses: []
    };
    this.url = 'http://localhost:8080/expenses';
  }

  componentDidMount() {
    fetch(this.url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            expenses: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, expenses } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Paper className={this.props.classes.root}>
          <Table className={this.props.classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="right">Who</TableCell>
                <TableCell align="right">When</TableCell>
                <TableCell align="right">Where</TableCell>
                <TableCell align="right">How Much</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map(exp => {
                return (
                  <TableRow>
                    <TableCell component="th" scope="row"> {exp.user.name} </TableCell>
                    <TableCell align="right"> {exp.date} </TableCell>
                    <TableCell align="right"> {exp.location} </TableCell>
                    <TableCell align="right"> {exp.value} </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      )
    }
  }
}

ExpensesTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExpensesTable);