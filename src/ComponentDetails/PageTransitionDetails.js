import React, {Component} from 'react';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Row from '../components/row/row';
import Container from '../components/container/container';
import Content from '../components/content/content';
import Button from '../components/button/button';
import ReactMarkdown from 'react-markdown';
import PageTransition from '../components/pageTransition/pageTransition';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            className: ""
        };
    }

    /**
     * 该方法用于中间页面中（如A->B->C->D 时，用于B,C页面），用于判断中间页面的appear动画方向
     * 当该中间页面是因为路由POP操作出现，则执行detail-page-reverse的appear；
     * 否则（被PUSH进路由history），执行detail-page的appear。
     */
    componentWillMount() {
        let middle = this.props.history.action === "POP" ? '-reverse' : "";
        this.setState({
            className: middle
        });
    }

    /**
     * 根据当前页面的路由动作，设定当前页面执行的leave动画方向
     * POP：detail-page的leave方向
     * REPLACE：detail-page的leave方向
     * PUSH：detail-page-reverse的leave方向
     * @param {*} nextProps 
     */
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
        return (
            <PageTransition transitionClass={"detail-page"} direction={this.state.className}>
                <Container>
                    <Header name="PageTransition" 
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>
                    <Content>
                        <Row>
                            <Button style={"primary"} size="lg" text={"点击测试翻页效果"} col={12} onClick={this.goToSeeDetails.bind(this)} />
                        </Row>
                    </Content>
                </Container>
            </PageTransition>
        );
    }

    onLeftArrowClick() {
		this.props.history.goBack();
    }

    goToSeeDetails() {
        this.props.history.push({
            pathname: '/test',
            state: {}
        });
    }
}

export default Details;
