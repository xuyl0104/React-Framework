import React, {Component} from 'react';
import Modal from 'antd-mobile/lib/modal';
import 'antd-mobile/lib/modal/style/css';
import List from 'antd-mobile/lib/list';
import 'antd-mobile/lib/list/style/css';
import Button from 'antd-mobile/lib/button';
import 'antd-mobile/lib/button/style/css';

export default function showModal(mode, title, message, actionArr, option, defaultValue) {

    if(mode === 'alert') {
        Modal.alert(title, message, actionArr)
    } if(mode === 'prompt') {
        Modal.prompt(title, message, actionArr, option, defaultValue)
    } 
}