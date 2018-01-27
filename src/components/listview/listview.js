import React, {Component} from 'react';
import './listview.css';

class Listview extends Component {
    render() {
        let text = this.props.text;
        let style = this.props.style;
        return (
            <div className="listview" style={style}>
                <div className="row" >
                    <div className="col-4" >
                        <label>{text}</label>
                    </div>
                    <div className="col-8" style={{'display': 'inline-flex'}}>
                        {this.renderChildren(this.props)}
                    </div>
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