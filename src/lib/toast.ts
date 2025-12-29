import { toast } from "sonner";

/**
 * Global toast notification system
 * Toasts appear top-right, auto-dismiss after 3 seconds
 * Success = green accent, Error = red accent
 */

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: 3000,
    position: "top-right",
    className: "toast-success",
  });
};

export const showErrorToast = (message: string = "Something went wrong. Please try again.") => {
  toast.error(message, {
    duration: 3000,
    position: "top-right",
    className: "toast-error",
  });
};

export const showSaveSuccess = () => showSuccessToast("Changes saved successfully.");
export const showSendSuccess = () => showSuccessToast("Item sent successfully.");
export const showDeleteSuccess = () => showSuccessToast("Item deleted successfully.");
export const showCopySuccess = () => showSuccessToast("Copied to clipboard.");
