import {useShowMessage} from '../hooks';

const useAlertError = () => {
  const {_showToastMsg} = useShowMessage();

  const _alertError = () => {
    _showToastMsg('Oppss... Something went wrong.');
  };

  return {_alertError};
};

export default useAlertError;
