exports.validateRequestBody = (requiredFields, body) => {
  for (const field of requiredFields) {
    if (!body.hasOwnProperty(field)) {
      return { valid: false, missingField: field };
    }
  }
  return { valid: true };
};
