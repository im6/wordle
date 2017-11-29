
// create
var oneObservable = Rx.Observable.create(function subscribe(observer) {
  try {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
  } catch (err) {
    observer.error(err); // delivers an error if it caught one
  }
});


// Subscribing to Observables, analogous to function.call, using func as arguments
var subscription1 = oneObservable.subscribe(x => console.log(x));
var subscription2 = observable.subscribe(
  x => console.log('Observer got a next value: ' + x),
  err => console.error('Observer got an error: ' + err),
  () => console.log('Observer got a complete notification')
);


// another way to subscribe with observer, with json
var observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};
var subscription3 = oneObservable.subscribe(observer);


// unsubscribe
subscription.unsubscribe();
