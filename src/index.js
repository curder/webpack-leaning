require('./assets/css/index.css');
require('./assets/sass/index.scss');
import notification from './Notification.js';

notification.announce('my notification message.');
notification.log('my notification message.');

class Form {}