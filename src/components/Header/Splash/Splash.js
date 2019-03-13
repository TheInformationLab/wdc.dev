import React from 'react';
import classes from './Splash.css';

function Splash(props) {

  return (
    <div className={classes.splash + ' ' + classes.view + ' ' + classes['intro-2']}>
      <div>
        <div className={classes.mask + ' ' + classes['rgba-orange-light'] + ' ' + classes['flex-center']}>
          <div className={classes.container + ' ' + classes['text-center'] + ' ' + classes['white-text'] + ' ' + classes.fadeInUp + ' ' + classes.headerText}>
            <h3>The Information Lab</h3>
            <h2>Web Data Connectors for Tableau</h2>
            <h5>Connecting Tableau to the data you need</h5>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Splash;
