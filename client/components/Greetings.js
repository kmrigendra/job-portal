import React from 'react';
import { connect } from 'react-redux';

class Greetings extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        {this.props.user.username ? <h1>Hi! {this.props.user.username}</h1> : <h1>Please Login...!</h1>}
      </div>
    );
  }
}

function mapStateToProps(state){
	return{
		user: state.auth.user
	};
}

export default connect(mapStateToProps)(Greetings);
