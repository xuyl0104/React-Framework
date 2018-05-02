import Modal from 'antd-mobile/lib/modal';
import 'antd-mobile/lib/modal/style/css';

import './style/css';

export default function ShowModal(mode, title, message, actionArr, option, defaultValue) {

    if(mode === 'alert') {
        Modal.alert(title, message, actionArr)
    } if(mode === 'prompt') {
        Modal.prompt(title, message, actionArr, option, defaultValue)
    } 
}