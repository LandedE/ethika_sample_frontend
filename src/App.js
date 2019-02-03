import React, { Component } from 'react';
import CreateUser from './components/CreateUser';
import SearchUser from './components/SearchUser';
import EmailValidator from 'email-validator';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(){
    super();

    //this is the single source of truth for the application
    //The next step to improve this would be to abstract this away with a state
    //management library like vuex or redux

    this.state = {
      user_input_first_name: "",
      user_input_last_name: "",
      user_input_email: "",
      user_input_search: "",
      application_page: "create_user",
      create_user_error: null,
      create_user_success_message: null,
      user_search_results: [{
        email: "sampleemail@gmail.com",
        last_name: "Baggins",
        first_name: "Frodo"
      }, {
        email: "other_email@gmail.com",
        last_name: "AS",
        first_name: "dfge"
      }]
    }

    //These lines below bind the current scope to these functions so that the main state
    //can still be accessed through various components
    this.setSearchForUsers = this.setSearchForUsers.bind(this);
    this.setCreateUsers = this.setCreateUsers.bind(this);
    this.submitUser = this.submitUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.searchForUsers = this.searchForUsers.bind(this);
    this.alertUserCreationError = this.alertUserCreationError.bind(this);
    this.alertUserCreationSuccess = this.alertUserCreationSuccess.bind(this);
  }

  //Takes the user input values and sends them to the backend to be inserted into MongoDB.
  //Handles a duplicate email event.
  //No need to sanitize user input here since Reactjs does this automatically but
  //the backend does sanitize the data before sending to MongoDB
  submitUser(e){
    e.preventDefault();
    this.setState({
      create_user_error: null
    })
    var is_email_valid = EmailValidator.validate(this.state.user_input_email);
    axios.post("http://54.201.151.137:3000/create_user",
      {
        user_email: this.state.user_input_email,
        user_first_name: this.state.user_input_first_name,
        user_last_name: this.state.user_input_last_name
      }
    ).then((res)=>{
      if(res.data.code === 11000){
        this.alertUserCreationError();
      }else{
        this.alertUserCreationSuccess();
      }
    });
  }

  //Triggers an alert that lets the user know that the email has already been registered
  alertUserCreationError(){
    this.setState({
      user_input_email: "",
      create_user_error: "Email already exists."
    })
  }

  //Alerts the user that the new user entry has been created.
  alertUserCreationSuccess(){
    this.setState({
      user_input_email: "",
      user_input_first_name: "",
      user_input_last_name: "",
      create_user_success_message: "User Successfully Created"
    }, ()=>{
      setTimeout(()=>{
        this.setState({create_user_success_message: null})
      }, 3000)
    })
  }

  //Tracks changes to various input elements and saves them to the state.
  onInputChange(e){
    let input_ref = e.target.getAttribute("data-input-ref");
    let value = e.target.value;
    let state_object = {};
    state_object[input_ref] = value;
    this.setState(state_object);
  }

  //Is triggered on the "Search For Users" navbar click. Shows the search for users table.
  setSearchForUsers(){
    this.setState({
      application_page: "search_for_users"
    })
  }

  //Is triggered on the "Create Users" navbar click. Shows the form to create users.
  setCreateUsers(){
    this.setState({
      application_page: "create_user"
    })
  }

  //Sends up user input search term to the backend in order to query the database.
  searchForUsers(e){
    // e.preventDefault();
    axios.get(`http://54.201.151.137:3000/search_for_users?search_term=${this.state.user_input_search}`).then((result)=>{
      this.setState({
        user_search_results: result.data.items
      })
    })
  }

  //On main component mounting, gets a default list of users to populate the table with.
  componentDidMount(){
    this.searchForUsers();
  }

  render() {
    return (
      <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className={(this.state.application_page === "create_user" ? "active" : "") + " nav-item"} onClick={this.setCreateUsers}>
              <a className="nav-link" href="#">Create Users </a>
            </li>
            <li className={(this.state.application_page === "search_for_users" ? "active" : "") + " nav-item"} onClick={this.setSearchForUsers}>
              <a className="nav-link" href="#">Search For Users</a>
            </li>
          </ul>
        </div>
        </nav>

        <CreateUser
          className={this.state.application_page !== "create_user" ? "hidden" : ""}
          submitUser = {this.submitUser}
          onInputChange = {this.onInputChange}
          user_input_first_name = { this.state.user_input_first_name }
          user_input_last_name = { this.state.user_input_last_name }
          user_input_email = { this.state.user_input_email }
          create_user_success_message = { this.state.create_user_success_message }
          create_user_error = { this.state.create_user_error }
        />
        <SearchUser
          className={this.state.application_page !== "search_for_users" ? "hidden" : ""}
          onInputChange = {this.onInputChange}
          searchForUsers = {this.searchForUsers}
          user_search_results = {this.state.user_search_results}
        />
      </div>
    );
  }
}

export default App;
