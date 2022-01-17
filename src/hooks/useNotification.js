
import {toast} from 'react-toastify'

const useNotification = () => {

    const getNotification = (status) => {
        if(status) {
            toast.success('Transaction completed!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        else {
            toast.error('Transaction not completed!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }

    return {getNotification}
    
}

export default useNotification
