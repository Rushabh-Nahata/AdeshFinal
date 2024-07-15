const theFunc = (req, res, next) => {
  Promise.resolve(next()).catch(next);
};

export default theFunc;
