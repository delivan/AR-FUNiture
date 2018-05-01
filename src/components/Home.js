import React from 'react';
import hiro from '../img/hiro.png';
import Button from 'material-ui/Button';

const styles = {
  container: {
    overflowY: 'scroll',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPositionX: '50%',
    paddingTop: 100,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: '1.2rem',
  },

  list: {
    paddingRight: 40,
  },

  listItem: {
    paddingBottom: 15,
  },

  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },

  a: {
    textDecoration: 'underline'
  },

  hiroMarker: {
  },

  btnFileInput: {
    marginTop: 15,
    marginBottom: 15
  },

  hiroMarkerImg: {
    marginTop: '1rem',
    height: '5rem',
    width: '5rem',
    border: '5px solid white'
  },

  fileInput: {
    display: 'none'
  },

  hr: {
    border: 0,
    borderTop: '1px solid black',
    marginBottom: '1rem',
    marginTop: '1rem'
  }
}

const Category = ({category, onClick}) => {
  return (<Button onClick={onClick} variant="raised" color="secondary">{category}</Button>)
}

const Home = ({categories, onSelectCategory}) => {
  const categoryList = categories.map((category) => (<Category category={category} onClick={() => onSelectCategory(category)} key={category}/>));
  return (<div style={styles.container}>
    <h1 style={styles.title}>원하는 가구를 만들어보세요!</h1>
    <hr style={styles.hr}/>
    <ol style={styles.list}>
      <li style={styles.listItem}>
        <div>
          <a style={styles.a} href={hiro}>hiro 마커</a>를 프린트하세요
        </div>
        <div style={styles.hiroMarker}>
          <a style={styles.a} href={hiro}>
            <img style={styles.hiroMarkerImg} alt="Hiro marker example" src={hiro}/>
          </a>
        </div>
      </li>
      <li style={styles.listItem}>
        프린트한 종이를 원하는 곳에 놔두세요
      </li>
      <li style={styles.listItem}>
        원하는 카테고리를 선택하세요.
      </li>
    </ol>
    <div className="categories">
      {categoryList}
    </div>
  </div>)
}

export default Home;
