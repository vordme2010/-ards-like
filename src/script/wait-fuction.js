const wait = function (delay = 1000) {
    const promise = new Promise(function (resolve) {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  
    return promise;
}