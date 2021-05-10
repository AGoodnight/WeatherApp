import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { ToastComponent } from './toasts/toast.component';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification.service';
import { A11yModule } from '@angular/cdk/a11y';
import { EffectsModule } from '@ngrx/effects';
import { NotificationEffects } from './store/notification.effects';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    A11yModule,
    EffectsModule.forFeature([
      NotificationEffects
    ])
  ],
  providers:[
    NotificationService
  ],
  declarations: [
    ToastComponent,
  ],
  entryComponents: [],
  exports:[
    ToastComponent,
  ]
})
export class NotificationModule {
  static forRoot(): ModuleWithProviders<NotificationModule> {
    return {
      ngModule: NotificationModule,
      providers: [ NotificationService ]
    };
  }
}
