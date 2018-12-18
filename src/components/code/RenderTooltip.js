import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Markdown from '../misc/Markdown'

import '../../App.css';
import Typography from '@material-ui/core/es/Typography'
import Button from '@material-ui/core/Button'


const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  title: {
    fontSize: 14,
  },
  markdown: {

    '& img': {
  maxWidth: '90%'
}
  },
  button: {
    alignSelf: 'flex-end'
  }
});

class RenderTooltip extends Component {

  constructor (props) {
    super(props)

    this.state = {

    }
  }

  render() {

    const { classes, itemData } = this.props;
    return (
      <div className={classes.root}>
        <Typography className={classes.title} color='primary' gutterBottom>
          {itemData.title}
        </Typography>
        <Markdown className={classes.markdown} sidebar='false'>
          {itemData.extra}
        </Markdown>
        <Button className={classes.button}
                size="small"
                variant='outlined'
                color='primary'
                target="_blank"
                href={itemData.url}
        >Go to page</Button>
      </div>
    );
  }
}

RenderTooltip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RenderTooltip);