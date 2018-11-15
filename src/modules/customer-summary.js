import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { compose } from 'recompose';
import { RelativeLink, withRoute } from '../routing';

const styles = {
  paper: {
    padding: 8,
  },
  link: {
    textDecoration: 'none',
  },
};

const CustomerSummary = ({ classes, match, pushHistory }) => {
  const onCloseSmooshDialog = () => pushHistory('/');
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">Customer summary</Typography>
      <RelativeLink to="/smoosh" className={classes.link}>
        <Button size="small">smoosh</Button>
      </RelativeLink>
      <Dialog open={match.url === '/smoosh'} onClose={onCloseSmooshDialog}>
        <DialogTitle>Smoosh</DialogTitle>
        <DialogContent>
          <DialogContentText>Really smoosh?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseSmooshDialog}>yes</Button>
          <Button onClick={onCloseSmooshDialog}>no</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default compose(
  withStyles(styles),
  withRoute,
)(CustomerSummary);
