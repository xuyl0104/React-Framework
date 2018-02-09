import React, {Component} from 'react';
import './listview.css';

class Listview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let text = this.props.text;
        // let style = this.props.style;
        let tagClassName;
        let tagClassNameLg;
        let length = this.props.children.length;
        if(!this.props.children.length) {
            length = 1;
        }
        // console.log(this.props.children);
        switch (length) {
            case 1:
                tagClassName = 4; tagClassNameLg = 4;
                break;
            case 2:
                tagClassName = 4; tagClassNameLg = 4;
                break;
            case 3:
                tagClassName = 3; tagClassNameLg = 4;
                break;
        
            default:
                tagClassName = 4; tagClassNameLg = 4;
                break;
        }
        return (
            <div className="listview d-flex" 
                onClick={this.props.onClick}>
                    <label className={"col-"+""+tagClassName+" col-lg-"+(tagClassNameLg)+ " col-md-"+(tagClassNameLg)}><nobr>{text}</nobr></label>
                    <div className={"itemContent col-"+""+(12-tagClassName)+" col-lg-"+(12-tagClassNameLg)+" col-md-"+(12-tagClassNameLg)+" d-flex justify-content-end pr-0"}>
                        {this.props.children}
                    </div>
            </div>
        );
    }

    renderChildren(props) {
        //遍历所有子组件
        return React.Children.map(props.children, child => {
            return child
        })
    }

}
export default Listview