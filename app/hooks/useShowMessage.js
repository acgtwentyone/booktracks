import {useToast} from 'native-base';

const useShowMessage = () => {
  const toast = useToast();

  const _showToastMsg = msg => {
    toast.show({
      title: msg,
      placement: 'top',
    });
  };

  return {_showToastMsg};
};

export default useShowMessage;
