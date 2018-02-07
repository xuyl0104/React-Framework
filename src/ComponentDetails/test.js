import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Row from '../components/row/row';
import Container from '../components/container/container';
import Content from '../components/content/content';
import '../components/third-party/toast/style/css';
import Icon from 'antd/lib/icon';
import Input from '../components/input/input';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            className: ""
        };
    }

    componentDidMount() {}

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

    render() {

        // console.log(this.props.history)
        return (
            <div className={`transition-item detail-page`+this.state.className}>
                <Container>
                    <Header name="Test" 
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>
                    <Content padding={[0, 0, 0, 0]}>
                        <div>Test</div>
                    </Content>
                    <Footer size="sm"
                        style={[{'color': 'white', 'backgroundColor': '#318ccf'}]}
                        buttonName={["前往下一页"]}
                        callBackFooterButtonClick={[this.callBackFooter0.bind(this)]}>
                    </Footer>
                </Container>
            </div>
        );
    }

    onLeftArrowClick() {
        window.sessionStorage.setItem("middle", "-reverse");
		this.props.history.goBack();
    }

    callBackFooter0() {
        this.props.history.push({
            pathname: '/test2',
            state: {}
        });
    }

}

export default Details;
