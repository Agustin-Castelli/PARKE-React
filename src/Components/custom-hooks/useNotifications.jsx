import { useState } from 'react';  

const useNotifications = () => {  
    const [notification, setNotification] = useState(null);  

    const showNotification = (message, type = 'info') => {  
        setNotification({ message, type });  
        setTimeout(() => {  
            setNotification(null); // Ocultar la notificación después de 3 segundos  
        }, 3000);  
    };  

    return {  
        notification,  
        showNotification,  
    };  
};  

export default useNotifications;  