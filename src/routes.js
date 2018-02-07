import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ComponentList from './ComponentList/ComponentList';
import Details from './Details/Details';
import PageTransition from "react-router-page-transition";
import ButtonDetails from './ComponentDetails/ButtonDetails';
import InputDetails from './ComponentDetails/InputDetails';
import MessageDetails from './ComponentDetails/MessageDetails';
import ModelDetails from './ComponentDetails/ModalDetails';
import CardDetails from './ComponentDetails/CardDetails';
import StepperDetails from './ComponentDetails/StepperDetails';
import HeaderDetails from './ComponentDetails/HeaderDetails';
import FooterDetails from './ComponentDetails/FooterDetails';
import PickerDetails from './ComponentDetails/PickerDetails';
import RefreshDetails from './ComponentDetails/RefreshDetails';
import RadioCheckDetails from './ComponentDetails/CheckRadioDetails';
import ListitemDetails from './ComponentDetails/ListitemDetails';
import FetchDetails from './ComponentDetails/FetchDetails';
import PageTemplateDetails from './ComponentDetails/PageTemplateDetails';
import Test from './ComponentDetails/test';
import Test2 from './ComponentDetails/test2';

class Routes extends Component {
    render() {
        return (
            <Router>
                <Route
                    render={({location}) => (
                    <PageTransition timeout={500}>
                        <Switch location={location}>
                            <Route exact path="/" component={ComponentList}/>
                            <Route path="/ButtonDetails" component={ButtonDetails}/>
                            <Route path="/InputDetails" component={InputDetails}/>
                            <Route path="/MessageDetails" component={MessageDetails}/>
                            <Route path="/ModalDetails" component={ModelDetails}/>
                            <Route path="/CardDetails" component={CardDetails}/>
                            <Route path="/StepperDetails" component={StepperDetails}/>
                            <Route path="/PickerDetails" component={PickerDetails}/>
                            <Route path="/HeaderDetails" component={HeaderDetails}/>
                            <Route path="/FooterDetails" component={FooterDetails}/>
                            <Route path="/RefreshDetails" component={RefreshDetails}/>
                            <Route path="/RadioCheckDetails" component={RadioCheckDetails}/>
                            <Route path="/ListitemDetails" component={ListitemDetails}/>
                            <Route path="/FetchDetails" component={FetchDetails}/>
                            <Route path="/FetchDetails" component={FetchDetails}/>
                            <Route path="/PageTemplateDetails" component={PageTemplateDetails}/>
                            <Route path="/test" component={Test}/>
                            <Route path="/test2" component={Test2}/>

                        </Switch>
                    </PageTransition>
                )}/>
            </Router>
        );
    }
}

export default Routes;