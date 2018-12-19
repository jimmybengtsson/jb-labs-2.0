import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import posed, { PoseGroup } from "react-pose";

import '../../App.css';
import GithubRepos from './GihubRepos'
import Knowledge from './Knowledge'
import Education from './Education'
import DraggableDiv from '../misc/DraggableDiv'

import EducationLogo from '../../static/code/education.svg'
import GithubLogo from '../../static/social/github.svg'
import KnowledgeLogo from '../../static/code/skills.svg'

const Swipeable = posed.li({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

const styles = theme => ({
  root: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing.unit*5
    },
  },
  fillDiv: {
    height: '50%',
    backgroundColor: theme.palette.backgroundColor
  },
  swipe: {
    listStyleType: 'none'
  },
  draggable: {
    height: 2
  },

});

class Code extends Component {

  constructor (props) {
    super(props)

    this.state = {
      divArr: []
    }
  }

  renderDraggable = (logo) => {
    return (
      <img src={logo} alt='logo'/>
    )
  }

  toggleElement = (element, open) => {
    const divArr = this.state.divArr
    let tempArr = this.state.divArr

    for (let i = 0; i < divArr.length; i++) {
      if (divArr[i].title === element) {
        divArr[i].show = !divArr[i].show
        let temp = divArr[i]

        tempArr.splice(i, 1);
        tempArr.unshift(temp)
      }
    }

    this.setState({ divArr: tempArr });
  }

  componentDidMount() {
    const height = this.divElement.clientHeight;
    const width = this.divElement.clientWidth;
    this.setState({ divHeight: height, divWidth: width });
  }

  componentWillMount() {

    const items = [
      {
        show: false,
        element: <GithubRepos/>,
        title: 'githubRepos'
      },
      {
        show: false,
        element: <Knowledge/>,
        title: 'knowledge'
      },
      {
        show: false,
        element: <Education/>,
        title: 'education'
      },
    ]

    this.setState({ divArr: items });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  render() {

    const divArr = this.state.divArr
      .map((it, i) => ({ ...it, i }))
      .filter(it => it.show);

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <PoseGroup ref={ (divElement) => this.topElement = divElement}>
          {divArr.map((it, i) => {
            return (
              <Swipeable key={it.title} className={classes.swipe}>
                {it.element}
              </Swipeable>
            )

          })}
        </PoseGroup>
        <div ref={ (divElement) => this.divElement = divElement}
             className={classes.fillDiv}
        >
          <DraggableDiv renderDraggable={this.renderDraggable}
                        state={this.state}
                        logo={GithubLogo}
                        toggleElement={this.toggleElement}
                        name='githubRepos'
                        first={true}
          />
          <DraggableDiv renderDraggable={this.renderDraggable}
                        state={this.state}
                        logo={KnowledgeLogo}
                        toggleElement={this.toggleElement}
                        name='knowledge'
                        first={false}
          />
          <DraggableDiv renderDraggable={this.renderDraggable}
                        state={this.state}
                        logo={EducationLogo}
                        toggleElement={this.toggleElement}
                        name='education'
                        first={false}
          />
        </div>
      </div>
    );
  }
}

Code.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Code);