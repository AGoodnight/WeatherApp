import {
  transition,
  trigger,
  style,
  animate,
} from '@angular/animations';

export const NOTIFICATION_ANIMATIONS = [
  trigger('pop', [
    transition(':enter', [
      style({transform: 'scale(0.9)'}),
      animate('0.4s', style({transform: 'scale(1)',easing:'cubic-bezier(0.19, 1, 0.22, 1)'}))
    ]),
    transition(':leave', [
      style({transform: 'scale(1)'}),
      animate('0.1s', style({transform: 'scale(0.9)'}))
    ])
  ]),
  trigger('fade', [
    transition(':enter', [
      style({opacity: '0'}),
      animate('0.4s', style({opacity: '1',easing:'cubic-bezier(0.25, 0.46, 0.45, 0.94)'}))
    ]),
    transition(':leave', [
      style({opacity: '1'}),
      animate('0.1s', style({opacity: '0'}))
    ])
  ]),
];
