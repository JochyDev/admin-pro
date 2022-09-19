import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, retry, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  intervalSubs!: Subscription;

  constructor() {
    
    // this.retornaObseravable().pipe(
    //   retry(1)
    // ).subscribe({
    //   next:valor => console.log('Subs:', valor),
    //   error:err => console.warn('Error:', err),
    //   complete:()=> console.info('Subs terminada')
    // })

    this.intervalSubs = this.retornaIntervalo().subscribe(
      (valor) => console.log(valor)
    )

   }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {
  }


  retornaIntervalo(): Observable<number>{
    return interval(500)
              .pipe(
                // take(10),
                map( valor =>  valor + 1 ),
                filter(valor => (valor % 2 === 0) ? true : false ),
            
              );
  }

  retornaObseravable(): Observable<number> {

    let i = -1;

    return new Observable<number>( observer => {

      setInterval(() => {

        i++;
        observer.next(i);

        if(i === 4 ){
          observer.complete();
        }

        if(i === 2 ){
          observer.error('El valor llegó a 2');
        }


      }, 1000)

    })

  }

}
