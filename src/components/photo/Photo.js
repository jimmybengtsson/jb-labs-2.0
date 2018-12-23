import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import posed, { PoseGroup } from "react-pose";

import ImagesLogo from '../../static/photo/images.svg'
import InstagramLogo from '../../static/social/instagram.svg'
import ImageView from './imageView/ImageView'
import DraggableDiv from '../misc/DraggableDiv'
import Instagram from '../misc/Instagram'
import '../../App.css';
import Divider from '@material-ui/core/Divider'

const Swipeable = posed.li({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

const styles = theme => ({
  root: {
    height: '100%',
  },
  fillDiv: {
    height: 'calc(100vh - ' + theme.spacing.unit * 5.1 + 'px)',
    backgroundColor: theme.palette.backgroundColor,
    [theme.breakpoints.up('sm')]: {
      minHeight: 'calc(100% - ' + theme.spacing.unit * 6.1 + 'px)',
    },
  },
  fillDivTwo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
    backgroundColor: theme.palette.backgroundColor
  },
  swipe: {
    listStyleType: 'none'
  },
  draggable: {
    height: 2
  },
});

class Photo extends Component {

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
        element: <ImageView/>,
        title: 'imageView'
      },
      {
        show: false,
        element: <Instagram/>,
        title: 'instagram'
      },
    ]

    this.setState({ divArr: items });
  }

  render() {

    const divArr = this.state.divArr
      .map((it, i) => ({ ...it, i }))
      .filter(it => it.show);

    const { classes } = this.props;

    console.log(divArr)
    let isMoving = divArr.length <= 0;
    console.log(isMoving)

    return (
      <div className={classes.root}>
        <div ref={ (divElement) => this.divElement = divElement}
             className={isMoving ? classes.fillDiv : classes.fillDivTwo}
        >
          <DraggableDiv renderDraggable={this.renderDraggable}
                        state={this.state}
                        logo={ImagesLogo}
                        toggleElement={this.toggleElement}
                        name='imageView'
                        className={classes.draggable}
                        first={true}
                        isMoving={isMoving}
          />
          <DraggableDiv renderDraggable={this.renderDraggable}
                        state={this.state}
                        logo={InstagramLogo}
                        toggleElement={this.toggleElement}
                        name='instagram'
                        className={classes.draggable}
                        first={false}
                        isMoving={isMoving}
          />
        </div>
        <Divider/>
        <PoseGroup>
          {divArr.map((it, i) => {
            return (
              <Swipeable key={it.title} className={classes.swipe}>
                {it.element}
              </Swipeable>
            )

          })}
        </PoseGroup>
      </div>
    );
  }
}

Photo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Photo);