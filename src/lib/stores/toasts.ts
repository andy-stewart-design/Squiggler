import { writable } from "svelte/store";
import type { Toast } from "../types/app";

export const toasts = writable<Toast[]>([]);

export const dismissToast = (id: string) => {
  toasts.update((all) => all.filter((t) => t.id !== id));
};

export const addToast = (toast: Toast) => {
  const id = crypto.randomUUID().split("-").pop();

  const defaults: Toast = {
    id,
    message: "Default message",
    type: "success",
    dismissible: true,
    timeout: 3000,
  };

  const newToast: Toast = { ...defaults, ...toast };

  toasts.update((all) => [newToast, ...all]);

  if (newToast.timeout) setTimeout(() => dismissToast(id), newToast.timeout);
};
