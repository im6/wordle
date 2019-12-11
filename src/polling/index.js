import { timer, from } from "rxjs";
import { map } from "rxjs/operators";

const promise = new Promise(function(cb) {
  setTimeout(function() {
    cb("test");
  }, 3000);
});
promise.then(function(a) {});

timer(0, 500)
  .pipe(
    from(promise).pipe(
      map(a => {
        debugger;
        return a;
      })
    )
  )
  .subscribe(a => {
    console.log(a);
  });
