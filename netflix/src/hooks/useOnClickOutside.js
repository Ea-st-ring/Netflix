import React from 'react';
import { useEffect } from 'react';

const useOnClickOutside = (ref,handler) => { // handler는 setModalOpen(false)
    useEffect(
        () => {
        const listener = (event) => {
            if(!ref.current || ref.current.contains(event.target)){
            return;

            }
            handler(event);
        }
        document.addEventListener('mousedown',listener);
        document.addEventListener('touchstart',listener);
    return () => {
        document.addEventListener('mousedown',listener);
        document.addEventListener('touchstart',listener);
    }
    }, [ref,handler])
    
};

export default useOnClickOutside;