import React, { Component } from "react";
import { getuserData } from './APIUtils';
import constant from './Constant'

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.handleGet = this.handleGet.bind(this);
  }
  handleGet(response) {
    this.setState(this.stateUpdater(response));
  }
  stateUpdater(response) {
    return { data: response.data };
  }
  async componentDidMount() {
    const params = {
      name: "Kurtis Weissnat",
      username: "Elwyn.Skiles"
    }
    /** get user data */
    await getuserData(constant.req1UrlParams, params)
      .then(response => {
       // console.log(response)
        this.handleGet(response);
      })
      .catch(errorMessage => {
        alert(errorMessage)
        console.log(errorMessage)
      });
  }
  render() {
    return (
      <ul>
        {this.state.data.map(user => (
          <li key={user.name}>{user.name}</li>
        ))}
      </ul>
    );
  }
}