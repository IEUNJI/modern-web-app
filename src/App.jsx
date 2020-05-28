import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { MotionLayoutProvider } from 'react-motion-layout';

import routes from 'routes/routes';
import openConsole from 'utils/openConsole';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    openConsole();
  }

  render() {
    return (
      <MotionLayoutProvider>
        <HashRouter>
          <Switch>
            {
              routes.map((route, index) => (
                <Route key={`route-${index}`} {...route} />
              ))
            }
          </Switch>
        </HashRouter>
      </MotionLayoutProvider>
    );
  }
}

export default App;
