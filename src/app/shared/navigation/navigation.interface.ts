import { InjectionToken } from '@angular/core';

export const NAVIGATION_CONFIG = new InjectionToken<NavigationConfig>('NAVIGATION_CONFIG');

export interface NavigationConfigInterface {
  routes?:any;
}

export class NavigationConfig implements NavigationConfigInterface {
  public routes:any;
  
  constructor(config: NavigationConfigInterface) {
    let _this = this as any;
    let _config = config as Dictionary;
    for (let key in config) {
      _this[key] = _config[key];
    }
  }
}
