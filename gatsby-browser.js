import { createRootWrapper, createPageWrapper } from './gatsby/wrap';
import './src/styles/site.css';

export const wrapRootElement = createRootWrapper();
export const wrapPageElement = createPageWrapper();
