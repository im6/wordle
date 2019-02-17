//https://medium.com/@benlesh/hot-vs-cold-observables-f8094ed53339
//https://blog.angularindepth.com/rxjs-understanding-the-publish-and-share-operators-16ea2f446635
import {
  of,
  timer,
  fromEvent,
  interval,
} from 'rxjs';
import { share, take } from 'rxjs/operators';

console.log('1. hot vs cold observable');
// Whether or not an observable is capable of multicasting depends upon whether that observable is hot or cold.
/*
const numbers = timer(0, 500); // code observable can be multicasting
numbers.subscribe(x => console.log('cold sub1: ', x));
setTimeout(function(){
  numbers.subscribe(x => console.log('cold sub2: ', x));
}, 2000);
*/

const numbers_shared = timer(0, 500).pipe(take(9), share());
numbers_shared.subscribe(x => console.log('hot sub1: ', x));
setTimeout(function(){
  numbers_shared.subscribe(x => console.log('hot sub2: ', x));
}, 2000);