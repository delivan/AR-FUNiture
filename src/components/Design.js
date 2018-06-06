import React, { Component } from 'react';
import '../css/Design.css';
import { Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import PropTypes from 'prop-types';
import ButtonBase from "material-ui/ButtonBase";

class Design extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <DesignCard
            title={'modern'}
            content={'현대적인 스타일을 원하신다면'}
            img={'https://i.pinimg.com/originals/b4/dc/03/b4dc03af97cff39564c67d7ffeff24e1.jpg'}
            __setRoute={this.props.__setRoute}
            currentRoute={this.props.currentRoute}
            currentUser={this.props.currentUser}
            __setCategory={this.props.__setCategory}
          />
        </div>
        <div className="col">
          <DesignCard
            title={'wooden'}
            content={'앤티크한 스타일을 원하신다면'}
            img={'http://info.pipa.co.kr/files/attach/images/176/158/012/99c06980f1118765ce1dc90038a68212.png'}
            __setRoute={this.props.__setRoute}
            currentRoute={this.props.currentRoute}
            currentUser={this.props.currentUser}
            __setCategory={this.props.__setCategory}
          />
        </div>
        <div className="w-100"></div>

      </div>
    )
  }
}

class DesignCard extends Component {
  __checklogin = () => {
    if (this.props.currentUser) {
      this.props.__setRoute('ar');
      this.props.__setCategory(this.props.title);
    } else {
       alert('로그인 해주세요');
    }
  }

  render() {
    return (
      // <div className="Design">
      //   {/* 디자인 이미지 */}
      //   <div className="Design__Colums">
      //     <DesignImage />
      //   </div>
      // </div>
      <Card narrow>
        <ButtonBase onClick={this.__checklogin}>
          <CardImage  className="img-fluid" src={this.props.img} />
        </ButtonBase>
        <CardBody>
          <CardTitle onClick={() => this.__checklogin}>{this.props.title}</CardTitle>
          <CardText>{this.props.content}</CardText>
          {/* <Button onClick={this.__checklogin}>Button</Button> */}
        </CardBody>
      </Card>
    )
  }
}

DesignCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  img: PropTypes.string,
  currentRoute: PropTypes.string,
  __setRoute: PropTypes.func,
  __setCategory: PropTypes.func,
}

Design.propTypes = {
  currentRoute: PropTypes.string,
  __setRoute: PropTypes.func,
  currentUser: PropTypes.object,
  __setCategory: PropTypes.func,
}

export default Design;
