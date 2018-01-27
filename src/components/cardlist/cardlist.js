import React, {Component} from 'react';
import './cardlist.css';

class CardList extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="cardlist">
                {this.renderChildren(this.props)}
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
export default CardList