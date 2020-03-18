import React from 'react';
import { HashRouter, Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import routes from 'routes/routes';
import './App.less';

@withRouter
class TransitionRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transitionAction: {
        PUSH: 'forward',
        POP: 'back',
        REPLACE: 'forward'
      },
      pathList: [],
      prevPath: this.props.location.pathname
    };
  }

  listener = (location, action) => {
    const { transitionAction, pathList, prevPath } = this.state;
    const curPath = location.pathname;

    this.setState({
      prevPath: curPath
    });

    if (action === 'REPLACE' && curPath !== prevPath) {
      const curIndex = pathList.indexOf(curPath);
      const prevIndex = pathList.indexOf(prevPath);

      transitionAction.REPLACE = curIndex > prevIndex ? 'forward' : 'back';

      this.setState({
        transitionAction
      });
    }
  }

  componentDidMount() {
    this.props.history.listen(this.listener);
  }

  render() {
    const { history, location } = this.props;
    const { transitionAction } = this.state;
    
    return (
      <TransitionGroup
        id="routes-wrapper"
        childFactory={child => React.cloneElement(child, { classNames: transitionAction[history.action] })}
      >
        <CSSTransition
          timeout={500}
          classNames="forward"
          key={location.pathname}
        >
          <Switch location={location}>
            {
              routes.map((route, index) => (
                <Route key={`route-${index}`} {...route} />
              ))
            }
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HashRouter>
        <TransitionRoutes />
      </HashRouter>
    );
  }
}

export default App;
