# Kill Zombies
## Dear Subscriptions, just die already.
Using observables and thier decendants are wonderful to handle the coordination of asynchrouns events in an application, but we need to ensure 100% that they die when told to die because they can eat up resources if left unchecked.

Kill Zombies is a mixin ( named in a way to be memorable ) that is executed whenever a component is destroyed by Angular's lifecycle. It's entire purpose is to be given subscription instances to kill off at the moment of component destruction.

### StoreZombies

You can tell the mixin what subscriptions need to be killed by simply passing them to any of these following methods:

<b>StoreZombies</b>
You can simply push an array of observables to the mixin if your not concerend with accessing the sibscription before the mixin triggers on component destruction.
```javascript
...
let sub1 = anObservable.subscribe((result)=>{doSomething()});
let sub2 = anObservable.subscribe((result)=>{doSomething()});
let sub3 = anObservable.subscribe((result)=>{doSomething()});
let sub4 = anObservable.subscribe((result)=>{doSomething()});
let sub5 = anObservable.subscribe((result)=>{doSomething()});

this.storeZombies.push(sub1,sub2,sub3,sub4,sub5);
// or
this.storeZombies.push.apply(this,[sub1,sub2,sub3,sub4,sub5]);
...
```

<b>StoreZombieByKey</b>
You can store a subscription with a key so that you can leverage the killZombies mixin's abilities in any operation outside of of it's default component destruction scope.
```javascript
...
let subscriptionInstance = anObservable.subscribe((result)=>{doSomething()});

this.storeZombiesByKey("key",subscriptionInstance);
...
```

### Kill Zombies
You can kill all zombies/subscriptions at anytime.
```javascript
...
this.killNow();
...
```
You can kill specific zombies/subscriptions at anytime.
```javascript
...
this.killTheseZombies(['sub1','sub2']);
...
```
