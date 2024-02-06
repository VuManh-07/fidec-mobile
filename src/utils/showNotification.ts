import {
  hideMessage,
  showMessage,
  MessageType,
} from 'react-native-flash-message';

export const showNotification = (
  title: string,
  message: string,
  _type: MessageType,
) => {
  showMessage({
    message: title,
    description: message,
    type: _type,
    style: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'white',
      margin: 10,
    },
    duration: 1000,
    hideOnPress: true,
    onPress: () => {
      hideMessage();
    },
  });
};
