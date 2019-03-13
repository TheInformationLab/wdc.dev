import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TilAppBar from './AppBar/AppBar';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function Header(props) {
  const headerStyle = {
    // height: '100%',
    display: 'block',
  };

  return (
    <header style={headerStyle}>
      <TilAppBar />
    </header>
  );
}

export default withStyles(styles)(Header);
