import React, {Component} from 'react';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Container from '../components/container/container';
import Content from '../components/content/content';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            className: ""
        };
    }

    componentDidMount() {}

    componentWillMount() {
        let middle = this.props.history.action === "POP" ? "-reverse" : "";
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
        return (
            <div className={`transition-item detail-page`+this.state.className}>
                <Container>
                    <Header name="Test2" 
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>
                    <Content padding={[0, 0, 0, 0]}>
                        <div>Test2</div>
                    </Content>
                    <Footer size="sm"
                        style={[{'color': '#318ccf', 'backgroundColor': '#ffffff'}, 
                                {'color': 'white', 'backgroundColor': '#318ccf'}]}
                        buttonName={["返回", "前进"]}
                        callBackFooterButtonClick={[
                            this.callBackFooter0.bind(this), 
                            this.callBackFooter1.bind(this)
                            ]}>
                    </Footer>
                </Container>
            </div>
        );
    }

    onLeftArrowClick() {
        // window.sessionStorage.setItem("middle", "-reverse");
		this.props.history.goBack();
    }

    callBackFooter0() {
        // window.sessionStorage.setItem("middle", "-reverse");
        this.props.history.goBack();
    }

    callBackFooter1() {
        this.props.history.push({
            pathname: '/test3',
            state: {}
        });
    }

}

export default Details;
