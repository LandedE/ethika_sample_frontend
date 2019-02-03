import React, { Component } from 'react';

class CreateUser extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className={"create_user_form " + this.props.className}>
        <div className={!this.props.create_user_success_message ? "hidden" : "alert alert-success"} role="alert">
          {this.props.create_user_success_message}
        </div>
        <form onSubmit={this.props.submitUser}>
          <div className="form-group">
            <label for="exampleInputEmail1">First Name</label>
            <input onChange={this.props.onInputChange} type="text"
              maxlength="20"
              data-input-ref="user_input_first_name" className="form-control"
              id="inputFirstName" aria-describedby="emailHelp"
              placeholder="First Name"
              value={this.props.user_input_first_name}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Last Name</label>
            <input onChange={this.props.onInputChange} required type="text"
              maxlength="20"
              data-input-ref="user_input_last_name" className="form-control"
              id="inputLastName" placeholder="Last Name"
              value={this.props.user_input_last_name}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Email Address</label>
            <input onChange={this.props.onInputChange} required type="email"
              maxlength="30"
              data-input-ref="user_input_email" className="form-control"
              id="inputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
              value={this.props.user_input_email}
            />
          </div>
          <p style={{color: "red"}} className={!this.props.create_user_error ? "hidden" : ""}>
            {this.props.create_user_error}
          </p>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateUser;
