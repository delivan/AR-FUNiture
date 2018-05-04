import React, {Component} from 'react';
import Home from './Home';
import Ar from './Ar';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const styles = {
  container: {
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
  constructor(props) {
    super(props);

    this.state = {
      category: null,
    };
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
  }

  handleSelectCategory = (category) => {
    this.setState({category});
  }

  render() {
    const {category} = this.state;

    return (<MuiThemeProvider theme={theme}>
      <div style={styles.container}>
        {!category && <Home categories={categories} onSelectCategory={this.handleSelectCategory}/>}
        {category && <Ar category={category}/>}
      </div>
    </MuiThemeProvider>);
  }
}

export default App;
