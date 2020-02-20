/* eslint-disable no-native-reassign */
require = require('esm')(module);
const { createPages } = require('./gatsby/create-pages.js');
const { setFieldsOnGraphQLNodeType } = require('./gatsby/set-fields');

exports.createPages = createPages;
exports.setFieldsOnGraphQLNodeType = setFieldsOnGraphQLNodeType;
