# rxjs playground(quickstart)

[ref1](https://medium.com/@luukgruijs/understanding-rxjs-subjects-339428a1815b)
[ref2](https://medium.com/@luukgruijs/understanding-rxjs-behaviorsubject-replaysubject-and-asyncsubject-8cc061f1cfc0)

## Create Observable

```js
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
```

## Subscribe to observable

Subscribing to Observables, analogous to "call" to function, using func as arguments

```js
var subscription1 = oneObservable.subscribe(x => console.log(x));
var subscription2 = observable.subscribe(
  x => console.log('Observer got a next value: ' + x),
  err => console.error('Observer got an error: ' + err),
  () => console.log('Observer got a complete notification')
);
```

another way to subscribe with observer, with json

```js
var observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};
var subscription3 = oneObservable.subscribe(observer);
```

```js
var observable = Rx.Observable.create(function subscribe(observer) { console.log(1); });
var observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};
var subscription = observable.subscribe(observer); // powerful equaltion and execution
var subscription = observable.subscribe(x => console.log(x));
subscription.unsubscribe();
```

1. A Subject is like an Observable, but can multicast to many Observers.
2. Multicasting basically means that one Observable execution is shared among multiple subscribers.
3. Subjects are used for multicasting Observables

```js
var subject = new Rx.Subject();
subject.subscribe({
  next: (v) => console.log('cast: observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('cast: observerB: ' + v)
});
```

## Unsubscribe

```js
subscription.unsubscribe();
```