import React, {Component} from 'react';
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
        let finishedComponent = ['Button', 'Input', 'Message', 'Modal', 'Card', 'Stepper', 'Picker', 'Header', 'Footer', 'Refresh/Load More', 'RadioCheck', 'Listview', 'Tab', 'Fetch', 'Page template', 'Page transition'];
        let finishedIndicator = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        let displayDivs = finishedComponent.map((item, index) => {
            return (
                <List.Item arrow="horizontal" onClick={this.goToSeeDetails.bind(this, index)} key={index}>
                    {<span style={{color: finishedIndicator[index] === 1 ? 'black' : '#a29e9e'}}>{item}</span>}
                </List.Item>
                // <Listview text={item} onClick={this.goToSeeDetails.bind(this, index)} key={index}>
                //     <div></div>
                //     <div className="pt-2"><Icon type="right" size={'md'} color={'#b6b6b6'}/></div>
                // </Listview>
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
                detailsPage = "/TabDetails";
                break;
            case 13:
                detailsPage = "/FetchDetails";
                break;
            case 14:
                detailsPage = "/PageTemplateDetails";
                break;
            case 15:
                detailsPage = "/PageTransitionDeatils";
                break;
            default:
                break;
        }
        this.props.history.push({
            pathname: detailsPage,
            state: {}
        });
    }

    /**
     * 在第一个页面点击后退按钮，彻底退出云+应用程序
     * Usage: 
     * Step 1. 调用window.gsp.rtf.func.closeCurrent()方法
     * Step 2. 将impbase.js置于public文件夹（npm run build命令将其打包至build文件夹）
     * Step 3. 在index.html中添加<script src="%PUBLIC_URL%/impbase.js"></script>，引入impbase.js文件
     * 云+其他底层文件引用方法与此类似
     */
    onLeftArrowClick() {
        console.log("程序已经退出...");
        window.gsp.rtf.func.closeCurrent();
    }


}

export default Details;
