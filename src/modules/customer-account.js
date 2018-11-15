import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = {
  paper: {
    padding: 8,
  },
};

const CustomerAccount = ({ classes }) => (
  <Paper className={classes.paper}>
    <Typography variant="h6">Customer account</Typography>
  </Paper>
);

export default withStyles(styles)(CustomerAccount);
