import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import HeaderNewScreen from '../../components/Header/HeaderNewScreen';
import R from '../../assets/R';
import axiosInstance from '../../utils/axios/axiosChatbot';
import {navigate} from '../../navigate/navigation-service';

interface IMessages {
  id: number;
  message: string;
  role?: string;
  navigate?: string;
  amount?: number;
  address?: string;
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<Array<IMessages>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      return;
    }

    const updatedMessages: Array<IMessages> = [
      ...messages,
      {id: messages.length, message: newMessage},
    ];
    setMessages(updatedMessages);
    setIsSubmit(true);
  };

  const get = async (_newMessage: string) => {
    const response = await axiosInstance.post('/api/ai/v1/chatbot', {
      doc: _newMessage,
    });
    const updatedMessages: Array<IMessages> = [
      ...messages,
      {
        id: messages.length,
        ...response.data,
      },
    ];
    setMessages(updatedMessages);
    setIsSubmit(false);
    setNewMessage('');
  };

  const Navigate = (_navigate: any, amount?: number, address?: string) => {
    navigate(_navigate, {amount, address, chatbot: true});
  };

  useEffect(() => {
    if (isSubmit) {
      get(newMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

  return (
    <View style={styles.container}>
      <HeaderNewScreen name="ChatBot" />
      <FlatList
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          if (item.role === 'ChatBot') {
            return (
              <View style={styles.messageContainerChatBot}>
                <Text style={styles.messageText}>{item.message}</Text>
                {item.navigate && (
                  <TouchableOpacity
                    style={styles.clickAct}
                    onPress={() =>
                      Navigate(item.navigate, item.amount, item.address)
                    }>
                    <Text style={styles.textButtonAct}>Click Send</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          } else {
            return (
              <View style={styles.messageContainerUser}>
                <Text style={styles.messageText}>{item.message}</Text>
              </View>
            );
          }
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.color_tone_1,
  },
  messageContainerChatBot: {
    backgroundColor: R.colors.color_tone_5,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  messageContainerUser: {
    backgroundColor: R.colors.color_tone_7,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  inputStyle: {
    color: 'white',
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: R.colors.color_tone_6,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
  },
  clickAct: {
    marginTop: 8,
    backgroundColor: R.colors.color_tone_3,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: 180,
  },
  textButtonAct: {
    color: R.colors.color_tone_6,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
