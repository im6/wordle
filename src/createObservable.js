
// create
var oneObservable = Rx.Observable.create(function subscribe(observer) {
  var id = setInterval(() => {
    observer.next('hi')
  }, 1000);
});


// Subscribing to Observables, analogous to handler function and event
observable.subscribe(x => console.log(x));
