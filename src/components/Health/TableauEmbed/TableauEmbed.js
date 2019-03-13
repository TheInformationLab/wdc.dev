import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
const { tableau } = window;

let cardHeight = 350;
if (window.innerWidth <= 575) {
  cardHeight = 550;
}

const styles = {
  card: {
    minWidth: '100%',
    display: 'none',
    height: cardHeight,
    marginBottom: 20
  },
  title: {
    textAlign: 'left'
  },
  pos: {
    marginBottom: 12,
  },
};

function TableauEmbed(props) {
  const { classes } = props;
  const [url] = useState(props.url);
  const [viz, setViz] = useState(null);
  const [vizReady, setVizReady] = useState(false);

  function showViz() {
    console.log(vizReady);
    if (vizReady) {
      let sheet = viz.getWorkbook().getActiveSheet().getWorksheets()[0];
      sheet.getSummaryDataAsync().then(function(t){
         if (t.getTotalRowCount() > 0) {
           let container = viz.getParentElement();
           let card = document.getElementById(container.id + 'Card');
           card.style.display = 'inherit';
           const containerDiv = document.getElementById(container.id);
           viz.setFrameSize(parseInt(containerDiv.offsetWidth, 10), parseInt(cardHeight - 50, 10));
         }
       });
    }
  }

  const initViz = () =>  {
    const containerDiv = document.getElementById(props.id);
    let device = 'desktop';
    if (window.innerWidth <= 575) {
      device = 'phone';
    }
    const options = {
      width: containerDiv.offsetWidth,
      height: cardHeight - 50,
      device,
      hideTabs: true,
      hideToolbar: true,
      "WDC Name": props.id,
      onFirstInteractive: function() {
        setVizReady(true);
      }
    };
    let newViz = new tableau.Viz(containerDiv, url, options);
    setViz(newViz);
  };

  function listenForWindowResize() {
    if (vizReady) {
      window.addEventListener("resize", setDimensions);
      return () => {
        window.removeEventListener("resize", setDimensions);
      }
    }
  }

  function setDimensions() {
    const containerDiv = document.getElementById(props.id);
    viz.setFrameSize(parseInt(containerDiv.offsetWidth, 10), parseInt(cardHeight - 50, 10));
    if (window.innerWidth > 575 && cardHeight === 550) {
      window.location.reload();
    }
    if (window.innerWidth <= 575 && cardHeight === 350) {
      window.location.reload();
    }
  }

  useEffect(initViz, []);
  useEffect(listenForWindowResize, [vizReady]);
  useEffect(showViz, [vizReady]);

  let setVizStyle = {
    width: '100%',
    height: cardHeight - 50,
  };

  return (
    <Card className={classes.card} id={props.id+'Card'}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
          {props.name}
        </Typography>
        <div id={props.id} style={setVizStyle}/>
      </CardContent>
    </Card>
  );
}

TableauEmbed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableauEmbed);
