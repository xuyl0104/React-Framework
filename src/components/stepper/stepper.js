import React, {Component} from 'react';
import './stepper.css';
import Steps from 'antd-mobile/lib/steps';
import 'antd-mobile/lib/steps/style/css';

class Stepper extends Component {
    render() {
        let titles = this.props.titles || [];
        let descriptions = this.props.descriptions || [];
        let current = this.props.current;
        let direction = this.props.direction || "vertical";
        let stepDivs = titles.map((title, index) => {
            return (
                <Steps.Step title={title} description={descriptions[index]} key={index}/>
            );
        });
        return (
            <div className="stepper">
                <Steps current={current} direction={direction}>
                    {stepDivs}
                </Steps>
            </div>
        );
    }
}
export default Stepper