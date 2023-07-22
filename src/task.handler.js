const processTask = async (request) => {
  return {
    statusCode: 200,
    Headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Task done! '})
  }
};

export { processTask };
