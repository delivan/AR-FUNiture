import React, {Component} from 'react';
import {AFrameRenderer, Marker} from 'react-web-ar';
import Button from 'material-ui/Button';

const styles = {
  backButton: {
    position: 'fixed',
    left: '1rem',
    top: '1rem'
  },
  scaleInput: {
    position: 'fixed',
    display: 'table',
    right: '1rem',
    top: '1rem'
  },
  tips: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 300,
    position: 'fixed',
    bottom: '5rem',
    left: '1rem',
    right: '1rem',
    padding: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  }
};

class Ar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: 0.01,
      y: 0.01,
      z: 0.01
    };

    this.handleScale = this.handleScale.bind(this);
  }

  componentDidMount() {
    const {category} = this.props;
    const id = document.getElementById(category);
    id.setAttribute('scale', {
      x: this.state.x,
      y: this.state.y,
      z: this.state.z
    });
  }

  handleBack() {
    window.location.reload();
  }

  handleScale = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    // 페이지 리로딩 방지
    e.preventDefault();

    const {category} = this.props;
    const id = document.getElementById(category);
    id.setAttribute('scale', {
      x: this.state.x,
      y: this.state.y,
      z: this.state.z
    });
  }

  render() {
    const {category} = this.props;
    return (<div style={styles.renderer}>
      <AFrameRenderer>
        <Marker parameters={{
            preset: 'hiro'
          }}>
          {category === 'desk' && <a-gltf-model src={process.env.PUBLIC_URL + '/models/desk1/scene.gltf'} id={category}></a-gltf-model>}
          {category === 'chair' && <a-gltf-model src={process.env.PUBLIC_URL + '/models/chair1/scene.gltf'} id={category}></a-gltf-model>}
          {category === 'bed' && <a-gltf-model src={process.env.PUBLIC_URL + '/models/bed1/scene.gltf'} id={category}></a-gltf-model>}
          {category === 'closet' && <a-gltf-model src={process.env.PUBLIC_URL + '/models/closet1/scene.gltf'} id={category}></a-gltf-model>}
        </Marker>
        <div style={styles.backButton}>
          <Button onClick={this.handleBack} variant="raised" color="secondary">뒤로가기</Button>
        </div>
        <form style={styles.scaleInput} onSubmit={this.handleSubmit}>
          <p>가로 세로 높이를 입력해주세요.</p>
          <div>
            <label for="fname">가로:</label>
            <input onChange={this.handleScale} value={this.state.x} placeholder="x" name="x"/>
          </div>
          <div>
            <label for="lname">세로:</label>
            <input onChange={this.handleScale} value={this.state.z} placeholder="z" name="z"/>
          </div>
          <div>
            <label for="age">높이:</label>
            <input onChange={this.handleScale} value={this.state.y} placeholder="y" name="y"/>
          </div>
          <div>
            <button type="submit">적용</button>
          </div>
        </form>
      </AFrameRenderer>
    </div>);
  }
}

export default Ar;
