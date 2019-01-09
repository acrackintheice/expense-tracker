import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Navigation from './Navtigation'
import ExpensesTable from './ExpensesTable';

const styles = theme => ({
  root: {
  }
});

function PageLayout(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Navigation />
      <ExpensesTable />
    </div>
  );
}

PageLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageLayout);