import React, {Component} from 'react';
import Design from './Design';
import Home from './Home';
import Ar from './Ar';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

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
const theme = createMuiTheme();

class App extends Component {
  state = {
    category: null,
  };

  handleSelectCategory = (category) => {
    this.setState({category});
  }

  render() {
    const {category} = this.state;
    const {handleSelectCategory} = this;

    return (<MuiThemeProvider theme={theme}>
      <div style={styles.container}>
        {!category && <Home categories={categories} onSelectCategory={this.handleSelectCategory}/>}
        {category && <Ar category={category}/>}
      </div>
    </MuiThemeProvider>);
  }
}

export default App;
