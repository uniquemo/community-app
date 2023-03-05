import { useEffect } from 'react';

const useMutationObserver = (ref: React.RefObject<HTMLElement>, callback: MutationCallback, options?: MutationObserverInit) => {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new MutationObserver(callback);
    observer.observe(ref.current, options);

    return () => {
      observer.disconnect();
    };
  }, [ref, callback, options]);
};

export default useMutationObserver;
