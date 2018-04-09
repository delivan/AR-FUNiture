import React, { Component } from 'react';
import Sample from '../img/designSample.jpg';
import '../css/Design.css';


class Design extends Component {
  render() {
    return (
      <div>
        < DesignCard />
        < DesignCard />
        < DesignCard />
        < DesignCard />
      </div>
    )
  }
}

class DesignCard extends Component {
  render() {
    return (
      <div className="Design">
        {/* 디자인 이미지 */}
        <div className="Design__Colums">
          <DesignImage />
        </div>
        {/* 디자인 소개 */}
        <div className="Design__Colums">
          <h1>Design sample</h1>
          <p className="Design__Synopsis">
            asdgasdasfsdf
              asdfasdf
              asdfasdfasdf
              asdfasdf
          </p>
        </div>
      </div>
    )
  }
}

class DesignImage extends Component {

  render() {
    return (
      // <img src={design} />
      // <img src={asset} alt="designSample.jpg" />
      <img src={Sample} className="Design-image" alt="sample" className="Design__Image"/>
    );
  }
}

export default Design;