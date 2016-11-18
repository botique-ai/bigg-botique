export function promisify(fn: (done: (err, res) => any) => any) {
  return new Promise((resolve, reject) => {
    fn((err, res) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    })
  })
}