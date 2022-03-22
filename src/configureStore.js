import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import logger from './middleware/logger';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = [logger, sagaMiddleware];

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

sagaMiddleware.run(rootSaga);

export default store;
