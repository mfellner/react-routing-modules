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

const CustomerProductBlack = ({ classes, match, pushHistory }) => {
  const onCloseDeactivateDialog = () => pushHistory('/');
  return (
    <Paper className={classes.paper}>
      <Typography paragraph variant="h6">
        Black
      </Typography>
      <RelativeLink to="/black/deactivate" className={classes.link}>
        <Button size="small">deactivate</Button>
      </RelativeLink>
      <Dialog
        open={match.url === '/black/deactivate'}
        onClose={onCloseDeactivateDialog}
      >
        <DialogTitle>Deactivate Black</DialogTitle>
        <DialogContent>
          <DialogContentText>Really deactivate Black?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDeactivateDialog}>yes</Button>
          <Button onClick={onCloseDeactivateDialog}>no</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default compose(
  withStyles(styles),
  withRoute,
)(CustomerProductBlack);
