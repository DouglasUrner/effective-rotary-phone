Login = React.createClass({
  validations() {
    let component = this;

    return {
      rules: {
        emailAddress: {
          required: true,
          email: true
        },
        password: {
          required: true
        }
      },
      messages: {
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address legit?'
        },
        password: {
          required: 'Need a password here.'
        }
      },
      submitHandler() {
        let { getValue } = ReactHelpers;

        let form     = component.refs.passwordForm.refs.form,
            email    = getValue( form, '[name="emailAddress"]' ),
            password = getValue( form, '[name="password"]' );

        Meteor.loginWithPassword( email, password, ( error ) => {
          if ( error ) {
            Bert.alert( error.reason, 'danger' );
          } else {
            Bert.alert( 'Logged in!', 'success' );
          }
        });
      }
    };
  },
  handleSubmit( event ) {
    event.preventDefault();
  },
  handleGoogleLogin( event ) {
    event.preventDefault();
    Meteor.loginWithGoogle( {requestPermissions: ['email']}, ( error ) => {
      if ( error ) {
        logger( 'Google login:', error.reason );
        Bert.alert( error.reason, 'danger' );
      } else {
        Bert.alert( 'Logged in!', 'success' );
      }
    });
  },
  render() {
    let passwordLabelLink = {
      href: '/recover-password',
      label: 'Forget Password?'
    };

    return (
      <GridRow>
        <GridColumn className="col-xs-12 col-sm-6 col-md-5 col-lg-4">
          <PageHeader size="h4" label="Log In" />

          <InfoAlert>
            <strong>To access the blog, login using your Highline Schools Google
            account:</strong><br/><br/>
            <em>your-student-number</em>@g.highlineschools.org
            <br/><br/>
            If you are unable
            to log in your can have your password reset by sending e-mail
            to helpdesk@highlineschools.org. Tell them your student number
            and ask them to reset the password on your Google account.
          </InfoAlert>

          <PrimaryButton type='submit' label='Login with Google'
            onClick={ this.handleGoogleLogin } />

          <br/><br/>

          <Form ref="passwordForm" id="login" className="login" validations={ this.validations() } onSubmit={ this.handleSubmit }>
            <FormGroup>
              <EmailInput ref="emailAddress" showLabel={ true } />
            </FormGroup>
            <FormGroup>
              <PasswordInput ref="password" showLabel={ true } labelLink={ passwordLabelLink } />
            </FormGroup>
            <FormGroup>
              <SuccessButton type="submit" label="Login" />
            </FormGroup>
          </Form>

        </GridColumn>
      </GridRow>
    );
  }
});
