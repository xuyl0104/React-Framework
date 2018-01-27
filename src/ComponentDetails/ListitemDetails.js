import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Row from '../components/row/row';
import Container from '../components/container/container';
import '../components/third-party/toast/style/css';
import Icon from 'antd/lib/icon';
import container from '../components/container/container';
import Input from '../components/input/input';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            text: "",
            text2: ""
        };
        this.onTextChange = this.onTextChange.bind(this);
        this.onTextChange2 = this.onTextChange2.bind(this);
    }

    componentDidMount() {}

    render() {
        return (
            <div className="transition-item detail-page">
                <Header name="Listitem" 
                    onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                </Header>
                <Container padding={[8, 8, 8, 8]}>
                    <div className="content">
                        
                    </div>
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

    onTextChange(e) {
        let newValue = e.target.value;
        this.setState({
            text: newValue
        });
    }
    onTextChange2(e) {
        let newValue = e.target.value;
        this.setState({
            text2: newValue
        });
    }
}

export default Details;
