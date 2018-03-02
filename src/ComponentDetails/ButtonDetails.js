import React, {Component} from 'react';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Row from '../components/row/row';
import Container from '../components/container/container';
import Content from '../components/content/content';
import Button from '../components/button/button';
import PageTransition from '../components/pageTransition/pageTransition';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            className: ""
        };
    }

    componentDidMount() {}
    
    render() {
        return (
            // <div className={`transition-item detail-page`+this.state.className}>
            <PageTransition transitionClass={"detail-page"} direction={this.state.className}>
                <Container>
                    <Header name="Button" 
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>
                    <Content>
                        <Row>
                            {/* <Button style={"primary"} size="lg" text={"点击测试翻页效果"} col={12} onClick={this.goToSeeDetails.bind(this)} /> */}
                            <Button bstyle={"primary"} size="lg" text={"col-12"} col={12} onClick={this.buttonClick.bind(this)} />
                            <Button bstyle={"primary"} size="lg" text={"col-6"} col={6} onClick={this.buttonClick.bind(this)} />
                            <Button bstyle={"default"} size="lg" text={"col-6"} col={6} onClick={this.buttonClick.bind(this)}/>
                            <Button bstyle={"success"} size="" text={"col-4"} col={4} onClick={this.buttonClick.bind(this)} />
                            <Button bstyle={"warning"} size="" text={"col-4"} col={4} onClick={this.buttonClick.bind(this)} />
                            <Button bstyle={"danger"} size="" text={"col-4"} col={4} onClick={this.buttonClick.bind(this)}/>
                            <Button bstyle={"primary"} size="sm" text="col-3" col={3} onClick={this.buttonClick.bind(this)} />
                            <Button bstyle={"primary"} size="sm" text="col-3" col={3} onClick={this.buttonClick.bind(this)} />
                            <Button bstyle={"primary"} size="sm" text="col-3" col={3} onClick={this.buttonClick.bind(this)} />
                            <Button bstyle={"primary"} size="sm" text="col-3" col={3} onClick={this.buttonClick.bind(this)} />
                            <Button bstyle={"new"} 
                                newStyle={{color: 'white', backgroundColor: '#318ccf', borderRadius: '0'}} 
                                size="sm" 
                                text="自定义" col={12} onClick={this.buttonClick.bind(this)} />
                        </Row>
                    </Content>
                </Container>
            </PageTransition>
            // </div>
        );
    }

    onLeftArrowClick() {
		this.props.history.goBack();
    }

    buttonClick() {
        console.log("Button is clicked...");
    }

    goToSeeDetails() {
        this.props.history.push({
            pathname: '/test',
            state: {}
        });
    }
}

export default Details;
