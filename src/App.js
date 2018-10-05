import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super();
    this.state = {
      users: [],
      name : '',
      age : '',
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    fetch('/users')
    .then(res => res.json())
    .then(users => this.setState({ users }));
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  handleClick = () => {
    const { name, age } = this.state;
    
    fetch('/users', {
      method: 'POST',
      body: JSON.stringify({
        name,
        age,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(res => this.getUser());

    document.getElementById('name').value = "";
    document.getElementById('age').value = "";
  }

  handledelete = (e) => {
    e.preventDefault();
    const { id } = e.target;
    fetch('/users/'+id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(res => this.getUser());
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        <p>
        이름 : <input id="name" name="name" onChange={this.handleChange}></input><br/>
        나이 : <input id="age" name="age" onChange={this.handleChange}></input><br />
        <button onClick={this.handleClick}>등록</button>
        </p>
        {this.state.users.map(user =>
          <div key={user._id}>
          {user.name} {user.age}
          <button id={user._id} onClick={this.handledelete}>삭제</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;