const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  //init promise status
  status = PENDING;
  //init success value that will pass to resolve function
  value = null;
  //init reject reason that will pass to reject function
  reason = null;
  onFulfilledFns = [];
  onRejectedFns = [];
  constructor(executor) {
    //pass a function that will be called when new a promise
    executor(this.resolve, this.reject);
  }

  //when success,call resolve fn
  resolve = (value) => {
    if (this.status === PENDING) {
      //change status of promise to fulfilled
      this.status = FULFILLED;
      this.value = value;
      while(this.onFulfilledFns.length){
        this.onFulfilledFns.shift()(value)
      }
    }
  };
  reject = (reason) => {
    if (this.status === PENDING) {
      //change status of promise to rejected
      this.status = REJECTED;
      this.reason = reason;
      while(this.onRejectedFns.length){
        this.onRejectedFns.shift()(reason)
      }
    }
  };

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    } else if (this.status === REJECTED) {
      onRejected(this.reason);
    } else if (this.status === PENDING) {
      this.onFulfilledFns.push(onFulfilled);
      this.onRejectedFns.push(onRejected);
    }
  }
}
