import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn:'root'
})
export class NotificationService{

  public $toastMessages:BehaviorSubject<any> = new BehaviorSubject([]);
  get $ToastMessages(){
    return this.$toastMessages;
  }

  get CreateToast(){return this.createToast}
  get DismissToasts(){return this.dismissToasts}

  public lastIndex:number = 0;
  public messageTimers:any[] = [];

  constructor(
    public liveAnnouncer:LiveAnnouncer
  ){}

  createToast(configuration:any){

    let _configuration = Object.assign({},configuration);

    _configuration.ttl = configuration.ttl || 1;
    _configuration.delay = configuration.delay || 0;

    // place all observable timers into an array
    this.messageTimers.push(

      // Delay by configuration
      timer(_configuration.delay*1000)
      .pipe((take(1)))
      .subscribe((res)=>{
        this.$toastMessages.next([_configuration].concat(this.$toastMessages.getValue()));
        this.liveAnnouncer.announce('Attention, '+_configuration.title+' '+_configuration.message)

      // Lve for as long as configuration
        timer(_configuration.ttl*1000).pipe(take(1)).subscribe((res)=>{
          let _messages = this.$toastMessages.getValue();
          _messages.pop();
          this.$toastMessages.next(_messages);
        })
      })

    );
  }

  dismissToasts(){
    this.messageTimers.map((timer)=>{
      // kill all the observables still running
      timer.complete();
    })
    this.$toastMessages.next([])
  }
}
