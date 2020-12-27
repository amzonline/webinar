// import { applyMiddleware, createStore, compose } from 'redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import rootReducer from './root-reducer';

const middlewares = [logger];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));
const store = createStore(rootReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

export { store, persistor };