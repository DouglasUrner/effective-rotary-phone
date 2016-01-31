/*
** client/components/layout/app.jsx
**
** https://themeteorchef.com/recipes/building-a-blog-with-react
*/

import React from 'react';

App = React.createClass({
  render() {
    return (
      <div className='app-root'>
      </div>
    );
  },
});

// App = React.createClass({
//   mixins: [ ReactMeteorData ],
//   getMeteorData() {
//     return {
//       loggingIn: Meteor.loggingIn(),
//       hasUser: !!Meteor.user(),
//       isPublic( route ) {
//         return [
//           'index',
//           'singlePost',
//           'tagIndex',
//           'login',
//           'recoverPassword',
//           'resetPassword',
//           'notFound'
//         ].indexOf( route ) > -1;
//       },
//       canView() {
//         return this.isPublic( FlowRouter.getRouteName() ) || !!Meteor.user();
//       }
//     };
//   },
//   getView() {
//     return this.data.canView() ? this.props.yield : <Login />;
//   },
//   render() {
//     return <div className="app-root">
//       <AppHeader hasUser={ this.data.hasUser } />
//       <div className="container">
//         { this.data.loggingIn ? <Loading /> : this.getView() }
//       </div>
//     </div>;
//   }
// });
