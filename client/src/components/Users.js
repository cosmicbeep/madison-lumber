import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import headerBg from './moodyville-yard.jpg'
import PropTypes from 'prop-types';
import AlertMessages from './AlertMessages';
import api from '../utils/api';

const UsersBanner = (props) => (
  <div
    className="jumbotron text-center section-banner"
    style={{backgroundImage: `url(${props.imgSrc})`}}>
    <h1 className="heading-brand">
      {props.heading}
    </h1>
  </div>
)

const UsersTable = (props) => (
  <table className="table table-bordered table-hover table-striped">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Account Type</th>
        <th>Expiry</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {props.users.map(user => (
        <tr key={user.uuid}>
            <td>{user.firstName} {user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.accountType}</td>
            <td></td>
            <td>
              <Link to={`/users/${user.uuid}`} className="btn btn-sm btn-primary">Manage User</Link>
            </td>
        </tr>
      ))}
    </tbody>
  </table>
);

UsersTable.propTypes = {
  users: PropTypes.array.isRequired
}



class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: [],
      errors: [],
      users: []
    }
  }

  componentDidMount() {
    this.loadUsers()
  }
  componentWillReceiveProps(nextProps) {
    this.loadUsers()
  }

  loadUsers() {
    if (!this.props.token) {
      return
    }
    api.getUsers(this.props.token).then(res=> {
      const newState = {
        success: [],
        errors: [],
        users: []
      }

      if (res.success) {
        newState.success = res.success;
      }
      if (res.errors) {
        newState.errors = res.errors;
      }
      if (res.users) {
        newState.users = res.users;
      }

      this.setState(() => newState);
    })
  }

  render() {
    if (!this.props.isAuthenticated) {
      return (
        <div className="container">
          <AlertMessages
            success={[]}
            errors={[
              '401 - Unauthorized',
              'The request lacks valid authentication credentials for the target resource.',
              'Please log in and try again.']}
          />
        </div>
      )
    }

    if (!this.props.isAdmin) {
      return (
        <div className="container">
          <AlertMessages
            success={[]}
            errors={this.state.errors}
          />
        </div>
      )
    }

    return (
      <div className="container">
        { (this.state.success || this.state.errors) &&
          <AlertMessages
            success={this.state.success}
            errors={this.state.errors}
          />}

        <UsersBanner
          heading='Manage Users'
          imgSrc={headerBg} />

        <div className="breadcrumb">
          <Link to="/users/new" className="btn btn-lg btn-success"><i className="fa fa-user-plus" aria-hidden="true"></i> Add new user</Link>
        </div>

        { this.state.users.length > 0 &&
          <UsersTable
            users={this.state.users}
          />}
      </div>
    )
  }
}

Users.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}

export default Users;