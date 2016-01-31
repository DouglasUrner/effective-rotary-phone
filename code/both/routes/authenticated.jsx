/*
** both/routes/authenticated.jsx
**
** Routes that are visible only to logged in users.
**
** https://themeteorchef.com/recipes/building-a-blog-with-react
*/

const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});

authenticatedRoutes.route( '/posts', {
  name: 'posts',
  action() {
    ReactLayout.render( App, { yield: <PostsList /> } );
  }
});

authenticatedRoutes.route( '/posts/:_id/edit', {
  name: 'editor',
  action( params ) {
    ReactLayout.render( App, { yield: <Editor post={ params._id } /> } );
  }
});
