import { writable } from "svelte/store";

export const toasts = writable([]);

export const dismissToast = (id) => {
  toasts.update((all) => all.filter((t) => t.id !== id));
};

export const addToast = (toast) => {
  const id = crypto.randomUUID().split("-").pop();

  const defaults = {
    id,
    message: "Default message",
    type: "success",
    dismissible: true,
    timeout: 3000,
  };

  const newToast = { ...defaults, ...toast };

  toasts.update((all) => [newToast, ...all]);

  if (newToast.timeout) setTimeout(() => dismissToast(id), newToast.timeout);
};
