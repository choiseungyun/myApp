import {Android} from '@mui/icons-material';
import {useState} from 'react';
import {Dimensions, Platform, TouchableOpacity, View} from 'react-native';

import {MD2Colors, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const COLOR = {
  RESULT: '#4e4c51',
  RESET: '#5f5e62',
  OPERATOR: '#f39c29',
  NUM: '#5c5674',
};
const {height, width} = Dimensions.get('window');
const Button = ({text, onPress, flex, type}: any) => {
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
        borderWidth: 0.2,
        borderColor: MD2Colors.black,
        height: height / 6 - 40,
      }}>
      <Text style={{color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>
        {text}
      </Text>
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
    ios: height / 6 - 30,
    android: height / 6 + 35,
  })}px;
`;

function Calculator() {
  const [input, setInput] = useState(0);
  const [result, setResult] = useState(null);
  const [currentOperator, setCurrentOperator] = useState(null);
  const [tempInput, setTempInput] = useState(null);
  const [tempOperator, setTempOperator] = useState(null);

  const onPressNum = (num: number) => {
    setInput(num);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 5,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          flex: 1,
          width: '95%',
          borderWidth: 10,
          borderColor: MD2Colors.green300,
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
        <InputContainer>
          <Text>{input}</Text>
        </InputContainer>
        <ButtonContainer>
          <Button
            type="reset"
            key={`btnAc`}
            text="AC"
            onPress={() => null}
            flex={3}
          />
          <Button
            type="operator"
            key={`btnDiv`}
            text="/"
            onPress={() => null}
            flex={1}
          />
        </ButtonContainer>

        <ButtonContainer>
          {[7, 8, 9].map(num => (
            <Button
              type="num"
              key={`btn${num}`}
              text={`${num}`}
              onPress={() => null}
              flex={1}
            />
          ))}
          <Button
            type="operator"
            key={`btnMul`}
            text="X"
            onPress={() => null}
            flex={1}
          />
        </ButtonContainer>

        <ButtonContainer>
          {[4, 5, 6].map(num => (
            <Button
              type="num"
              key={`btn${num}`}
              text={`${num}`}
              onPress={() => null}
              flex={1}
            />
          ))}
          <Button
            type="operator"
            key={`btnMinus`}
            text="-"
            onPress={() => null}
            flex={1}
          />
        </ButtonContainer>

        <ButtonContainer>
          {[1, 2, 3].map(num => (
            <Button
              type="num"
              key={`btn${num}`}
              text={`${num}`}
              onPress={() => null}
              flex={1}
            />
          ))}
          <Button
            type="operator"
            key={`btnPlus`}
            text="+"
            onPress={() => null}
            flex={1}
          />
        </ButtonContainer>

        <ButtonContainer>
          <Button
            type="num"
            key={`btn0`}
            text="0"
            onPress={() => null}
            flex={3}
          />
          <Button type="operator" text="=" onPress={() => null} flex={1} />
        </ButtonContainer>
      </View>
    </SafeAreaView>
  );
}

export default Calculator;
