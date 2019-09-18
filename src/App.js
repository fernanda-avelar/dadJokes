import React from 'react';
import './App.css';
import SearchForm from './SearchForm'
// import { isTemplateElement } from '@babel/types';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      searchTerm: '',
      jokes: [], 
      isFetchingJoke: false
    }

    this.onSearchChange = this.onSearchChange.bind(this);
    this.searchJokes = this.searchJokes.bind(this);
  }

  searchJokes(limit = 20){
    this.setState({
      isFetchingJoke:true
    });

    fetch(`https://icanhazdadjoke.com/search?term=${this.state.searchTerm}&limit=${limit}`, {
      method:'GET',
      headers: {
        Accept: 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      const jokes = json.results;
      this.setState({
        jokes,
        isFetchingJoke: false
      });
    })
  }

  // componentDidMount(){
  //   this.searchJokes();
  // }

  onSearchChange(value){
    this.setState({
      searchTerm:value
    })
  }

  renderJokes(){
    return(
    <ul className="jokes-list">
      {this.state.jokes.map(item => <li key={item.id}>{item.joke}</li>)}
    </ul>
    );
  }

  render() {
    return(
      <div className="App">

        <img className="logo" src='./google-dad-jokes-logo.png' alt="img" />
        {/* IMAGEM TEM Q ESTAR NO PUBLIC */}

        <SearchForm
          onFormSubmit = {this.searchJokes}
          onSearchValueChange = {this.onSearchChange}
          isSearching = {this.isFetchingJoke}
          onSingleSearchClick = {() => this.searchJokes(1)}
        />
        
      
        {this.state.isFetchingJoke ? 'Searching  Joke ...' : this.renderJokes()}
        

        {/* <p> isFetchingJoke: {this.state.isFetchingJoke.toString()}</p> */}
        {/* <p>searchTerm: {this.state.searchTerm}</p> */}
      </div>
    )
  };

}

export default App;
