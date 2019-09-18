// ___________________________________________________________________________________________ AULA 2

import React from 'react';
import './App.css';

const Add = props => <h1>{props.a + props.b}</h1>

const Layout = props => (
  <React.Fragment>
      <header>
      </header>
      <main>
        {props.children}
      </main>
      <footer>My Footer</footer>
  </React.Fragment>
);

function App() {
  return (
    <div>
    <Layout>
      <p>Page1</p>
      <Add a={2} b={3}></Add>
    </Layout>
    <br/>
    <br/>
    <Layout>
      <p>Page2</p>
      <Add a={3} b={3}></Add>
    </Layout>
    </div>
    
    
  );
}

export default App;

// ___________________________________________________________________________________________ AULA 2

<button onClick={() => console.log("click")} >Tell me a Joke</button>

// ____________________________________________________

import React from 'react';
import './App.css';

function App() {
  const onTellJoke = () => {
    console.log("click")
    fetch('https://icanhazdadjoke.com/', {
      method:'GET',
      headers: {
        Accept: 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => console.log(json))
  }

  return (
    <div>
      <button onClick={onTellJoke} >Tell me a Joke</button>
    </div>
  );
}

export default App;

// ----------------------------------------------------------------------------------------------------------------------- 
// SHOW JOKE WHEN CLICKED ON BUTTON  
import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      joke: null
    }
    this.onTellJoke = this.onTellJoke.bind(this);
  }

  onTellJoke() {
    console.log("click")

    fetch('https://icanhazdadjoke.com/', {
      method:'GET',
      headers: {
        Accept: 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        joke: json.joke
      });
    })
  }

  render() {
    return(
      <div>
        <button onClick={this.onTellJoke} >Tell me a Joke</button>
        <p>{this.state.joke}</p>
      </div>
    )
  };

}

export default App;

// -----------------------------------------------------------------------------------------------------------------------
// LIFECYCLE - load in the start 
// Improvement low connection

import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      joke: null,
      isFetchingJoke: false
    }
    this.onTellJoke = this.onTellJoke.bind(this);
  }

  fetchJoke(){
    this.setState({
      isFetchingJoke:true
    });
    console.log("Load Joke")
    fetch('https://icanhazdadjoke.com/', {
      method:'GET',
      headers: {
        Accept: 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        joke: json.joke,
        isFetchingJoke: false
      });
    })
  }

  componentDidMount(){
    this.fetchJoke();
  }

  onTellJoke() {
    this.fetchJoke();
  }

  render() {
    return(
      <div>
        <button onClick={this.onTellJoke} disabled={this.state.isFetchingJoke} > Tell me a Joke</button>
        <p>{this.state.isFetchingJoke ? 'Loading Joke ...' : this.state.joke}</p>
        {/* <p> isFetchingJoke: {this.state.isFetchingJoke.toString()}</p> */}
      </div>
    )
  };

}

export default App;

// ----------------------------------------------------------------------------------------------------------------
// Search jokes endpoint and store results
import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      jokes: [], 
      isFetchingJoke: false
    }
    this.onTellJoke = this.onTellJoke.bind(this);
  }

  searchJokes(){
    this.setState({
      isFetchingJoke:true
    });

    console.log("Load Joke");
    fetch('https://icanhazdadjoke.com/search', {
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
      console.log("Jokes: ", jokes)
    })
  }

  componentDidMount(){
    this.searchJokes();
  }

  onTellJoke() {
    this.searchJokes();
  }

  render() {
    return(
      <div>
        <form>
          <input type="text" placeholder="Enter a search term..."></input>
          <button>search</button>

          <button onClick={this.onTellJoke} disabled={this.state.isFetchingJoke}> Tell me a Joke</button>
        </form>
        
        <p>{this.state.isFetchingJoke ? 'Loading Joke ...' : this.state.jokes.toString()}</p>
        {/* <p> isFetchingJoke: {this.state.isFetchingJoke.toString()}</p> */}
      </div>
    )
  };

}

export default App;
// -------------------------------------------------------------------------------------------------------------------------------------
// Save search input in app state
import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      searchTerm: '',
      jokes: [], 
      isFetchingJoke: false
    }

    this.onTellJoke = this.onTellJoke.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  searchJokes(){
    this.setState({
      isFetchingJoke:true
    });

    console.log("Load Joke");
    fetch('https://icanhazdadjoke.com/search', {
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
      console.log("Jokes: ", jokes)
    })
  }

  componentDidMount(){
    this.searchJokes();
  }

  onTellJoke() {
    this.searchJokes();
  }

  onSearchChange(event){
    this.setState({
      searchTerm:event.target.value
    })
  }

  render() {
    return(
      <div>
        <form>
          <input type="text" 
              placeholder="Enter a search term..." 
              onChange={this.onSearchChange}
              >
          </input>
          <button>search</button>

          <button onClick={this.onTellJoke} disabled={this.state.isFetchingJoke}> Tell me a Joke</button>
        </form>
        
        <p>{this.state.isFetchingJoke ? 'Loading Joke ...' : this.state.jokes.toString()}</p>
        {/* <p> isFetchingJoke: {this.state.isFetchingJoke.toString()}</p> */}
        {/* <p>searchTerm: {this.state.searchTerm}</p> */}
      </div>
    )
  };

}

