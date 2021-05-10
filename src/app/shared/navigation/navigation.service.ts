import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationError } from '@angular/router';
import { pairwise, filter, take} from 'rxjs/operators';
import { Store,select } from '@ngrx/store';
import { Route } from '@angular/compiler/src/core';
import { RouteIsLoading } from './store/navigation.actions';

@Injectable({
  providedIn:'root'
})
export class NavigationService{

  public fullRoutes:Route[] = [];

  get Routes(){
    return this.fullRoutes;
  }

  constructor(
    public router:Router,
    public ngrxstore:Store
  ){
    this.fullRoutes = this.router.config;
    this.detectNavigation();
  }

  detectNavigation(){

    // Catch Refresh and Initial Page Landing
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

    // Catch Subsequent Navigation Start Events
    this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      pairwise()
    ).subscribe({
      next:($event:any)=>{
        this.ngrxstore.dispatch(RouteIsLoading(true));
        console.log('loading route');
      },
      error:(err)=>{}
    });

    // Catch First Navigation End Events
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      take(1)
    ).subscribe({
      next:($event:any)=>{
        this.ngrxstore.dispatch(RouteIsLoading(false));
        console.log('route loaded');
      },
      error:(err)=>{}
    });

    // Catch Subsequent Navigation End Events
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      pairwise())
    .subscribe({
      next:($event:any) => {
        this.ngrxstore.dispatch(RouteIsLoading(false));
        console.log('route loaded');
      },
      error:(err)=>{}
    });

    // Catch Errors
    this.router.events.pipe(
      filter(e => e instanceof NavigationError)
    ).subscribe({
      next:($event:any)=>{
        this.ngrxstore.dispatch(RouteIsLoading(false));
      },error:(err)=>{}
    });
  }

}
