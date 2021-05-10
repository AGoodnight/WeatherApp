import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NavigationService } from './navigation.service';
import { TopNavComponent } from './top-nav/top-nav.component';
import { NAVIGATION_CONFIG } from './navigation.interface';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations:[
      TopNavComponent
    ],
    imports:[
        CommonModule,
        BrowserModule,
        RouterModule
    ],
    providers:[
        NavigationService
    ],
    exports:[
      TopNavComponent
    ]
})
export class NavigationModule {
    static forRoot(): ModuleWithProviders<NavigationModule> {
      return {
        ngModule: NavigationModule,
        providers: [ NavigationService ]
      };
    }
  }
  