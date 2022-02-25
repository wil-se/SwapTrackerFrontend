
import {toast} from 'react-toastify'

const useNotification = () => {

    const getNotification = (status,tierLabel) => {
        if(status && !tierLabel) {
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
        else if (status && tierLabel){
            toast.error(tierLabel, {
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
