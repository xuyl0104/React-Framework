import React, {Component} from 'react';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Container from '../components/container/container';
import Content from '../components/content/content';
import '../components/third-party/toast/style/css';
import Stepper from '../components/stepper/stepper';

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
                    <Header name="Stepper" 
                        headerImageSrc={headerImageSrc}
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>
                    <Content>
                        <label>纵向审批流程</label>
                        <Stepper 
                            titles={['徐云龙', '陈经理', '孙总', '郑总']} 
                            descriptions={['发起人', '直接上级', '分管经理', '部门经理']} 
                            current={3}
                            direction="vertical">
                        </Stepper>
                        <label>Example-2</label>
                        <label>横向审批流程</label>
                        <Stepper 
                            titles={['徐云龙', '陈经理', '孙总']} 
                            descriptions={['发起人', '直接上级', '分管经理']} 
                            current={2}
                            direction="horizontal">
                        </Stepper>
                    </Content>
                </Container>
            </div>
        );
    }

    

    onLeftArrowClick() {
		this.props.history.goBack();
    }

}

export default Details;
