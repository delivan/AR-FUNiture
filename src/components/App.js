import React, {Component} from 'react';
import Home from './Home';
import Ar from './Ar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  container: {
    overflowY: 'scroll',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    fontFamily: "'Roboto', sans-serif"
  }
};

const categories = ['desk', 'chair', 'bed', 'closet'];

class App extends Component {
  state = {
    category: null,
  };

  handleSelectCategory = (category) => {
    this.setState({category});
    console.log(category);
  }

  render() {
    const {category} = this.state;
    const {handleSelectCategory} = this;

    return (<MuiThemeProvider>
      <div style={styles.container}>
        {!category && <Home categories={categories} onSelectCategory={this.handleSelectCategory}/>}
        {category && <Ar category={category}/>}
      </div>
    </MuiThemeProvider>);
  }
}

export default App;
