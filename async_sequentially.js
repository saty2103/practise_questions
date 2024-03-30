function createAsyncTask() {
  const value = Math.floor(Math.random() * 10);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value < 5) {
        reject(`Error ${value}`);
      } else {
        resolve(value * 1000);
      }
    }, value * 1000);
  });
}

let tasks = [
  createAsyncTask,
  createAsyncTask,
  createAsyncTask,
  createAsyncTask,
  createAsyncTask,
];

// here calling the function in array (as in parallel) isn't working

async function asyncSequence(tasks, callback) {
  let results = [];
  let errors = [];

  for (let task of tasks) {
    try {
      let promise = await task();
      results.push(promise);
    } catch (e) {
      errors.push(e);
    }
  }

  callback(errors, results);
}

asyncSequence(tasks, (error, result) => {
  console.error("error ->", error);
  console.log("result ->", result);
});
