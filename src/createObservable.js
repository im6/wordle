
// create
var oneObservable = Rx.Observable.create(function subscribe(observer) {
  var id = setInterval(() => {
    observer.next('hi')
  }, 1000);
});


// Subscribing to Observables, analogous to function.call
oneObservable.subscribe(x => console.log(x));
// another way to subscribe
oneObservable.subscribe({
  next: x => console.log('got value ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
});
