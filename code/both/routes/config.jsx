/*
** both/routes/configure.jsx
**
** https://themeteorchef.com/recipes/building-a-blog-with-react
*/

FlowRouter.notFound = {
  name: 'notFound',
  action() {
    ReactLayout.render( App, { yield: <NotFound /> } );
  }
};

Accounts.onLogin( () => {
  let currentRoute = FlowRouter.current();
  if ( currentRoute && currentRoute.route.group.name === 'public' ) {
    FlowRouter.go( 'posts' );
  }
});
