import {useColorModeValue} from 'native-base';

const useErrorColor = () => {
  const errorColor = useColorModeValue('red.500', 'white');
  return {errorColor};
};

export default useErrorColor;
