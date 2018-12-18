import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import '../../App.css';


const styles = theme => ({
  root: {
  },
});

class Contact extends Component {

  constructor (props) {
    super(props)

    this.state = {

    }
  }

  render() {

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <p>Contact</p>
      </div>
    );
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact);