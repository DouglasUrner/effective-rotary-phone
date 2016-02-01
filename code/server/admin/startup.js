/*
**
*/

const createServiceConfiguration = function(service, clientId, secret) {

  ServiceConfiguration.configurations.remove({
    service: service
  });

  const config = {
    generic: {
      service: service,
      clientId: clientId,
      secret: secret
    },
    facebook: {
      service: service,
      appId: clientId,
      secret: secret
    },
    twitter: {
      service: service,
      consumerKey: clientId,
      secret: secret
    }
  };

  switch (service) {
    case 'facebook':
      return ServiceConfiguration.configurations.insert(config.facebook);
    case 'twitter':
      return ServiceConfiguration.configurations.insert(config.twitter);
    default:
      return ServiceConfiguration.configurations.insert(config.generic);
  }
};

createServiceConfiguration(
  'google',
  Meteor.settings.GoogleClientID,
  Meteor.settings.GoogleClientSecret
);