export default App;
// -----------------------------------------------------------------------------------------------------------------
// trigger search on form submission
import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      searchTerm: '',
      jokes: [], 
      isFetchingJoke: false
    }

    this.onTellJoke = this.onTellJoke.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  searchJokes(){
    this.setState({
      isFetchingJoke:true
    });

    console.log("Load Joke");
    fetch(`https://icanhazdadjoke.com/search?term=${this.state.searchTerm}`, {
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
      console.log("Jokes: ", jokes)
    })
  }

  componentDidMount(){
    // this.searchJokes();
  }

  onTellJoke() {
    this.searchJokes();
  }

  onSearchChange(event){
    this.setState({
      searchTerm:event.target.value
    })
  }

  onSearchSubmit(event){
    event.preventDefault(); //Prevent reload
    console.log("Submit");
    this.searchJokes();
  }

  render() {
    return(
      <div>
        <form onSubmit={this.onSearchSubmit}>
          <input type="text" 
              placeholder="Enter a search term..." 
              onChange={this.onSearchChange}
              >
          </input>
          <button>search</button>

          <button onClick={this.onTellJoke} disabled={this.state.isFetchingJoke}> Tell me a Joke</button>
        </form>
        
        <p>{this.state.isFetchingJoke ? 'Loading Joke ...' : this.state.jokes.toString()}</p>
        {/* <p> isFetchingJoke: {this.state.isFetchingJoke.toString()}</p> */}
        {/* <p>searchTerm: {this.state.searchTerm}</p> */}
      </div>
    )
  };

}

export default App;
// -----------------------------------------------------------------------------------------------------
// render the search results
import React from 'react';
import './App.css';
import { isTemplateElement } from '@babel/types';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      searchTerm: '',
      jokes: [], 
      isFetchingJoke: false
    }

    this.onTellJoke = this.onTellJoke.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  searchJokes(){
    this.setState({
      isFetchingJoke:true
    });

    console.log("Load Joke");
    fetch(`https://icanhazdadjoke.com/search?term=${this.state.searchTerm}`, {
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
      console.log("Jokes: ", jokes)
    })
  }

  // componentDidMount(){
  //   this.searchJokes();
  // }

  onTellJoke() {
    this.searchJokes();
  }

  onSearchChange(event){
    this.setState({
      searchTerm:event.target.value
    })
  }

  onSearchSubmit(event){
    event.preventDefault(); //Prevent reload
    console.log("Submit");
    this.searchJokes();
  }

  renderJokes(){
    return(
    <ul>
      {this.state.jokes.map(item => <li key={item.id}>{item.joke}</li>)}
    </ul>
    );
  }

  render() {
    return(
      <div>
        <form onSubmit={this.onSearchSubmit}>
          <input type="text" 
              placeholder="Enter a search term..." 
              onChange={this.onSearchChange}
              >
          </input>
          <button>search</button>

          <button onClick={this.onTellJoke} disabled={this.state.isFetchingJoke}> Tell me a Joke</button>
        </form>
      
        {this.state.isFetchingJoke ? 'Searching  Joke ...' : this.renderJokes()}
        

        {/* <p> isFetchingJoke: {this.state.isFetchingJoke.toString()}</p> */}
        {/* <p>searchTerm: {this.state.searchTerm}</p> */}
      </div>
    )
  };

}

export default App;
// --------------------------------------------------------------------------------------------------------------------
// Im feeling funny button
import React from 'react';
import './App.css';
import { isTemplateElement } from '@babel/types';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      searchTerm: '',
      jokes: [], 
      isFetchingJoke: false
    }

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  searchJokes(limit = 20){
    this.setState({
      isFetchingJoke:true
    });

    console.log("Load Joke");
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
      console.log("Jokes: ", jokes)
    })
  }

  // componentDidMount(){
  //   this.searchJokes();
  // }

  onSearchChange(event){
    this.setState({
      searchTerm:event.target.value
    })
  }

  onSearchSubmit(event){
    event.preventDefault(); //Prevent reload
    console.log("Submit");
    this.searchJokes();
  }

  renderJokes(){
    return(
    <ul>
      {this.state.jokes.map(item => <li key={item.id}>{item.joke}</li>)}
    </ul>
    );
  }

  render() {
    return(
      <div>
        <form onSubmit={this.onSearchSubmit}>
          <input type="text" 
              placeholder="Enter a search term..." 
              onChange={this.onSearchChange}
              >
          </input>
          <button>Search</button>

          <button onClick={() => this.searchJokes(1)} disabled={this.state.isFetchingJoke}>I'm Feeling Funny</button>
        </form>
      
        {this.state.isFetchingJoke ? 'Searching  Joke ...' : this.renderJokes()}
        

        {/* <p> isFetchingJoke: {this.state.isFetchingJoke.toString()}</p> */}
        {/* <p>searchTerm: {this.state.searchTerm}</p> */}
      </div>
    )
  };

}

export default App;
// -------------------------------------------------------------------------------
// create search form component