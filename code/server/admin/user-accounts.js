/*
** server/admin/user-accounts.js
**
** Manage user accounts.
*/

/*
 * Log user login / logout events.
 *
 * Depends on: mizzao:user-status
 */

Meteor.users.find({ 'status.online': true }).observe({
  added: (user) => {
    // User just came on line.
    logger( 'info', 'login:', guessWho(user) );
  },

  removed: (user) => {
    // User just logged out / disconnected.
    logger( 'info', 'logout:', guessWho(user) );
  }
});

function guessWho(u) {
  let who = `${u.profile.name.first} ${u.profile.name.last}`;
  who += ` <${u.emails[0].address}> (${u.roles.toString()})`;
  who += ` ${u.status.lastLogin.ipAddr}`;

  return who;
}

Accounts.validateNewUser( function (u) {

  // Validate source of Google accounts. We only want accounts associated with
  // our organization.

  // logger( 'info', 'validateNewUser:', u );

  if ( typeof u.services.google !== 'undefined' ) {

    let g = u.services.google;

    if ( g.email.match('@g.highlineschools.org$') ) {
      return true;
    } else {
      logger( 'warning', 'validate: fail:', g.email );
      throw new Meteor.Error( 403, 'Please user your school Google account.' );
    }
  } else {
    if ( Meteor.users.find().count() < Meteor.settings.adminUsers.length ) {
      // Bootstrapping - first account is the administrator.
      logger( 'alert', 'creating first account: ', u.emails[0].address );
      return true;
    } else {
      logger( 'warning', 'validate: fail:', u.emails[0].address );
      throw new Meteor.Error( 403, 'Please user your school Google account.' );
    }
  }
});

Accounts.onCreateUser( function (options, u) {

  // logger('onCreateUser', options, u);

  // u is a Meteor user object.

  if ( Meteor.users.find().count() < Meteor.settings.adminUsers.length ) {
    // Bootstrapping, create first user account as administrator (admin role).
    u.roles = [ 'admin' ];
  } else {
    let g = u.services.google;

    if ( g.email.match('^[1-9][0-9]+@') ) {
      u.roles = [ 'student' ];
    } else {
      u.roles = [ 'teacher' ];
    }

    // Make Google login profiles look like password login profiles.
    u.emails = [{
      address: g.email,
      verified: true,
    }]; // XXX what is the right way to do this?
    options.profile.name = { first: g.given_name, last: g.family_name };
  }

  if ( typeof options.profile !== 'undefined' ) {
    u.profile = options.profile;
  } else {
    u.profile = {};
  }

  let name = `${u.profile.name.first} ${u.profile.name.last}`;
  let email = u.emails[0].address;
  let roles = u.roles.toString();
  logger('info', 'created:', `'${name}' <${email}> '${roles}'` );

  return u;
});
