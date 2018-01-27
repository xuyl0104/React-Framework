import message from 'antd/lib/message';
import 'antd/lib/message/style/css';

export default function showMessage(type, text, duration = 2, position = 70) {
    message.config({
        top: position
    });
    if(type === "success") {
      message.success(text, duration);
    } else if(type === "fail") {
      message.error(text, duration);
    } else if(type === "info") {
      message.info(text, duration);
    } else if(type === "warning") {
      message.warning(text, duration);
    }
}