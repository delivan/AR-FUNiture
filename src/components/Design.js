import React, { Component } from 'react';
// import Sample from '../img/designSample.jpg';
import '../css/Design.css';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import PropTypes from 'prop-types';

class Design extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <DesignCard 
            title={'Modern'}
            content={'깔끔하고 멋진 스타일을 원하신다면'}
            img={'https://i.pinimg.com/originals/b4/dc/03/b4dc03af97cff39564c67d7ffeff24e1.jpg'}
          />
        </div>
        <div className="col">
          <DesignCard
            title={'Colorfull'}
            content={'세련되고 멋진 컬러감'}
            img={'http://info.pipa.co.kr/files/attach/images/176/158/012/99c06980f1118765ce1dc90038a68212.png'}
          />
        </div>
        <div className="w-100"></div>
        
      </div>
    )
  }
}

class DesignCard extends Component {
  render() {
    return (
      // <div className="Design">
      //   {/* 디자인 이미지 */}
      //   <div className="Design__Colums">
      //     <DesignImage />
      //   </div>
      // </div>
      <Card narrow>
        <CardImage className="img-fluid" src={this.props.img} />
        <CardBody>
          <CardTitle>{this.props.title}</CardTitle>
          <CardText>{this.props.content}</CardText>
          <Button href="#">Button</Button>
        </CardBody>
      </Card>
    )
  }
}

DesignCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  img: PropTypes.string
}

export default Design;