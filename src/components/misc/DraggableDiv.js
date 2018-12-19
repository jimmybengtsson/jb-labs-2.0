import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Draggable from 'react-draggable';

import '../../App.css';

const styles = theme => ({
  root: {
  },
  draggable: {
    width: 70,
    height: 70
  },
  draggableTwo: {
    width: 70,
    height: 70,
    marginTop: '-70px !important'
  }
});

class DraggableDiv extends Component {

  constructor (props) {
    super(props)

    this.state = {
      activeDrags: 0,
      deltaPosition: {
        x: 0, y: 0
      },
      controlledPosition: {
        x: Math.floor(Math.random() * 300) + 1, y: Math.floor(Math.random() * 300) + 1, oldX: Math.floor(Math.random() * 300) + 1  , oldY: Math.floor(Math.random() * 300) + 1,
      }
    }
  }

  adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {x, y} = this.state.controlledPosition;
    this.setState({controlledPosition: {x: x - 10, y}});
  }

  adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {controlledPosition} = this.state;
    const {x, y} = controlledPosition;
    this.setState({controlledPosition: {x, y: y - 10}});
  }

  onControlledDrag = (e, position) => {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
  }

  moveDraggable = () => {
    const {controlledPosition} = this.state;

    let x;
    let y;
    if (controlledPosition.x === this.props.state.divWidth - 60) {
      x = controlledPosition.x - 1
    } else if (controlledPosition.x === 0) {
      x = controlledPosition.x + 1
    } else if (controlledPosition.x > controlledPosition.oldX) {
      x = controlledPosition.x + 1
    } else {
      x = controlledPosition.x - 1
    }

    if (controlledPosition.y === this.props.state.divHeight - 80) {
      y = controlledPosition.y - 1
    } else if (controlledPosition.y === 0) {
      y = controlledPosition.y + 1
    } else if (controlledPosition.y > controlledPosition.oldY) {
      y = controlledPosition.y + 1
    } else {
      y = controlledPosition.y - 1
    }

    this.setState({
      controlledPosition: {
        x: x, y: y, oldX: controlledPosition.x, oldY: controlledPosition.y,
      }
    })
  }

  stopInterval = () => {
    clearInterval(this.interval)
  }

  startInterval = () => {
    this.interval = setInterval(() => {
      this.moveDraggable()
    }, 20);
  }

  componentDidMount() {
    this.startInterval()
  }

  render() {

    const { classes, renderDraggable, logo } = this.props;
    const {deltaPosition, controlledPosition} = this.state;

    return (
        <Draggable bounds="parent" position={controlledPosition} >
          <div className={this.props.first ? classes.draggable : classes.draggableTwo}
               onMouseOver={this.stopInterval}
               onMouseLeave={this.startInterval}
               onClick={() => this.props.toggleElement(this.props.name)}
          >
            {renderDraggable(logo)}
          </div>
        </Draggable>
    );
  }
}

DraggableDiv.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DraggableDiv);