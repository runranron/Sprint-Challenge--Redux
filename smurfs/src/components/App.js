import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { getSmurfs, addSmurf } from '../actions';
/*
 to wire this component up you're going to need a few things.
 I'll let you do this part on your own. 
 Just remember, `how do I connect my components to redux?`
 `How do I ensure that my component links the state to props?`
 */
class App extends Component {
  state = {
    name: '',
    age: '',
    height: ''
  }

  componentDidMount() {
    this.props.getSmurfs();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit() {
    this.props.addSmurf(this.state);
    this.setState({
      name: '',
      age: '',
      height:''
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Smurfs All Up In Here</h1>
        {this.props.smurfs.map(smurf => {
          return <div key={smurf.id}>{smurf.name}</div>
        })}
        <form onSubmit={() => this.handleSubmit()}>
          <input name="name" placeholder="Name" onChange={this.handleChange.bind(this)}/>
          <input name="age" placeholder="Age" onChange={this.handleChange.bind(this)}/>
          <input name="height" placeholder="Height" onChange={this.handleChange.bind(this)}/>
          <input type="submit"></input>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    smurfs: state.smurfs,
    isFetching: state.isFetching
  }
}


export default connect(mapStateToProps, { getSmurfs, addSmurf })(App);
