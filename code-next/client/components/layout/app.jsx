/*
** client/components/layout/app.jsx
**
** https://themeteorchef.com/recipes/building-a-blog-with-react
*/

import React from 'react';
import {composeWithTracker} from 'react-komposer';

const App = React.createClass({
  getView() {
    return this.props.canView() ? this.props.yield : <Login />;
  },
  render() {
    return <div className="app-root">
      <AppHeader hasUser={ this.data.hasUser } />
      <div className="container">
        { this.data.loggingIn ? <Loading /> : this.getView() }
      </div>
    </div>;
  },
});

const data = (props, onData) => {
  onData(null, {
    loggingIn: Meteor.loggingIn(),
    hasUser: !!Meteor.user(),
    isPublic( route ) {
      return [
        'index',
        'singlePost',
        'tagIndex',
        'login',
        'recoverPassword',
        'resetPassword',
        'notFound',
      ].indexOf( route ) > -1;
    },
    canView() {
      return this.isPublic( FlowRouter.getRouteName() ) || !!Meteor.user();
    },
  });
}

export default composeWithTracker(data)(App);
