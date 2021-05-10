import { createAction } from '@ngrx/store';
import { NOTIFICATION_ACTION_CONSTANTS } from '../constants/notification.constants';

export const TriggerToast = createAction(
  NOTIFICATION_ACTION_CONSTANTS.TRIGGER_TOAST,
  (payload:ToastConfiguration) => ({payload})
);

export const DismissToasts = createAction(
   NOTIFICATION_ACTION_CONSTANTS.DISMISS_TOASTS
);
