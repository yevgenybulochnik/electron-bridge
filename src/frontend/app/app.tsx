import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import Login from './features/login/containers/login';
import NavBar from './features/nav/containers/navBar';

import Designer from './views/designer/designer'

const styles = require('./app.sass')

interface IAppProps {
  userIDState: any;
}

function checkState(state: any) {
  let logedIn = typeof(state) === 'number' ? true : false
  return logedIn
}

const App: React.SFC<IAppProps> = ({userIDState}) => {
  return checkState(userIDState) ? (
    <div styleName='app-container'>
      <div>statusbar holder</div>
      <NavBar>
        <Switch>
          <Route exact path='/designer' component={Designer} />
        </Switch>
      </NavBar>
    </div>
  ) : (
    <div styleName='app-container'>
      <Login />
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  userIDState: state.userID
})

export default withRouter(connect(
  mapStateToProps
)(CSSModules(App, styles)) as any)
