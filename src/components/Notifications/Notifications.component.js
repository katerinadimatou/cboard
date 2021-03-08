import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { NOTIFICATION_DELAY } from './Notifications.constants';
import { FormattedMessage } from 'react-intl';
import messages from './Notifications.messages';

const propTypes = {
  config: PropTypes.object.isRequired,
  handleNotificationDismissal: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  kind:PropTypes.string.isRequired,
  showQueuedNotificationIfAny: PropTypes.func.isRequired
};

const Notifications = ({
  config,
  handleNotificationDismissal,
  message,
  open,
  kind,
  showQueuedNotificationIfAny
}) => (
  <Snackbar 
    {...config}
    open={open}
    ContentProps={{
      variant: 'elevation',
      'aria-describedby': 'message-id'
      }}
    message={<span id="message-id">{message}</span>}  
    autoHideDuration={NOTIFICATION_DELAY} 
    onClose={handleNotificationDismissal}
    // show any queued notifications after the  
    // present one transitions outhandleNotificationDismissal
    onExited={showQueuedNotificationIfAny}>  
    {kind==='refresh' && <MuiAlert elevation={6} variant="filled" onClose={handleNotificationDismissal} severity='info'>
      <span id="message-id">{message}</span>
      <Button variant="outlined">
      <FormattedMessage {...messages.refreshPage } />
      </Button>
    </MuiAlert>}
  </Snackbar>
);

Notifications.propTypes = propTypes;

export default Notifications;
