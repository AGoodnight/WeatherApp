import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { NotificationService } from '../notification.service';
import { TriggerToast, DismissToasts } from './notification.actions';


@Injectable()
export class NotificationEffects {

  constructor(
    public notificationService:NotificationService,
    public actions$: Actions,
    public ngrxstore:Store<any>) {}

  onTriggerToastAction$ = createEffect(() => this.actions$.pipe(
    ofType(TriggerToast),
    tap((action)=>{
      this.notificationService.CreateToast(action.payload)
    })
  ),{dispatch:false});

  onDismissToasts$ = createEffect(() => this.actions$.pipe(
    ofType(DismissToasts),
    tap((action)=>{
      this.notificationService.DismissToasts();
    })
  ),{dispatch:false});
}
