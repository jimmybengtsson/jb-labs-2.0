import React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  listItem: {
    marginTop: theme.spacing.unit,
  },
});

let textSize = '70%';

const options = {
  overrides: {
    h1: { component: props => <Typography color='inherit' gutterBottom variant="headline" {...props} /> },
    h2: { component: props => <Typography color='inherit' gutterBottom variant="subheading" {...props} /> },
    h3: { component: props => <Typography color='inherit' gutterBottom variant="subtitle1" {...props} /> },
    h4: { component: props => <Typography color='inherit' gutterBottom variant="caption" paragraph {...props} /> },
    p: { component: props => <Typography color='inherit' paragraph {...props} /> },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography color='inherit' component="span" {...props} />
        </li>
      )),
    },
  },
};

const optionsSideBar = {

  overrides: {
    h1: { component: props => <Typography gutterBottom variant="h4" {...props} style={{fontSize: '90%' }} /> },
    h2: { component: props => <Typography gutterBottom variant="h6" {...props} style={{fontSize: textSize }} /> },
    h3: { component: props => <Typography gutterBottom variant="subtitle1" {...props} style={{fontSize: textSize }} /> },
    h4: { component: props => <Typography gutterBottom variant="caption" paragraph {...props} style={{fontSize: textSize }} /> },
    p: { component: props => <Typography paragraph {...props} style={{fontSize: textSize }} /> },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography component="span" {...props} style={{fontSize: textSize }} />
        </li>
      )),
    },
  },
};

const optionsMobile = {
  overrides: {
    h1: { component: props => <Typography gutterBottom variant="title" {...props} /> },
    h2: { component: props => <Typography gutterBottom variant="subheading" {...props} /> },
    h3: { component: props => <Typography gutterBottom variant="subtitle1" {...props} /> },
    h4: { component: props => <Typography gutterBottom variant="caption" paragraph {...props} /> },
    p: { component: props => <Typography paragraph {...props} /> },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography component="span" {...props} />
        </li>
      )),
    },
  },
};

function Markdown(props) {
  if (props.sidebar === 'sidebar') {
    return <ReactMarkdown options={optionsSideBar} {...props} />;
  }

  if (props.sidebar === 'mobile') {
    return <ReactMarkdown options={optionsMobile} {...props} />;
  }

  return <ReactMarkdown options={options} {...props} />;
}

export default Markdown;
