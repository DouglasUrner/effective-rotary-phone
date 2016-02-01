let startup = () => {

  /*
  ** Setup Slingshot
  **
  ** Requires: edgee:slingshot
  **
  ** TODO:
  ** - deal with errors in fileRestrictions, don't crash.
  */

  Slingshot.fileRestrictions("postImages", {
    allowedFileTypes: ["image/png", "image/jpeg", "image/tiff"],
    maxSize: 16 * 1024 * 1024 // 16 MB (use null for unlimited).
  });

  if (Meteor.isServer) {
    // Allow links to images anywhere.
    BrowserPolicy.content.allowImageOrigin('blob:');    // Local files.
    BrowserPolicy.content.allowImageOrigin('http:');    // Remote.
    BrowserPolicy.content.allowImageOrigin('https:');   // Remote.

    Slingshot.createDirective("postImages", Slingshot.S3Storage, {
      // Bucket is auto-magic from settings.S3Bucket.
      acl: "public-read",

      authorize: function () {
        //Deny uploads if user is not logged in.
        if (!this.userId) {
          let message = "Please login before posting files";
          throw new Meteor.Error("Login Required", message);
        }
        return true;
      },

      key: function (file) {
        //Store file into a directory by the user's e-mail.
        let user = Meteor.users.findOne(this.userId);
        let path = `${user.emails[0].address}/${file.name}`;
        logger('info', 'slingshot ready to upload', path);

        //return `${user.name}/${file.name}`;
        return path;
      }
    });
  }
};

Modules.both.startup = startup;
