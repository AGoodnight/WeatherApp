import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { NotificationService } from '../notification.service';
import { concatMap } from 'rxjs/operators';

import { NOTIFICATION_ANIMATIONS } from '../constants/animations.constants';

@Component({
  selector:'toasts',
  templateUrl:'./toast.component.html',
  animations:NOTIFICATION_ANIMATIONS
})
export class ToastComponent{

  public messages:Observable<any>;

  constructor(
    public notificationService:NotificationService
  ){
    this.messages = this.notificationService.$ToastMessages.pipe(concatMap((res) => {
      return of(res);
    }));
    this.messages.subscribe((res)=>{
    })
  }
}
