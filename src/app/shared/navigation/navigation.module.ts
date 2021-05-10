import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NavigationService } from './navigation.service';

@NgModule({
    declarations:[],
    imports:[
        CommonModule,
        BrowserModule
    ],
    providers:[
        NavigationService
    ],
    exports:[]
})
export class NavigationModule {
    static forRoot(): ModuleWithProviders<NavigationModule> {
      return {
        ngModule: NavigationModule,
        providers: [ NavigationService ]
      };
    }
  }
  