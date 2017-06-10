exports.validateRequiredProperties = (properties = {}) => {
  let errors = [];
  Object.keys(properties).map(property => {
    if (!property) {
      errors.push({ message: `${property} is required.` });
    }
  });
  return errors;
};
