import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';

class LoginPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <ForgotPasswordForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
