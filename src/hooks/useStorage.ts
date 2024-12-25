import { useSyncExternalStore } from "react";

export const useStorage = (key:string, value:any) => {
  // 订阅函数=》要求返回函数
  const subscribe = (callback: () => void) => {
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
  }

  const getSnapshot = () => {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string): value;
  }

  const setStorage = (storageValue:any) => {
    localStorage.setItem(key, JSON.stringify(storageValue));
    window.dispatchEvent(new StorageEvent('storage')); // 手动触发本地存储更新
  }

  const res = useSyncExternalStore(subscribe,getSnapshot);
  
  return [res, setStorage];
};