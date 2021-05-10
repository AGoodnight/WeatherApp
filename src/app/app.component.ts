import { Statement } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NavigationService } from './shared/navigation/navigation.service';
import { navigationStateSelector } from './shared/navigation/store/navigation.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  title = 'weatherApp';
  loadingRoute:boolean = false;

  constructor(
    public router:Router,
    public ngrxstore:Store<any>,
    public navigationService:NavigationService
  ){
    this.ngrxstore.select(navigationStateSelector).subscribe((state)=>{
      this.loadingRoute = state.route_is_loading
    })
  }
}
