var observable = Rx.Observable.create(function subscribe(observer) { console.log(1); });
var observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};
var subscription = observable.subscribe(observer); // powerful equaltion and execution
var subscription = observable.subscribe(x => console.log(x));
subscription.unsubscribe();


//A Subject is like an Observable, but can multicast to many Observers.
var subject = new Rx.Subject();

subject.subscribe({
  next: (v) => console.log('cast: observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('cast: observerB: ' + v)
});
