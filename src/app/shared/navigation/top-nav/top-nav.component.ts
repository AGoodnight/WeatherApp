// Angular and Third Party
import { Component, Inject } from '@angular/core';
import * as _ from 'lodash';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'top-nav',
  templateUrl:'./top-nav.component.html'
})

export class TopNavComponent{
	constructor(
    public navigationService:NavigationService,
  ){}
}
