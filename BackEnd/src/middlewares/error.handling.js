const errorHandling = (err, req, res, next) => {
  return res.status(500).json({
    error: err.message,
  });
};

const succesHandling = (success, req, res, next) => {
  return res.status(200).json({
    succes: success.message,
  });
};

module.exports = {
  errorHandling,
  succesHandling,
};
