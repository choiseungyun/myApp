import {useState} from 'react';

const useCalculator = () => {
  const [input, setInput] = useState(0);
  const [result, setResult] = useState(0);
  const [currentOperator, setCurrentOperator] = useState('');
  const [tempInput, setTempInput] = useState(0);
  const [tempOperator, setTempOperator] = useState('');
  const [isClickOperator, setIsClickOperator] = useState(false);
  const onPressNum = (num: number) => {
    if (currentOperator && isClickOperator) {
      setResult(input);
      //var newInput = Number(`${num}`);
      setInput(Number(`${num}`));
      setIsClickOperator(!isClickOperator);
    } else {
      var newInput = Number(`${input}${num}`);
      setInput(newInput);
    }
    //Alert.alert('OnPress {num}');
  };

  const onPressOperator = (operator: string) => {
    if (operator !== '=') {
      setCurrentOperator(operator);
      setIsClickOperator(true);
    } else {
      let finalResult = result;
      //Alert.alert(operator);
      switch (currentOperator) {
        case '*':
          finalResult = result * input;
          break;
        case '/':
          finalResult = result / input;
          break;
        case '+':
          finalResult = result + input;
          break;
        case '-':
          finalResult = result - input;
          break;
        default:
          break;
      }
      //   Alert.alert(finalResult.toString());
      setResult(finalResult);
      setInput(finalResult);
    }
  };

  const onPressReset = () => {
    setInput(0);
    setCurrentOperator('');
    setTempInput(0);
    setResult(0);
    setTempOperator('');
  };

  return {
    input,
    result,
    currentOperator,
    tempInput,
    tempOperator,
    onPressNum,
    onPressOperator,
    onPressReset,
  };
};

export default useCalculator;
