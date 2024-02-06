import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

interface Props {
  name: string;
  width?: number;
  height?: number;
  colorButton?: string;
  colorText?: string;
  mt?: number | string;
  func: () => void;
  isDisabled?: boolean;
}

const Button = ({
  name,
  width = 150,
  height = 50,
  colorButton = '#D9D9D9',
  colorText = '#FFFFFF',
  mt,
  func,
  isDisabled,
}: Props) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={func}
      style={[
        styles.buttonContainer,
        {
          width,
          height,
          backgroundColor: isDisabled ? colorButton : '#ddb900',
          marginTop: mt,
        },
      ]}>
      <Text style={[styles.buttonText, {color: colorText}]}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Button;
