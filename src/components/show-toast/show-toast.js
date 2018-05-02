import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';

import './style/css';

export default function ShowToast(type, text, duration = 2) {
    
    if (type === "success") {
        Toast.success(text, duration);
    } else if (type === "fail") {
        Toast.fail(text, duration);
    } else if (type === "offline") {
        Toast.offline(text, duration);
    } else if (type === "loading") {
        Toast.loading(text, duration);
    }
}