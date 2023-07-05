import {NotificationManager} from 'react-notifications';


export const NotificationHandler = {
    createNotification: function (type, message) {
        switch (type) {
            default:
                break;
            case 'info':
                NotificationManager.info('Info message');
                break;
            case 'success':
                NotificationManager.success(message, 'Succesvol', 2500);
                break;
            case 'warning':
                NotificationManager.warning(message, 'Waarschuwing', 2500);
                break;
            case 'error':
                NotificationManager.error(message, 'Error', 2500);
                break;
        }
    }

}