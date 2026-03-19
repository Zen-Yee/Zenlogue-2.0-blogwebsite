export function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status || 500;  //"500 Internal Server Error" if no status caught.

  res.status(status).render('error.ejs', {
    status,
    message: err.message || "Something went wrong", 
  });
}