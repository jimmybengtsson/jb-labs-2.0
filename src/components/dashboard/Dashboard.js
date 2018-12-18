import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import ArticleIcon from '@material-ui/icons/Share';
import SettingsIcon from '@material-ui/icons/Settings';
import LinksIcon from '@material-ui/icons/Link';
import ImageIcon from '@material-ui/icons/AddPhotoAlternate';

import NewArticle from './NewArticle'
import Links from './link/Links'
import Settings from './Settings'
import Image from './image/Image'

import '../../App.css';


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.backgroundColor,
  },
});

class Dashboard extends Component {

  constructor (props) {
    super(props)

    this.state = {

      tabValue: 0,
    }
  }

  handleChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  render() {

    const { classes } = this.props;

    console.log(this.props.state)
    /*if (!this.props.state.authUser) {
      return <Redirect to='/' />
    }*/

    return (
      <div >
        <Paper className={classes.root}>
          <Tabs
            value={this.state.tabValue}
            onChange={this.handleChange}
            indicatorColor="primary"
            color="primary"
            centered
          >
            <Tab icon={<ArticleIcon/>} className={classes.tab}/>
            <Tab icon={<LinksIcon/>} className={classes.tab}/>
            <Tab icon={<ImageIcon/>} className={classes.tab}/>
            <Tab icon={<SettingsIcon/>} className={classes.tab}/>
          </Tabs>
        </Paper>
        {this.state.tabValue === 0 && <NewArticle state={this.props.state}/>}
        {this.state.tabValue === 2 && <Image state={this.props.state}/>}
        {this.state.tabValue === 1 && <Links state={this.props.state}/>}
        {this.state.tabValue === 3 && <Settings state={this.props.state} />}
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);