import React, { Component } from 'react';
// import Sample from '../img/designSample.jpg';
import '../css/Design.css';
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';


class Design extends Component {
  render() {
    return (
      <div className="row">
        <div className="col"><DesignCard/></div>
        <div className="col"><DesignCard/></div>
        <div className="w-100"></div>
        <div className="col"><DesignCard/></div>
        <div className="col"><DesignCard/></div>
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
        <CardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button href="#">Button</Button>
        </CardBody>
      </Card>
    )
  }
}

// class DesignImage extends Component {
//   render() {
//     return (
//       // <img src={design} />
//       // <img src={asset} alt="designSample.jpg" />
//       <img src={Sample} className="Design-image" alt="sample" className="Design__Image"/>
//     );
//   }
// }

export default Design;