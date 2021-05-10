import { Observable, Subscription } from 'rxjs';
import { KillZombies } from "./kill-zombies";


class mockClass extends KillZombies(){

}

describe('Kill Zombies Utility',()=>{
    
    let mock:mockClass;
    let obsCol:Observable<any>[] = [];
    let obKeys:string[] = []; 
    let subsCol:Subscription[] = [];
    let garbage:any[] = [];

    beforeEach(()=>{
        mock = new mockClass();
        obKeys = ['Dog','Cat','Chicken'];
        obsCol = obKeys.map((name)=>{
            return new Observable((obs)=>{
                obs.next(name);
                obs.complete();
            });
        });
        subsCol = obsCol.map((observable)=>{
            return observable.subscribe((name)=>{
                garbage.push(name);
            });
        });
    });

    afterEach(()=>{
        mock =  new mockClass();
        garbage = [];
        subsCol = [];
        obsCol = [];
        obKeys = [];
    });

    it('Should Destroy Subscriptions',()=>{
        for( let sub of subsCol ){
            mock.storeZombies.push(sub);
        }
        expect(mock.storeZombies.length).toBe(3);
        let _killedZombies = mock.killNow();
        expect(mock.storeZombies.length).toBe(0);
        expect(_killedZombies.length).toBe(3);
    });

    it('Should Destroy Subscriptions by Key',()=>{
        for( let sub in subsCol ){
            mock.storeZombieByKey(
                obKeys[sub],
                subsCol[sub]
            );
        }
        expect(mock.zombiesByKey.hasOwnProperty('Cat')).toBeTrue();
        expect(mock.zombiesByKey.hasOwnProperty('Dog')).toBeTrue();
        expect(mock.zombiesByKey.hasOwnProperty('Chicken')).toBeTrue();
        let _killedZombies = mock.killTheseZombies(
            ['Cat','Dog']
        );
        expect(mock.zombiesByKey['Cat']).toBeUndefined();
        expect(mock.zombiesByKey['Dog']).toBeUndefined();
        expect(mock.zombiesByKey['Chicken']).toBeDefined();
    })

})