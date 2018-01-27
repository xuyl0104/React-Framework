import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
    render() {
        let buttonNameArr = this.props.buttonName;
        let buttonStyleArr = this.props.style;
        let numOfButton = buttonNameArr.length;
        let buttonWidth;
        switch (buttonNameArr.length) {
            case 1:
                buttonWidth = "w-100";
                break;
            case 2:
                buttonWidth = "w-50";
                break;
            case 3:
                buttonWidth = "w-33";
                break;
            case 4:
                buttonWidth = "w-25";
                break;
        
            default:
                break;
        }

        let footerButtonDiv = buttonNameArr.map((button, index) => {
            return (
                <div className={`${buttonWidth} buttonHeight text-center d-inline-block py-15`}
                    style={buttonStyleArr[index]}
                    key={index}
                    onClick={this.onButtonClick.bind(this, index)}>{button}</div>
            );
        })

        return (
            <div>
                <div className="fixed-bottom w-100 footer">
                    {footerButtonDiv}
                </div>
            </div>
        );
    }

    onButtonClick(index) {
        // console.log(index);
        let callBackFunction = this.props.callBackFooterButtonClick[index];
        callBackFunction();
    }
    
}
  
  export default Footer