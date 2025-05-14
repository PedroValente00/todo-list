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


// //used in vite src/App.jsx
// //from https://vite.dev/guide/build ("Load Error Handling" section)
// export function fixVercelBS() {
//   window.addEventListener('vite:preloadError', (event) => {
//     event.preventDefault()
//     console.log("Vite preload error. Reloading page...")
//     alert("fixVercelBS function ran")
//   window.location.reload() // for example, refresh the page
// })
// }