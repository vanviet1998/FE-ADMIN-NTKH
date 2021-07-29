import { utilities } from 'helper';
import { notification } from 'antd';

type IType = 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm';
 const useMessage = () => {
    const openMessage = (type: IType = "info", message: string = "", description?: string) => {
        const key = utilities.uidGenerator()
        notification[type]({
            key,
            message,
            description,
        });
    };

    return { openMessage };
};

export default useMessage