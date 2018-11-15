import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { compose, withState } from 'recompose';
import { withRouter } from 'react-router-dom';

const styles = {
  paper: {
    padding: 8,
  },
};

const CustomerSearch = ({ classes, customerId, setCustomerId, history }) => (
  <Paper className={classes.paper}>
    <Typography paragraph variant="h6">
      Customer search
    </Typography>
    <TextField
      placeholder="customer ID"
      onChange={e => setCustomerId(e.target.value)}
    />
    <Button
      disabled={!customerId}
      onClick={() => history.push(`/users/${customerId}`)}
    >
      search
    </Button>
  </Paper>
);

export default compose(
  withStyles(styles),
  withState('customerId', 'setCustomerId', ''),
  withRouter,
)(CustomerSearch);
