AppHeader = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    return {
      brandLink: !!Meteor.user() ? '/posts' : '/',
      user: Meteor.user()
    };
  },
  render() {
    return (
      <NavBar id="app-header"  brand="MRHS Photo I/II Blog"
        brandLink={ this.data.brandLink }>
        { this.props.hasUser ?
          <AuthenticatedNavigation user={ this.data.user } /> :
          <PublicNavigation /> }
      </NavBar>
    );
  }
});
