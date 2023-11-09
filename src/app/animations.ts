import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* => HomePage', slideTo('left')),
    transition('HomePage => *', slideTo('right')),
    transition('LoginPage <=> RegisterPage', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            left: 0,
            width: '100%',
            opacity: 0,
            transform: 'scale(0) translateY(100%)',
          }),
        ]),
        query(':enter', [
          animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
        ])
      ]),
  ]);

function slideTo(direction : string){
    const optional = { optional : true};
    return [
          query(':enter, :leave', [
            style({
              position: 'absolute',
              top: 90,
              [direction]: 0,
              width: '100%'
            })
          ], optional),
          query(':enter', [
            style({ [direction]: '-100%' })
          ]),
          query(':leave', animateChild()),
          group([
            query(':leave', [
              animate('300ms ease', style({ [direction]: '100%' }))
            ]),
            query(':enter', [
              animate('300ms ease', style({ [direction]: '0%' }))
            ]),
          ]),
        ]
}