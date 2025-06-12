import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ title, description, variant = 'default', duration = 4000 }) => {
    const toastId = Math.random().toString(36).substr(2, 9);
    
    const toastOptions = {
      duration,
      id: toastId,
      style: {
        background: variant === 'destructive' ? '#ef4444' : '#ffffff',
        color: variant === 'destructive' ? '#ffffff' : '#000000',
        border: variant === 'destructive' ? '1px solid #dc2626' : '1px solid #e5e7eb',
      },
    };

    if (variant === 'destructive') {
      toast.error(`${title}${description ? `: ${description}` : ''}`, toastOptions);
    } else {
      toast.success(`${title}${description ? `: ${description}` : ''}`, toastOptions);
    }

    // Add to toasts array for tracking
    setToasts(prev => [...prev, { id: toastId, title, description, variant }]);

    // Remove from array after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastId));
    }, duration);

    return toastId;
  }, []);

  const dismissToast = useCallback((toastId) => {
    toast.dismiss(toastId);
    setToasts(prev => prev.filter(t => t.id !== toastId));
  }, []);

  const dismissAll = useCallback(() => {
    toast.dismiss();
    setToasts([]);
  }, []);

return {
toast: showToast,
dismiss: dismissToast,
dismissAll,
toasts,
};
};
// Additional toast helper functions
export const toast = {
success: (message, options = {}) => {
return toast.success(message, {
duration: 4000,
style: {
background: '#10b981',
color: '#ffffff',
},
...options,
});
},
error: (message, options = {}) => {
return toast.error(message, {
duration: 5000,
style: {
background: '#ef4444',
color: '#ffffff',
},
...options,
});
},
loading: (message, options = {}) => {
return toast.loading(message, {
style: {
background: '#3b82f6',
color: '#ffffff',
},
...options,
});
},
promise: (promise, messages, options = {}) => {
return toast.promise(promise, {
loading: messages.loading || 'Loading...',
success: messages.success || 'Success!',
error: messages.error || 'Error occurred',
}, options);
},
};
