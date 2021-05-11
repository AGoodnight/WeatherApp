# Navigation Module

## Navigation Service
The Navigation service is used to controll aspects of navigation that are app wide and outside the scope of individual feature/components.

### Handling Route Changes
The navigation service taps into the Router's lifecycle to execute an action that stores a 'loading' state that can be subscribed to by anything in the main app. This is useful as it allows us to change a layout when a route is in a state where it may be executing an API call that will 'change' the applications layout.

For example routes with resolvers may take more time to load, so we tie some loader markup to the below app template to indicate a page is loading. Below is an example.

in our navigation service we listen to the router:
```typescript
...
this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      take(1)
    ).subscribe({
      next:($event:any)=>{
        this.ngrxstore.dispatch(RouteIsLoading(true));
        console.log('loading route');
      },
      error:(err)=>{}
    });
...
```

in our app component we subscribe to the state associated with the action executed by the navigation service:
```typescript
...
let navigationSub = this.ngrxstore.select(navigationStateSelector).subscribe((state)=>{
    this.route_is_loading = state.route_is_loading
})
...
```

in our app template we tie the value of the respective component variable to the markup we wish to alter:
```html
<div *ngIf='route_is_loading' class='spinner-curtain route-loader'>
    <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    </div>
</div>
<top-nav>
    ...   
</top-nav>
<router-outlet></router-outlet>
<toasts></toasts>
```

### Modularizing the Top Navigation
The intent of keeping the top nav in this module is to simply seperate responsibility, the app module can become overly complex when handling navigation templates and components, this is an attempt to keep the app module cleaner.