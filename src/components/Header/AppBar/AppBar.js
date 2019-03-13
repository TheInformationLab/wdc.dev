import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';
import Splash from '../Splash/Splash';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  company: {
    flexGrow: 1,
    textAlign: 'left'
  },
  titleLink : {
    textDecoration: 'none',
    color: 'rgb(30,30,30)'
  }
});

function SimpleAppBar(props) {
  const { classes } = props;

  const style = {
    zIndex: '99999'
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default">
          <Toolbar className="MuiPaper-elevation4-18" style={style}>
            <Typography variant="h6" color="inherit" className={classes.company}>
              <a href="/" className={classes.titleLink}>The Information Lab</a>
            </Typography>
            <Button color="secondary" className={classes.button} href="/health">
              Connector Monitoring
              <NetworkCheckIcon className={classes.rightIcon} />
            </Button>
          </Toolbar>
        <Splash />
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);
