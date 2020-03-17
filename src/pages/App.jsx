import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import routes from '../routes/routes';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRoutes = routes => {
    return routes.map((route, index) => {
      return (
        <Route key={`route-${index}`} {...route} />
      );
    });
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          {
            this.renderRoutes(routes)
          }
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
