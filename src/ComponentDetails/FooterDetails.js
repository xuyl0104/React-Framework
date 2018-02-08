import React, {Component} from 'react';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Row from '../components/row/row';
import Container from '../components/container/container';
import Content from '../components/content/content';
import Button from '../components/button/button';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            key: 1,
            size: "lg"
        };
    }

    componentDidMount() {}

    render() {
        let footerDiv;
        if(this.state.key === 1) {
            footerDiv = this.state.size === "lg" ? (
                <Footer size="lg"
                    style={[{'color': 'white', 'backgroundColor': '#318ccf'}]}
                    buttonName={["下单"]}
                    callBackFooterButtonClick={[
                        this.callBackFooter0]}>
                </Footer>
            ) : (
                <Footer size="sm"
                    style={[{'color': 'white', 'backgroundColor': '#318ccf'}]}
                    buttonName={["下单"]}
                    callBackFooterButtonClick={[
                        this.callBackFooter0]}>
                </Footer>
            );
        } else if(this.state.key === 2) {
            footerDiv = this.state.size === "lg" ? (
                <Footer size="lg"
                    style={[{'color': '#318ccf', 'backgroundColor': '#ffffff'}, 
                            {'color': 'white', 'backgroundColor': '#318ccf'}]}
                    buttonName={["拒单", "接单"]}
                    callBackFooterButtonClick={[
                        this.callBackFooter0, 
                        this.callBackFooter1
                        ]}>
                </Footer>
            ) : (
                <Footer size="sm"
                    style={[{'color': '#318ccf', 'backgroundColor': '#ffffff'}, 
                            {'color': 'white', 'backgroundColor': '#318ccf'}]}
                    buttonName={["拒单", "接单"]}
                    callBackFooterButtonClick={[
                        this.callBackFooter0, 
                        this.callBackFooter1
                        ]}>
                </Footer>
            );
        } else {
            footerDiv = this.state.size === "lg" ? (
                <Footer size="lg"
                    style={[{'color': '#318ccf', 'backgroundColor': '#ffffff'}, 
                            {'color': 'white', 'backgroundColor': '#318ccf'},
                            {'color': '#318ccf', 'backgroundColor': '#ffffff'}]}
                    buttonName={["取消", "删除", "确定"]}
                    callBackFooterButtonClick={[
                        this.callBackFooter0, 
                        this.callBackFooter1,
                        this.callBackFooter2
                        ]}>
                </Footer>
            ) : (
                <Footer size="sm"
                    style={[{'color': '#318ccf', 'backgroundColor': '#ffffff'}, 
                            {'color': 'white', 'backgroundColor': '#318ccf'},
                            {'color': '#318ccf', 'backgroundColor': '#ffffff'}]}
                    buttonName={["取消", "删除", "确定"]}
                    callBackFooterButtonClick={[
                        this.callBackFooter0, 
                        this.callBackFooter1,
                        this.callBackFooter2
                        ]}>
                </Footer>
            );
        }

        return (
            <div className="transition-item detail-page">
                <Container>
                    <Header name="Footer" 
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>
                    <Content>
                        <Row>
                            <Button style={"primary"} size="lg" text="一个按钮的footer-lg" col={12} onClick={this.onButtonClick.bind(this, 1, "lg")}/>
                            <Button style={"primary"} size="lg" text="两个按钮的footer-lg" col={12} onClick={this.onButtonClick.bind(this, 2, "lg")}/>
                            <Button style={"primary"} size="lg" text="三个按钮的footer-lg" col={12} onClick={this.onButtonClick.bind(this, 3, "lg")}/>
                            <Button style={"primary"} size="" text="一个按钮的footer-sm" col={12} onClick={this.onButtonClick.bind(this, 1, "sm")}/>
                            <Button style={"primary"} size="" text="两个按钮的footer-sm" col={12} onClick={this.onButtonClick.bind(this, 2, "sm")}/>
                            <Button style={"primary"} size="" text="三个按钮的footer-sm" col={12} onClick={this.onButtonClick.bind(this, 3, "sm")}/>
                        </Row>
                    </Content>
                    {footerDiv}                          
                </Container>
            </div>
        );
    }

    onButtonClick(key, size) {
        this.setState({
            key: key,
            size: size
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
