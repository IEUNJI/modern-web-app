import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

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
      <HashRouter>
        <Switch>
          {
            routes.map((route, index) => (
              <Route key={`route-${index}`} {...route} />
            ))
          }
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
