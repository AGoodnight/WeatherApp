import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayView } from './features/weather/day-view/day-view.component';
import { CurrentConditionsResolver } from './features/weather/resolvers/current-conditions-resolver';

const routes: Routes = [
  {path:'',component:DayView,resolve:{
      currentConditions:CurrentConditionsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
