/**
 * circuitBreaker is applied when we want to implement a time limit between two successive function calls.
 * here we shall implement circuitBreaker if a test function throws error for 3 times successively
 */

const circuitBreaker = (fn, callLimit, timeThreshold) => {
  let failCounter = 0;
  let lastFailureTimestamp;
  let shouldCircuitBreak = false;

  return function (...args) {
    if (shouldCircuitBreak) {
      const timeSinceLastFailure = Date.now() - lastFailureTimestamp;
      if (timeSinceLastFailure > timeThreshold) {
        shouldCircuitBreak = false;
      } else {
        console.error("Service Unavailable");
        return;
      }
    }

    try {
      const result = fn(...args);
      failCounter = 0;
      return result;
    } catch (error) {
      failCounter++;
      lastFailureTimestamp = Date.now();
      if (failCounter >= callLimit) {
        shouldCircuitBreak = true;
      }
      console.log(error);
    }
  };
};

const testFunction = () => {
  let counter = 0;

  return function () {
    counter++;
    if (counter < 4) {
      throw "Error";
    } else {
      return "Successfull";
    }
  };
};

const func = testFunction();
const cB = circuitBreaker(func, 3, 300);

cB();
cB();
cB();
cB();
cB();
setTimeout(() => {
  console.log(cB());
}, 500);
