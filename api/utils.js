//used in api async routes
export function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.error(err);
      next(err)
    });
  };
}

//used in api index file as error middleware function
export function catchAllErrors(err, req, res, next) {
  console.log("Error caught by middleware:")
  console.error(err);
  res.end()
}