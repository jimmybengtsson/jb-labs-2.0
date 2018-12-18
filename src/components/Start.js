import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Parallax, ParallaxLayer } from 'react-spring/dist/addons'
import { Spring } from 'react-spring'
import posed from 'react-pose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const Logo = require('../static/startImg/logo.svg')
const Stars = require('../static/startImg/stars.svg')
const Cloud = require('../static/startImg/cloud.svg')
const CodeLink = require('../static/startImg/code.svg')
const CameraLink = require('../static/startImg/camera.svg')
const VideoLink = require('../static/startImg/video.svg')
const DroneLink = require('../static/startImg/drone.svg')
const BlogLink = require('../static/startImg/blog.svg')

const Box = posed.div({
  hidden: {
    opacity: 0.5,
    transition: { duration: 5000 }
  },
  visible: {
    opacity: 0.9,
    transition: { duration: 5000 }
  }
});
const HoverBox = posed.div({
  hoverable: true,
  init: { scale: 0.9 },
  hover: { scale: 1 },
})

// Little helpers ...
const url = (name, wrap = false) =>
  `${
    wrap ? 'url(' : ''
    }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ')' : ''
    }`

const styles = theme => ({
  /*arrowUp: {
    width: '9%',
    marginLeft: '90%',
    pointerEvents: 'none',
    marginBottom: '40px'
  },
  arrowDown: {
    width: '8%',
    marginLeft: '90%',
    pointerEvents: 'none',
    marginTop: 10
  },*/
  pZero: {
    backgroundImage: url('stars', true),
    backgroundColor: '#253237'
  },
  pOne: {
    background: '#253237',
    backgroundImage: url('stars', true),
  },
  pTwo: {
    background: 'linear-gradient(to bottom, #253237 0%, #87BCDE 100%)',
  },
  pThree: {
    backgroundColor: '#87BCDE'
  },
  codeDiv: {
    paddingTop: theme.spacing.unit *5,
  },
  videoDiv: {
  },
  blogDiv: {
    paddingTop: theme.spacing.unit *8,
  },
});

class Start extends Component {

  constructor (props) {
    super(props)

    this.state = {
      isVisible: true

    }

  }

  /*scrollUp = () => {

    let scrollIndex = this.parallax.current

    console.log(scrollIndex)

    if (scrollIndex === 0) {
      return this.parallax.scrollTo(0)
    }

    return this.parallax.scrollTo(scrollIndex - 1)

  }

  scrollDown = () => {

    let scrollIndex = this.parallax.current

    console.log(scrollIndex)
    if (scrollIndex === 4) {
      return this.parallax.scrollTo(0)
    }

    return this.parallax.scrollTo(scrollIndex + 1)

  }*/

  componentDidMount() {
    setInterval(() => {
      this.setState({ isVisible: !this.state.isVisible });
    }, 5050);
  }

