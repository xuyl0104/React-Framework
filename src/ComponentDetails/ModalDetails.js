import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import './ComponentDetails.css';
import Card from '../components/card/card';
import showModal from '../Utils/showModals';
import Header from '../components/header/header';
import Row from '../components/row/row';
import Container from '../components/container/container';
import Content from '../components/content/content';
import Button from '../components/button/button';
import Modal from 'antd-mobile/lib/modal';
import 'antd-mobile/lib/modal/style/css';
import List from 'antd-mobile/lib/list';
import 'antd-mobile/lib/list/style/css';
import AButton from 'antd-mobile/lib/button';
import 'antd-mobile/lib/button/style/css';

class Details extends Component {
    constructor() {
        super();
        this.state = {
             modal2: false
        };
    }

    componentDidMount() {}

    render() {
        let headerImageSrc = "../images/arrowback-large.png";
        return (
            <div className="transition-item detail-page">
                <Container>
                    <Header name="Message" 
                        headerImageSrc={headerImageSrc}
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>
                    <Content>
                        <label>Alert</label>
                        <Row>
                            <Button style="primary" size="lg" text="普通提示框" col={12} 
                                onClick={
                                    () => {showModal("alert", 
                                        "这是一个提示框", 
                                        "确定要删除？", 
                                        [
                                            { text: 'Button1', onPress: () => this.callback1() },
                                            { text: 'Button2', onPress: () => this.callback2() },
                                        ]
                                        )
                                    }
                                }
                            />
                            <Button style="primary" size="lg" text="多按钮提示框" col={12} 
                                onClick={
                                    () => {showModal("alert", 
                                        "这是一个提示框", 
                                        "确定要删除？", 
                                        [
                                            { text: 'Button1', onPress: () => this.callback1() },
                                            { text: 'Button2', onPress: () => this.callback2() },
                                            { text: 'Button3', onPress: () => this.callback3() },
                                        ]
                                        )
                                    }
                                }
                            />
                        </Row>
                        <label>Prompt</label>
                        <Row>
                            <Button style="success" size="lg" text="普通输入框" col={12} 
                                onClick={
                                    () => {showModal("prompt", 
                                        "这是一个输入框", 
                                        "请输入要导出的邮箱", 
                                        [
                                            { text: '取消', onPress: () => this.callback1() },
                                            { text: '确认', onPress: (pswd) => this.callback4(pswd) },
                                        ]
                                        )
                                    }
                                }
                            />
                            <Button style="success" size="lg" text="带默认值输入框" col={12} 
                                onClick={
                                    () => {showModal("prompt", 
                                        "这是一个输入框", 
                                        "请输入要导出的邮箱", 
                                        [
                                            { text: '取消', onPress: () => this.callback1() },
                                            { text: '确认', onPress: (pswd) => this.callback4(pswd) },
                                        ], 'default', 'abc@inspur.com'
                                        )
                                    }
                                }
                            />
                            
                        </Row>
                        <label>Slide Up</label>
                        <Row>
                            <Button style="warning" size="lg" text="划出" col={12} 
                                onClick={() => {this.callback5('modal2')}}
                            />
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
                        </Row>
                    </Content>
                </Container>
            </div>
        );
    }

    callback1() {
        console.log("1");
    }

    callback2() {
        console.log("2");
    }

    callback3() {
        console.log("3");
    }

    callback4(value) {
        console.log(value);
    }

    callback5(key) {
        this.setState({
        [key]: true,
        });
    }

    onClose = key => () => {
        this.setState({
        [key]: false,
        });
    }

    goToSeeDetails() {
        console.log("Go to see details...");
    }

    onLeftArrowClick() {
		this.props.history.goBack();
    }

    
}

export default Details;
