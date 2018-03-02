import React, {Component} from 'react';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Row from '../components/row/row';
import Container from '../components/container/container';
import Content from '../components/content/content';
import Button from '../components/button/button';
import Icon from 'antd-mobile/lib/icon';
import 'antd-mobile/lib/icon/style/css';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            key: 0
        };
    }

    componentDidMount() {}

    render() {
        let headerDiv;
        if(this.state.key ===0) {
            headerDiv = (
                <Header name="Header" 
                    onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                </Header>
            );
        } else if(this.state.key === 1) {
            headerDiv = (
                <Header name="Header" 
                    onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    <img src={require("../images/add.png")} style={{width: '25px', height: '25px'}} 
                        alt="" className="pull-right"
                        onClick={this.props.onLeftArrowClick}></img>
                </Header>
            );
        } else {
            headerDiv = (
                 <Header name="Header" 
                    onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    <img src={require("../images/add.png")} style={{width: '25px', height: '25px'}} 
                        alt="" className="pull-right"
                        onClick={this.props.onLeftArrowClick}></img>
                    <div className="ml-2"><Icon key="1" type="ellipsis" size={'md'}/></div>
                </Header>
            );
        }

        return (
            <div className="transition-item detail-page">
                <Container>
                    {headerDiv}
                    <Content>
                        <div className="content">
                            <Row>
                                <Button bstyle={"primary"} size="" text="无按钮的header" col={12} onClick={this.onButtonClick.bind(this, 0)}/>
                                <Button bstyle={"primary"} size="" text="一个按钮的header" col={12} onClick={this.onButtonClick.bind(this, 1)}/>
                                <Button bstyle={"primary"} size="" text="多个按钮的header" col={12} onClick={this.onButtonClick.bind(this, 2)}/>
                            </Row>                                                
                        </div>
                    </Content>
                </Container>
            </div>
        );
    }

    onButtonClick(key) {
        this.setState({
            key: key
        });
    }

    onLeftArrowClick() {
		this.props.history.goBack();
    }

    callBackFooter0() {
        console.log("Footer 0 is clicked...");
    }

    callBackFooter1() {
        console.log("Footer 1 is clicked...");    
    }

    callBackFooter2() {
        console.log("Footer 2 is clicked...");
    }
    
}

export default Details;