  render() {

    const { classes, history } = this.props
    const { isVisible } = this.state;

    return (
      <div style={{ width: '100%', height: '100%', background: '#253237' }}>
        <Parallax ref={ref => (this.parallax = ref)} pages={4}>

          <ParallaxLayer
            offset={0}
            speed={0}
            className={classes.pZero}
            style={{backgroundSize: 'cover',}}
          />

          <ParallaxLayer
            offset={1}
            speed={0}
            className={classes.pOne}
            style={{backgroundSize: 'cover',}}
          />
          <ParallaxLayer
            offset={2}
            speed={0}
            className={classes.pTwo}
          />

          <ParallaxLayer
            offset={3}
            speed={0}
            className={classes.pThree}
          />

          <ParallaxLayer offset={2.7} speed={0.6} style={{ opacity: 0.1 }}>
            <img
              src={Cloud}
              style={{ display: 'block', width: '20%', marginLeft: '55%' }}
              alt='Cloud'
            />
            <img
              src={Cloud}
              style={{ display: 'block', width: '10%', marginLeft: '15%' }}
              alt='Cloud'
            />
          </ParallaxLayer>

          <ParallaxLayer offset={3.4} speed={0.5} style={{ opacity: 0.1 }}>
            <img
              src={Cloud}
              style={{ display: 'block', width: '20%', marginLeft: '70%' }}
              alt='Cloud'
            />
            <img
              src={Cloud}
              style={{ display: 'block', width: '20%', marginLeft: '40%' }}
              alt='Cloud'
            />
          </ParallaxLayer>

          <ParallaxLayer offset={3} speed={0.3} style={{ opacity: 0.2 }}>
            <img
              src={Cloud}
              style={{ display: 'block', width: '10%', marginLeft: '10%' }}
              alt='Cloud'
            />
            <img
              src={Cloud}
              style={{ display: 'block', width: '20%', marginLeft: '75%' }}
              alt='Cloud'
            />
          </ParallaxLayer>

          <ParallaxLayer offset={2.7} speed={0.1} style={{ opacity: 0.4 }}>
            <img
              src={Cloud}
              style={{ display: 'block', width: '20%', marginLeft: '60%' }}
              alt='Cloud'
            />
            <img
              src={Cloud}
              style={{ display: 'block', width: '25%', marginLeft: '30%' }}
              alt='Cloud'
            />
            <img
              src={Cloud}
              style={{ display: 'block', width: '10%', marginLeft: '80%' }}
              alt='Cloud'
            />
          </ParallaxLayer>

          <ParallaxLayer offset={3.2} speed={0.4} style={{ opacity: 0.6 }}>
            <img
              src={Cloud}
              style={{ display: 'block', width: '20%', marginLeft: '5%' }}
              alt='Cloud'
            />
            <img
              src={Cloud}
              style={{ display: 'block', width: '15%', marginLeft: '75%' }}
              alt='Cloud'
            />
          </ParallaxLayer>

          <ParallaxLayer
            offset={0}
            speed={0.1}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Box className="box" style={{ width: '50%'}} pose={isVisible ? 'visible' : 'hidden'} >
              <img src={Logo} alt='Logo' />
            </Box>
          </ParallaxLayer>

          <ParallaxLayer
            offset={0.95}
            speed={0.1}
            className={classes.codeDiv}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40%',
              marginLeft: '30%',
              maxHeight: '40%'
            }}>
            <Tooltip title="Code">
              <HoverBox style={{ width: '100%'  }}>
                <img src={CodeLink} style={{ width: '100%' }} onClick={() => history.push('/code')} alt='Code-link' />
              </HoverBox>
            </Tooltip>
          </ParallaxLayer>

          <ParallaxLayer
            offset={1.5}
            speed={0.3}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '30%',
              marginLeft: '10%',
              maxHeight: '30%'
            }}>
            <Tooltip title="Photography">
              <HoverBox style={{ width: '100%'  }}>
                <img src={CameraLink} style={{ width: '100%'  }} onClick={() => history.push('/photo')} alt='Camera-link'/>
              </HoverBox>
            </Tooltip>
          </ParallaxLayer>

          <ParallaxLayer
            offset={1.9}
            speed={0.2}
            className={classes.videoDiv}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '30%',
              marginLeft: '60%',
              maxHeight: '30%'
            }}>
            <Tooltip title="Video">
              <HoverBox style={{ width: '100%'  }}>
                <img src={VideoLink} style={{ width: '100%'  }} onClick={() => history.push('/video')} alt='Video-link'/>
              </HoverBox>
            </Tooltip>
          </ParallaxLayer>

          <ParallaxLayer
            offset={2.3}
            speed={0.6}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '30%', marginLeft: '35%'
            }}>
            <Tooltip title="Drone">
              <HoverBox style={{ width: '100%'  }}>
                <img src={DroneLink} style={{ width: '100%'  }} onClick={() => history.push('/drone')} alt='Drone-link'/>
              </HoverBox>
            </Tooltip>
          </ParallaxLayer>

          <ParallaxLayer
            offset={2.7}
            speed={0.1}
            className={classes.blogDiv}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '30%',
              marginLeft: '10%',
              maxHeight: '30%'
            }}>
            <Tooltip title="Blog">
              <HoverBox style={{ width: '100%'  }}>
                <img src={BlogLink} style={{ width: '100%'  }} onClick={() => history.push('/blog')} alt='Blog-link'/>
              </HoverBox>
            </Tooltip>
          </ParallaxLayer>

          <ParallaxLayer
            offset={3.5}
            speed={-0.4}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '70%',
              marginLeft: '15%',
              maxHeight: '40%'
            }}>
            <Tooltip title="Contact">
              <HoverBox style={{ width: '100%'  }}>
                <img src={url('earth')} style={{ width: '100%' }} onClick={() => history.push('/contact')} alt='Earth-link'/>
              </HoverBox>
            </Tooltip>
          </ParallaxLayer>

        </Parallax>
      </div>
    )
  }
}

Start.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Start));
