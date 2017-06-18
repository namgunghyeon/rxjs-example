import Rx from 'rxjs';

const arraySource = Rx.Observable.from([1,2,3,4,5]);
//output: 1,2,3,4,5
const subscribe = arraySource.subscribe(val => console.log(val));

const promiseSource = Rx.Observable.from(new Promise(resolve => resolve('Hello World!')));
//output: 'Hello World'
const subscribe2 = promiseSource.subscribe(val => console.log(val));

const source = Rx.Observable.interval(1000);
//output: 0,1,2,3,4,5....
const subscribe3 = source.subscribe(val => console.log(val));


const hello = Rx.Observable.create(function(observer) {
  observer.next('Hello');
  observer.next('World');
});

//output: 'Hello'...'World'
const subscribe4 = hello.subscribe(val => console.log(val));

/*
  Increment value every 1s, emit even numbers.
*/
const evenNumbers = Rx.Observable.create(function(observer) {
  let value = 0;
  const interval = setInterval(() => {
    if(value % 2 === 0){
      observer.next(value);
    }
    value++;
  }, 1000);

  return () => clearInterval(interval);
});
//output: 0...2...4...6...8
const subscribe5 = evenNumbers.subscribe(val => console.log(val));
//unsubscribe after 10 seconds
setTimeout(() => {
  subscribe5.unsubscribe();
}, 10000);


//Create observable that immediately completes
const example = Rx.Observable.empty();
//output: 'Complete!'
const subscribe6 = example.subscribe({
  next: () => console.log('Next'),
  complete: () => console.log('Complete!')
});
