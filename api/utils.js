console.log("utils file loaded")

// const catchAsync = (fn) => {
export function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.error(err);
      next(err)
    //   res.status(500).json({ error: 'Internal Server Error' });
    });
  };
}

export function catchAllErrors(err, req, res, next) {
    console.log("error catcher middleware:")
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }