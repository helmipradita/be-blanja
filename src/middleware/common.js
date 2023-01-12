const response = (res, statusCode, status, result, message, pagination) => {
  const printResult = {};
  printResult.success = status;
  printResult.statusCode = statusCode;
  printResult.data = result || null;
  printResult.message = message || null;
  if (pagination) printResult.pagination = pagination;
  res.status(statusCode).json(printResult);
};

module.exports = { response };
