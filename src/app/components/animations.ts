import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const TOGGGLE = trigger('toggle', [
  transition(':enter', [
    style({ height: 0, opacity: 0 }),
    query('.daily-item', [style({ translate: '0 -100%' })]),
    group([
      animate('1s ease-in', style({ height: '*', opacity: 1 })),
      query('.daily-item', [
        animate('1s ease-in', style({ translate: '0 0' })),
      ]),
    ]),
  ]),
  transition(':leave', [
    style({ height: '*', opacity: 1 }),
    query('.daily-item', [style({ translate: '0 0' })]),
    group([
      animate('1s ease-in', style({ height: 0, opacity: 0 })),
      query('.daily-item', [
        animate('1s ease-in', style({ translate: '0 -100%' })),
      ]),
    ]),
  ]),
]);
