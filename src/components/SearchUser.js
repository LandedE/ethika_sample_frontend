import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class SearchUser extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className={"search_for_users " + this.props.className}>
        <div className="search_for_users_container">
          <form onSubmit={this.props.searchForUsers}  className="form-inline my-2 my-lg-0 search_for_users_form">
            <input onChange={this.props.onInputChange} data-input-ref="user_input_search"
              className="form-control mr-sm-2" type="search" placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
        <BootstrapTable data={this.props.user_search_results} striped hover pagination>
            <TableHeaderColumn isKey dataField='email'>Email Address</TableHeaderColumn>
            <TableHeaderColumn dataField='last_name'>Last Name</TableHeaderColumn>
            <TableHeaderColumn dataField='first_name'>First Name</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default SearchUser;
