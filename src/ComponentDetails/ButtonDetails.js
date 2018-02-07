import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Row from '../components/row/row';
import Content from '../components/content/content';
import Button from '../components/button/button';
import ReactMarkdown from 'react-markdown';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            className: ""
        };
    }
    componentWillMount() {
        let middle = this.props.history.action === "POP" ? window.sessionStorage.getItem("middle") : "";
        this.setState({
            className: middle
        });
    }

    componentWillReceiveProps(nextProps) {
        // 后退的时候，直接pop最上面的page
        if (nextProps.history.action === 'POP') {
            this.setState({
                className: ""
            });
        } else {
            if (nextProps.history.action === 'REPLACE') {
                this.setState({
                    className: ""
                });
            }
            // 跳转新页面的时候，push
            this.setState({
                className: "-reverse"
            });
        }
    }

    componentDidMount() {}
    
    render() {
        let headerImageSrc = "../images/arrowback-large.png";
        return (
            <div className={`transition-item detail-page`+this.state.className}>
                <Header name="Button" 
                    headerImageSrc={headerImageSrc}
                    onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                </Header>
                <div className="content">
                    <Row>
                        <Button style="inspur" size="lg" text={"Test"} col={12} onClick={this.goToSeeDetails.bind(this)} />
                        <Button style="inspur" size="lg" text={"col-12"} col={12} onClick={this.buttonClick.bind(this)} />
                        <Button style="primary" size="lg" text={"col-6"} col={6} onClick={this.buttonClick.bind(this)} />
                        <Button style="default" size="lg" text={"col-6"} col={6} onClick={this.buttonClick.bind(this)}/>
                        <Button style="success" size="" text={"col-4"} col={4} onClick={this.buttonClick.bind(this)} />
                        <Button style="warning" size="" text={"col-4"} col={4} onClick={this.buttonClick.bind(this)} />
                        <Button style="danger" size="" text={"col-4"} col={4} onClick={this.buttonClick.bind(this)}/>
                        <Button style="primary" size="sm" text="col-3" col={3} onClick={this.buttonClick.bind(this)} />
                        <Button style="primary" size="sm" text="col-3" col={3} onClick={this.buttonClick.bind(this)} />
                        <Button style="primary" size="sm" text="col-3" col={3} onClick={this.buttonClick.bind(this)} />
                        <Button style="primary" size="sm" text="col-3" col={3} onClick={this.buttonClick.bind(this)} />
                    </Row>
                </div>
            </div>
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
