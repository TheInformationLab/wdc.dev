import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Fab from '@material-ui/core/Fab';
import ChevronRight from '@material-ui/icons/ChevronRight';

const styles = theme => ({
  card: {
    maxWidth: 220,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
    fontSize: '0.8125rem',
    color: 'rgb(120,120,120)'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  fab: {
    position: 'absolute',
    top: 100,
    right: 10,
    color: 'white',
  },
  button: {
    padding: '4px 2px',
    minWidth: '36px',
  },
  dataIcon: {
    marginRight: 5,
    marginLeft: 10,
  },
  connectorName: {
    fontSize: '1.2rem'
  }
});

const connector = (props) => {
  const { classes } = props;

  const style ={
    position: 'relative',
    float: 'left',
    margin: '0 15px 30px 15px',
    minHeight: '320px',
  }

  const hide = {
    display: 'none',
  }

  const images = require.context('../../../assets/img', true);
  let img = images('./' + props.image);

  return (
    <li style={style}>
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={img}
            title="Eventbrite"
          />
          <Fab className={classes.fab} size="medium" color="secondary" href={props.url}>
              <ChevronRight/>
          </Fab >
          <CardContent >
            <Typography component="h1" className={classes.connectorName}>
              {props.name}
            </Typography>
            <Typography component="p">
              {props.description}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Button variant="text" size="small" aria-label="Add to favorites" className={classes.button} style={hide}>
              <FavoriteIcon />
              12
            </Button>
            <Button variant="text" size="small" aria-label="Share" className={classes.button} style={hide}>
              <ShareIcon />
            </Button>
            <RemoveRedEyeIcon className={classes.dataIcon} />{props.views}
            <CloudDownloadIcon className={classes.dataIcon}/>{props.downloads}
          </CardActions>
        </Card>
      </div>
    </li>
  )
};

connector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connector);
