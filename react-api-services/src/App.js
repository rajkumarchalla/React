import React, { Component } from 'react';
import './App.css';
import { getuserData } from './APIUtils';
import constant from './Constant'

class App extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isLoading: false,
      contacts: [], //contacts array
      show: false, // sate flag,
      data: []
    };
    this.updateItem = this.updateItem.bind(this);
  }
  //Load data from API action 
  handleClick() {
    this.setState({ show: true }, () => {
    });
    this.setState({ isLoading: true }, () => {
      simulateNetworkRequest().then(() => {
        this.setState({ isLoading: false });
      });
    });
  }
  /** #MARK:- Component LifeCycle Method */
  componentDidMount() {
    /**
     * {*} params - parameters 
     */
    const params = {
      name: "Kurtis Weissnat",
      username: "Elwyn.Skiles"
    }
    /** get user data */
    getuserData(constant.req1UrlParams, params)
      .then(response => {
       // console.log(response)
        this.updateItem(response)
      })
      .catch(errorMessage => {
        alert(errorMessage)
        console.log(errorMessage)
      });

  }
  /** updateItem as a prop to the child Component.
   * 
   * @param {*} res - Resposne 
   */
  updateItem(res) {
    //console.log('Selected Value:: ', res);
    // create an array of contacts only with relevant data
    const newContacts = res.data.map(c => {
      return {
        id: c.id,
        name: c.name,
        email: c.email
      };
    });
    // create a new "State" object without mutating 
    // the original State object. 
    const newState = Object.assign({}, this.state, { contacts: newContacts });
    // store the new state object in the component's state
    this.setState(newState);
    this.setState({ isLoading: false });
    this.setState({ show: false });
  }
  /**
   * @React - Render 
   *  <h1> React API Layer View Sample </h1> 
   *         <div>
              <NumberDisplay number={2}> </NumberDisplay>
            </div>
   */
  render() {
    const { isLoading } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <div >
              <h1> Front-End-SDK TDD </h1>
            </div>
            <br />

            <br />
          </div>
        </div>
      </div>
    );
  }
}
/**
 * @function - simulateNetworkRequest
 */
//Sample delay using promise 
function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}
export default App;
