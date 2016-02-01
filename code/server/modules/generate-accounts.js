let admin = [
  {
    name: { first: 'Douglas', last: 'Urner' },
    email: 'dlu@canishe.com',
    password: Meteor.settings.DLU_password
  },
  {
    name: { first: 'Gaelan', last: 'Steele' },
    email: 'gbs@canishe.com',
    password: Meteor.settings.GBS_password
  },
];

let generateAccounts = () => {
  let initialUsers = 0;
  let usersExist = _checkIfAccountsExist( admin.length + initialUsers );

  if ( !usersExist ) {
    _createUsers( admin );
    // _createUsers( _generateInitialUsers( initialUsers ) );
  }
};

let _checkIfAccountsExist = ( count ) => {
  let userCount = Meteor.users.find().count();
  return userCount < count ? false : true;
};

let _createUsers = ( users ) => {
  for ( let i = 0; i < users.length; i++ ) {
    let user       = users[ i ],
        userExists = _checkIfUserExists( user.email );

    if ( !userExists ) {
      _createUser( user );
    }
  }
};

let _checkIfUserExists = ( email ) => {
  return Meteor.users.findOne( { 'emails.address': email } );
};

let _createUser = ( user ) => {
  Accounts.createUser({
    email: user.email,
    password: user.password,
    profile: {
      name: user.name
    }
  });
};

let _generateInitialUsers = ( count ) => {
  let users = [];

  for ( let i = 0; i < count; i++ ) {
    users.push({
      name: { first: faker.name.firstName(), faker: user.name.lastName() },
      email: faker.internet.email(),
      password: 'password'
    });
  }

  return users;
};

Modules.server.generateAccounts = generateAccounts;
