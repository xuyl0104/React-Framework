import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Row from '../components/row/row';
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
                <Header name="Button" 
                    headerImageSrc={headerImageSrc}
                    onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                </Header>
                {/* <Container padding={[8, 8, 8, 8]}> */}
                    <div className="content">
                        <Row>
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
                {/* </Container> */}
            </div>
        );
    }

    onLeftArrowClick() {
		this.props.history.goBack();
    }

    buttonClick() {
        console.log("Button is clicked...");
    }
}

export default Details;
