import React, {Component} from 'react';
import './ComponentDetails.css';
import showMessage from "../Utils/showMessage";
import showToast from '../Utils/showToast';
import Header from '../components/header/header';
import Row from '../components/row/row';
import Container from '../components/container/container';
import Content from '../components/content/content';
import Button from '../components/button/button';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            
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
                            <label>Message</label>
                            <Row>
                                <Button style={"primary"} size="lg" text="info" col={12} onClick={() => {showMessage("info", "这是一条消息", 2)}}/>
                                <Button style={"success"} size="lg" text="success" col={12} onClick={() => {showMessage("success", "这是一条成功提示")}}/>
                                <Button style={"danger"} size="lg" text="danger" col={12} onClick={() => {showMessage("fail", "这是一条危险提示")}}/>
                                <Button style={"warning"} size="lg" text="warning" col={12} onClick={() => {showMessage("warning", "这是一条警告提示")}}/>
                            </Row>
                            <label>Toast</label>
                            <Row>
                                <Button style={"primary"} size="lg" text={"success"} col={6} onClick={() => showToast("success", "加载成功")}/>
                                <Button style={"primary"} size="lg" text={"fail"} col={6} onClick={() => showToast("fail", "加载失败")}/>
                                <Button style={"primary"} size="lg" text={"network failure"} col={6} onClick={() => showToast("offline", "网络错误")}/>
                                <Button style={"primary"} size="lg" text={"loading"} col={6} onClick={() => showToast("loading", "加载中")}/>
                            </Row>
                    </Content>
                </Container>
            </div>
        );
    }

    goToSeeDetails() {
        console.log("Go to see details...");
    }

    onLeftArrowClick() {
		this.props.history.goBack();
    }

    
}

export default Details;
