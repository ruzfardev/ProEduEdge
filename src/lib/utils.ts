import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export class LocalStorageManager {
  private static instance: LocalStorageManager;
  private storage: Storage;

  private constructor() {
    this.storage = window.localStorage;
  }

  static getInstance(): LocalStorageManager {
    if (!LocalStorageManager.instance) {
      LocalStorageManager.instance = new LocalStorageManager();
    }
    return LocalStorageManager.instance;
  }

  setItem(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  getItem(key: string) {
    const item = this.storage.getItem(key);
    if(!item) return '';
    return JSON.parse(item);
  }
  removeItem(key: string) {
    this.storage.removeItem(key);
  }
} 