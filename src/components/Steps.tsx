import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {HEIGHT, WIDTH, getFont} from '../utils/functions';

interface Props1 {
  title: string;
  disabled: boolean;
  line: boolean;
}

interface Props2 {
  currentStep: Number;
}

const StepComponent = ({title, disabled, line}: Props1) => {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.flexStepLine}>
        <View
          style={[
            styles.stepCircle,
            {backgroundColor: disabled ? 'gray' : 'white'},
          ]}>
          <Text style={styles.stepText}>{title}</Text>
        </View>
        {line && <View style={[styles.separator]} />}
      </View>
    </View>
  );
};

const Steps = ({currentStep}: Props2) => {
  return (
    <View style={styles.container}>
      <StepComponent title="Pin" disabled={currentStep !== 1} line={true} />
      <StepComponent title="NFC" disabled={currentStep !== 2} line={true} />
      <StepComponent title="Send" disabled={currentStep !== 3} line={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 4,
  },
  stepContainer: {
    alignItems: 'center',
  },
  flexStepLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  stepText: {
    color: 'gray',
    fontSize: getFont(13),
    fontWeight: 'bold',
  },
  separator: {
    height: HEIGHT(4),
    width: WIDTH(100),
    backgroundColor: 'gray',
  },
});

export default Steps;
