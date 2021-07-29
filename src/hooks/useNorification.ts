import { Modal } from 'antd';

type IType ='info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm';

const useNotification = () => {
  const openNotification = (type:IType = 'info', title:string='', content:string = '') => {
    Modal[type]({
      title,
      content,
    });
  };

  return { openNotification };
};

export default useNotification;
