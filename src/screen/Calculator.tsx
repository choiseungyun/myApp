import {Android} from '@mui/icons-material';
import {useState} from 'react';
import {Alert, Dimensions, Platform, TouchableOpacity, View} from 'react-native';

import {MD2Colors, Text} from 'react-native-paper';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import useCalculator from '../hooks/useCalculator';

const COLOR = {
  RESULT: '#4e4c51',
  RESET: '#5f5e62',
  OPERATOR: '#f39c29',
  NUM: '#5c5674',
};
const {height, width} = Dimensions.get('window');
var rowCount: number = 6;
{
  __DEV__ && (rowCount = 7);
}

const Button = ({text, onPress, flex, type, isSelected}: any) => {
  let backgroundColor = 'transparent';
  switch (type) {
    case 'reset':
      backgroundColor = COLOR.RESET;
      break;
    case 'operator':
      backgroundColor = COLOR.OPERATOR;
      break;
    case 'result':
      backgroundColor = COLOR.RESULT;
      break;
    case 'num':
      backgroundColor = COLOR.NUM;
      break;
    default:
      backgroundColor = 'transparent';
      break;
  }
  return (
    <TouchableOpacity
      style={{
        flex,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: isSelected ? 1 : 0.2,
        borderColor: MD2Colors.black,
        height: height / rowCount - 40,
      }}
      onPress={onPress}>
      <Text style={{color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>{text}</Text>
    </TouchableOpacity>
  );
};

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const InputContainer = styled.View`
  background-color: ${COLOR.RESULT};
  min-hieght: 50px;
  justify-content: center;
  align-items: flex-end;
  padding: 5px;
  width: 100%;
  height: ${Platform.select({
    ios: height / rowCount - 30,
    android: height / rowCount + 35,
  })}px;
`;

function Calculator() {
  const {input, result, currentOperator, tempInput, tempOperator, onPressNum, onPressOperator, onPressReset} = useCalculator();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          padding: 1,
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            //borderWidth: 5,
            //borderColor: MD2Colors.green300,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '400',
              height: 30,
              justifyContent: 'center',
              verticalAlign: 'middle',
            }}>
            계산기
          </Text>
          {__DEV__ && (
            <>
              <View style={{flex: 1}}>
                <Text>Input : {input}</Text>
                <Text>currentOperator : {currentOperator}</Text>
                <Text>result : {result}</Text>
                <Text>tempInput : {tempInput}</Text>
                <Text>tempOperator : {tempOperator}</Text>
              </View>
            </>
          )}

          <InputContainer>
            <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>{input}</Text>
          </InputContainer>
          <ButtonContainer>
            <Button type="reset" key={`btnAc`} text="AC" onPress={() => onPressReset()} flex={3} isSelected={currentOperator === 'C'} />
            <Button type="operator" key={`btnDiv`} text="/" onPress={() => onPressOperator('/')} flex={1} isSelected={currentOperator === '/'} />
          </ButtonContainer>

          <ButtonContainer>
            {[7, 8, 9].map(num => (
              <Button type="num" key={`btn${num}`} text={`${num}`} onPress={() => onPressNum(num)} flex={1} />
            ))}
            <Button type="operator" key={`btnMul`} text="*" onPress={() => onPressOperator('*')} flex={1} isSelected={currentOperator === '*'} />
          </ButtonContainer>

          <ButtonContainer>
            {[4, 5, 6].map(num => (
              <Button type="num" key={`btn${num}`} text={`${num}`} onPress={() => onPressNum(num)} flex={1} />
            ))}
            <Button type="operator" key={`btnMinus`} text="-" onPress={() => onPressOperator('-')} flex={1} isSelected={currentOperator === '-'} />
          </ButtonContainer>

          <ButtonContainer>
            {[1, 2, 3].map(num => (
              <Button type="num" key={`btn${num}`} text={`${num}`} onPress={() => onPressNum(num)} flex={1} />
            ))}
            <Button type="operator" key={`btnPlus`} text="+" onPress={() => onPressOperator('+')} flex={1} isSelected={currentOperator === '+'} />
          </ButtonContainer>

          <ButtonContainer>
            <Button type="num" key={`btn0`} text="0" onPress={() => onPressNum(0)} flex={3} />
            <Button type="operator" text="=" onPress={() => onPressOperator('=')} isSelected={currentOperator === '='} flex={1} />
          </ButtonContainer>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default Calculator;
