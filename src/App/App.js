import React, { Component } from 'react';
import './App.css';
import request from '../Utils/fetchUtil';
import showMessage from "../Utils/showMessage";

import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Row from '../components/row/row';
import Container from '../components/container/container'; 
import Button from '../components/button/button';
import RadioGroup from '../components/radio/radio';
import showModal from '../components/modal/modal'; 
import Card from '../components/card/card'; 
import CardList from '../components/cardlist/cardlist';

import Modal from 'antd-mobile/lib/modal';
import 'antd-mobile/lib/modal/style/css';
import List from 'antd-mobile/lib/list';
import 'antd-mobile/lib/list/style/css';
import AButton from 'antd-mobile/lib/button';
import 'antd-mobile/lib/button/style/css';

import message from 'antd/lib/message';
import 'antd/lib/message/style/css';
import Toast from '../components/third-party/toast';
import '../components/third-party/toast/style/css';
import _ from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedRadio: 1,
      modal2: false,
      results: {}
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
		if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
		return true
		} else {
		return false
		}
	}

  componentDidMount() {

  }

  fetchGET() {
    // let url = "https://swapi.co/api/planets/1/";
    let url = "http://jsonplaceholder.typicode.com/posts/1/comments";
    
    let self = this;

    /**
     * options格式
     * method: POST|GET|PUT|DELETE|PATCH...
     * body: 用于POST|PUT等方法，不需要调用JSON.stringify()
     */
    let optionsGET = {
      // mode: "CORS"
    };

    request(url, optionsGET, "json", "订单获取失败，请重试", "").then((resjson) => {
      self.setState({
        results: resjson
      });
    });
  }

  fetchPOST() {
    let url = "http://jsonplaceholder.typicode.com/posts/1/commentss";
    
    let self = this;

    let cartInfoToUpload = {
      title: 'foo',
      body: 'bar',
      userId: 1
    };

    /**
     * options格式:
     * method: POST|GET|PUT|DELETE|PATCH...
     * body: 用于POST|PUT等方法，不需要调用JSON.stringify()
     */
    let optionsPOST = {
      method: 'POST',
      body: cartInfoToUpload
    };

    request(url, optionsPOST, "json", "订单提交失败，请重试", "订单提交成功！").then((resjson) => {
      self.setState({
        results: resjson
      });
    });
    
  }

  fetchDELETE() {
    let urlDelete = "https://jsonplaceholder.typicode.com/posts/1"; //该URL有误，期望提示404
    
    let self = this;

    /**
     * options格式
     * method: POST|GET|PUT|DELETE|PATCH...
     * body: 用于POST|PUT等方法，不需要调用JSON.stringify()
     */
    let optionsDELETE = {
      method: 'DELETE',
    };
    request(urlDelete, optionsDELETE, "json", "购物车清空失败", "购物车清空成功");
  }

  render() {
    console.log(this.state.results);
    // console.log(this.props.history);

    // let status = navigator.onLine ? "ONLINE" : "OFFLINE";
    // console.log(status); 
    let headerImageSrc = "../images/arrowback-large.png";
    return (
      <div className="transition-item list-page">
        <Header name="组件" 
          headerImageSrc={headerImageSrc}
          onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
        </Header>

        <div className="content">
          <Container padding={[8, 8, 8, 8]}>

            <div className="button">
              <Row>
                <Button style="inspur" size="lg" text={"GET"} col={12} onClick={ this.fetchGET.bind(this)}/>
                <Button style="primary" size="lg" text={"POST"} col={6} onClick={ this.fetchPOST.bind(this)}/>
                <Button style="default" size="lg" text={"DELETE"} col={6} onClick={this.fetchDELETE.bind(this)}/>
                <Button style="success" size="" text={"List"} col={4} onClick={ this.goToNextPage.bind(this) }/>
                <Button style="warning" size="" text={"Message"} col={4} onClick={this.showMessage.bind(this,"warning", "这是一条消息提示")}/>
                <Button style="danger" size="" text={"showMessage"} col={4} onClick={() => {showMessage("fail", "失败了!!!", 5)}}/>
                <Button style="primary" size="sm" text="col=3" col={3} onClick={this.showMessage.bind(this,"warning", "这是一条消息提示")}/>
                <Button style="primary" size="sm" text="col=3" col={3} onClick={this.showMessage.bind(this,"warning", "这是一条消息提示")}/>
                <Button style="primary" size="sm" text="col=3" col={3} onClick={this.showMessage.bind(this,"warning", "这是一条消息提示")}/>
                <Button style="primary" size="sm" text="col=3" col={3} onClick={this.showMessage.bind(this,"warning", "这是一条消息提示")}/>
              </Row>
            </div>
            
            <RadioGroup name="payment" mode="horizontal"
              size="lg"
              option={['签单', '工卡', '微信']} 
              val={[0, 1, 2]} 
              id={['op1', 'op2', 'op3']}
              selected={this.state.selectedRadio}
              onChange={this.radioChange.bind(this)}>
            </RadioGroup>
            <br/>
            <div>
              <Button style="primary" size="lg" text={"success"} col={12} onClick={this.successToast.bind(this, "加载成功")}/>
              <Button style="primary" size="lg" text={"fail"} col={12} onClick={this.failToast}/>
              <Button style="primary" size="lg" text={"network failure"} col={12} onClick={this.offlineToast}/>
            </div>

            <Modal
              popup={true}
              visible={this.state.modal2}
              maskClosable={true}
              transparent={true}
              onClose={this.onClose('modal2')}
              animationType="slide-up">
              <Card
                avatarURL={"../images/avatar.png"}
                avatarSize={40}
                avatarPosition={'start'}
                title={"购物车"}
              >
                <p>
                  每到年终岁尾的新年晚宴，中国人总得有点讲究的内容，比如说一定要有鱼，
                  就是要年年有余。今天给大伙儿准备的就是一道不光有余，
                  还天长地久的私房菜，蒜烧海鳗鱼。
                </p>
                <img src={require("../images/timg.jpg")} alt="" style={{'width': '200px'}}/>
                <List renderHeader={() => <div>订餐信息</div>} className="popup-list">
                  {['订餐桌数', '就餐时间', '结算方式'].map((i, index) => (
                    <List.Item key={index}>{i}</List.Item>
                  ))}
                  <List.Item>
                    <AButton type="primary" onClick={this.onClose('modal2')}>下单</AButton>
                  </List.Item>
                </List>
              </Card>
            </Modal>            
          </Container>
        </div>

        <Footer
          style={[{'color': '#318ccf', 'backgroundColor': '#ffffff'}, 
                  {'color': 'white', 'backgroundColor': '#318ccf'},
                  {'color': '#318ccf', 'backgroundColor': '#ffffff'}]}
          buttonName={["常规", "输入", "滑出"]}
          callBackFooterButtonClick={[
            this.callBackFooter0, 
            this.callBackFooter1,
            this.callBackFooter2.bind(this, "modal2")
            ]}>
        </Footer>
      </div>
    );
  }

  showMessage(type, text, duration = 2) {
    message.config({
        top: 70
    });
    if(type === "success") {
      message.success(text, duration);
    } else if(type === "fail") {
      message.error(text, duration);
    } else if(type === "info") {
      message.info(text, duration);
    } else if(type === "warning") {
      message.warning(text, duration);
    } 
    // console.log("test");
    //  return (<Message text={text} duration={2}/>);
  }

  successToast(message) {
    Toast.success(message, 1);
  }

  failToast() {
    Toast.fail("加载失败，请重试", 1);
  }

  offlineToast() {
    Toast.offline("网络异常，请重试", 2);
  }

  radioChange(selected) {
    this.setState({
      selectedRadio: selected
    });
  }

  onTextChange(event) {
    let value = event.target.value;
    this.setState({text: value});
  }

  onLeftArrowClick() {
    console.log("Quit button is clicked...");
  }

  //#region //footer callback function
  callBackFooter0() {
    console.log("Footer 0 is clicked...");
    Modal.alert('删除订单', '确定删除？', [
      { text: '取消', 
        onPress: () => console.log('cancel') 
      },
      {
        text: '删除',
        onPress: () => console.log('OK')
      },
      {
        text: '确定',
        onPress: () => console.log('Confirm')
      }
    ]);
  }

  callBackFooter1() {
    console.log("Footer 1 is clicked...");
    Modal.prompt('就餐时间', '请输入就餐时间', [
      { text: 'Cancel' },
      { text: 'Submit', onPress: value => console.log(`就餐时间:${value}`) },
    ], 'plain-text', '18：00')
  }
  callBackFooter2(key) {
    console.log("Footer 2 is clicked...");
    // this.showModal('modal2');
    this.setState({
      [key]: true,
    });
  }
  //#endregion

  showModal = key => (e) => {
    console.log("!!!!!!");
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  goToNextPage() {
    this.props.history.push({
      pathname: '/App2',
      state: {}
    });
  }
}

export default App;
