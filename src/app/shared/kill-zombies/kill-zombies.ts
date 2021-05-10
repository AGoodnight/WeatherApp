import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

type Constructor<T> = new (...args: any[]) => T;

export function KillZombies<T extends Constructor<{}>>(Base: T = (class {} as any)) {
  return class Mixin extends Base implements OnDestroy {
    public subscriptions: Subscription[] = [];
    public subscriptionsByKey: any = {};

    public get storeZombies(){
      return this.subscriptions;
    }

    public get zombiesByKey(){
      return this.subscriptionsByKey;
    }

    public storeZombieByKey(key:string,subscription:Subscription){
      this.subscriptionsByKey[key] = subscription
    }

    public killTheseZombies(keys:any[]){
      let _killedZombies:Subscription[] = [];
      keys.map((key)=>{
        if(this.subscriptionsByKey[key]){
          this.subscriptionsByKey[key].unsubscribe();
          _killedZombies.push(this.subscriptionsByKey[key]);
          delete this.subscriptionsByKey[key];
        }
      });
      return _killedZombies;
    }

    public killNow(){
      let _killedZombies:Subscription[] = [];
      this.subscriptions.forEach((x) => {
        x.unsubscribe();
        _killedZombies.push(x);
      });
      this.subscriptions.length = 0; // release memory
      if(this.subscriptionsByKey){
        Object.keys(this.subscriptionsByKey).map((key)=>{
          //console.log(this.subscriptionsByKey,key)
          this.subscriptionsByKey[key].unsubscribe();
        })
        this.subscriptionsByKey = {} // release memory
      }
      return _killedZombies;
    }

    public ngOnDestroy() {
      this.killNow();
    }
  };
}
