import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/shared/validations/login';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        (res) => this.context.router.push('/'),
        (err) => this.setState({ errors: { form:"Invalid Username or password" }, isLoading: false })
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, email, password, isLoading } = this.state;
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <form onSubmit={this.onSubmit}>
            <h1>Reset Password</h1>

           { errors.form ? <div className="alert alert-danger">{errors.form}</div>: '' }

            <TextFieldGroup
              field="password"
              label="Password"
              value={password}
              error={errors.password}
              onChange={this.onChange}
              type="password"
            />

            <TextFieldGroup
              field="password"
              label="Verify Password"
              value={password}
              error={errors.password}
              onChange={this.onChange}
              type="password"
            />

            <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Submit</button></div>
          </form>
        </div>
      </div>
    );
  }
}

ForgotPasswordForm.propTypes = {
  login: React.PropTypes.func.isRequired
}

ForgotPasswordForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { login })(ForgotPasswordForm);
