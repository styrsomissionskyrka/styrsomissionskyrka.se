const { createRootWrapper, createPageWrapper } = require('./gatsby/wrap');

exports.wrapRootElement = createRootWrapper();
exports.wrapPageElement = createPageWrapper();
