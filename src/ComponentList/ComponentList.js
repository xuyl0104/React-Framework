import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import './ComponentList.css';
import Container from '../components/container/container';
import Content from '../components/content/content';
import Header from '../components/header/header';
import List from 'antd-mobile/lib/list';
import 'antd-mobile/lib/list/style/css';

class Details extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        let finishedComponent = ['Button', 'Input', 'Message', 'Modal', 'Card', 'Stepper', 'Picker', 'Header', 'Footer', 'Refresh/Load More', 'RadioCheck', 'Listitem', 'Fetch', 'Page template'];
        let finishedIndicator = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        let displayDivs = finishedComponent.map((item, index) => {
            return (
                <List.Item arrow="horizontal" onClick={this.goToSeeDetails.bind(this, index)} key={index}>
                    {<span style={{color: finishedIndicator[index] === 1 ? 'black' : '#a29e9e'}}>{item}</span>}
                </List.Item>
            );
        });
        return (
            <div className="transition-item list-page">
                <Container>
                    <Header name="组件列表" 
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>

                    <Content>
                        <List>
                            {displayDivs}
                        </List>
                    </Content>
                </Container>
            </div>
        );
    }

    goToSeeDetails(index) {
        let detailsPage;
        switch (index) {
            case 0:
                detailsPage = "/ButtonDetails";
                break;
            case 1:
                detailsPage = "/InputDetails";
                break;
            case 2:
                detailsPage = "/MessageDetails";
                break;
            case 3:
                detailsPage = "/ModalDetails";
                break;
            case 4:
                detailsPage = "/CardDetails";
                break;
            case 5:
                detailsPage = "/StepperDetails";
                break;
            case 6:
                detailsPage = "/PickerDetails";
                break;
            case 7:
                detailsPage = "/HeaderDetails";
                break;
            case 8:
                detailsPage = "/FooterDetails";
                break;
            case 9:
                detailsPage = "/RefreshDetails";
                break;
            case 10:
                detailsPage = "/RadioCheckDetails";
                break;
            case 11:
                detailsPage = "/ListitemDetails";
                break;
            case 12:
                detailsPage = "/FetchDetails";
                break;
            case 13:
                detailsPage = "/PageTemplateDetails";
                break;
        
            default:
                break;
        }
        this.props.history.push({
            pathname: detailsPage,
            state: {}
        });
    }

    onLeftArrowClick() {
        console.log("Quit button is clicked...");
        window.sessionStorage.removeItem('middle');
    }


}

export default Details;
