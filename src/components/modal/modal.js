import './modal.css';
import Modal from 'antd-mobile/lib/modal';
import 'antd-mobile/lib/modal/style/css';

export default function showModal(mode, title, message, texts, callbacks) {

    let actionArr = texts.map((text, index) => {
        return {
            text: text,
            onPress: this.onButtonClick.bind(this, index)
        };
    });

    if(mode === 'alert') {
        Modal.alert({title}, {message}, {actionArr})
    } if(mode === 'prompt') {
        Modal.prompt('就餐时间', '请输入就餐时间', [
            { text: 'Cancel' },
            { text: 'Submit', onPress: value => console.log(`就餐时间:${value}`) },
            ], 'plain-text', '18：00')
    }

}