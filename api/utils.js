export function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.error(err);
      next(err)
    });
  };
}

export function catchAllErrors(err, req, res, next) {
  console.log("Error caught by middleware:")
  console.error(err);
  res.end()
}