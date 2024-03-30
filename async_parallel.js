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
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
];

// here calling the function in an array is working

function asyncParallel(tasks, callback) {
  let error = [];
  let result = [];
  let completed = 0;

  tasks.forEach((task, index) =>
    task
      .then((resp) => {
        result.push(resp);
        console.log(resp, index);
      })
      .catch((err) => {
        error.push(err);
        console.log(err, index);
      })
      .finally(() => {
        completed++;

        if (completed >= tasks.length) {
          callback(error, result);
        }
      })
  );
}

asyncParallel(tasks, (error, result) => {
  console.error("error ->", error);
  console.log("result ->", result);
});
