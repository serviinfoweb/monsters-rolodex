import './App.css';
import { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import { TitleApp } from './components/title-app/title-app.component';
import { LabelScore } from './components/label-score/label-score.component';
//import { render } from '@testing-library/react';


class App extends Component {

  constructor(){
    super();

    this.state = {
      monsters :[],
      searchField :'',
      score : 0
    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({monsters:users}));

    
  }

  handleChange = e => {
    this.setState({ searchField: e.target.value});
  }

  handlePoint =() =>{
    this.setState({ score : this.state.score + 1});
  }

  render(){
    const { monsters,searchField } = this.state;
    const filterMonsters = monsters.filter( monster => monster.name.toLowerCase().includes(searchField.toLocaleLowerCase()));
    return (
        <div className="App">
          <TitleApp />
          <LabelScore score={this.state.score}/>
            
          
          <SearchBox 
            placeholder='Search Monster'
            handleChange ={this.handleChange}
          />
          
          <CardList monsters={filterMonsters} handlePoint ={this.handlePoint}/>
        </div>
    );
  }
}

export default App;
