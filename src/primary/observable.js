import {
  Observable,
} from 'rxjs';

const observable0 = new Observable(
  observer => {
    observer.next('A');
    observer.next('B');
    observer.next('B');
    setTimeout(function(){
      observer.next('D');
      observer.complete();
    }, 1000);
  }
);

observable0.subscribe({
  next: a => {
    console.log(a);
  },
  complete: () => {
    console.log('complete now');
  },
  error: err => console.error('Observer got an error: ' + err),
});