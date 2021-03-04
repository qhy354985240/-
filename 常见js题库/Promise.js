class Promise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.resolveCallback = [];
    let resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.resolveCallback.forEach((fn) => fn());
      }
    };
    let rejected = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
      }
    };
    try {
      executor(resolve, rejected);
    } catch (err) {
      rejected(err);
    }
  }

  then(onFulfilled, onRejected) {
    // 状态为fulfilled，执行onFulfilled，传入成功的值
    let promise2 = new Promise((resolve, rejected) => {
      if (this.state === 'fulfilled') {
        let val = onFulfilled(this.value);
        resolvePromise(resolve, rejected, val);
      }
      // 状态为rejected，执行onRejected，传入失败的原因
      if (this.state === 'rejected') {
        let val = onRejected(this.reason);
        resolvePromise(resolve, rejected, val);
      }
      if (this.state === 'pending') {
        this.resolveCallback.push(() => {
          let val = onFulfilled(this.value);
          resolvePromise(resolve, rejected, val);
        });
      }
    });
    return promise2;
  }

  resolvePromise(resolve, rejected, val) {
    let called;
    if (x !== null && (typeof val === 'function' || typeof val === 'object')) {
      try {
        let then = val.then;
        if (typeof then === 'function') {
          then.call(
            val,
            (res) => {
              if (called) return;
              called = true;
              resolve(val);
            },
            (err) => {}
          );
        }
      } catch {}
    } else {
      return resolve(val);
    }
  }
}

let a = new Promise((resolve, rejected) => {
  setTimeout(function () {
    resolve(1234567);
  }, 0);
});
console.log(a);
a.then(
  (res) => {
    console.log(res);
  },
  (err) => {}
);
a.then(
  (res) => {
    console.log(res, '111');
  },
  (err) => {}
);
