// Inputs
// inputs: An array of inputs.
// limit: The maximum number of operations at any one time.
// iterateeFn: The async function that should be called with each input to generate the corresponding output. It will have two arguments:
//      input: The input being processed.
//      callback: A function that will be called when the input is finished processing. It will be provided one argument, the processed output.
// callback: A function that should be called with the array of outputs once all the inputs have been processed.

// [1, 2, 3, 4, 5]
// [[1, 2], [3, 4], [5]]
// inputs in a single batch can be processed concurrently / parallely -> async in parallel
// each batch will be processed sequentially -> async in sequence

function createBatch(input, limit) {
  let batchInput = [];
  for (let i = 0; i < input.length; i += limit) {
    let batch = input.slice(i, i + limit);
    batchInput.push(batch);
  }
  return batchInput;
}

function getNameById(id, callback) {
  setTimeout(() => {
    callback(`User id : ${id}`);
  }, id * 2000);
}

const parallelExec = (input, iterFunc) => {
  return new Promise((resolve, reject) => {
    let temp = [];
    input.forEach((element) => {
      console.log(`${element} ka execution start ho gaya`);
      iterFunc(element, (result) => {
        temp.push(result);

        console.log(`${element} ka execution khatam ho gaya`);
        if (temp.length === input.length) {
          resolve(temp);
          console.log("resolve wale block me hun");
        }
      });
    });
  });
};

async function mapLimit(input, limit, itrFunc, callback) {
  console.log("started");
  let batchInput = createBatch(input, limit);
  let result = [];

  for (let batch of batchInput) {
    console.log("batch -->", batch);
    let res = await parallelExec(batch, itrFunc);
    console.log(`${batch} ka response mil gaya`);
    result.push(...res);
  }

  callback(result);
}

mapLimit([1, 2, 3, 4, 5], 2, getNameById, (allResult) => {
  console.log("result ->", allResult);
});
