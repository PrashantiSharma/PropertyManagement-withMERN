import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotification = () => <ToastContainer />;

export const showToast = (message) => {
    toast(message, { position: toast.POSITION.BOTTOM_RIGHT });
};

export default ToastNotification;
