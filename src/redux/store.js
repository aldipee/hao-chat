import {createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import PromiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './reducers';

const config = {
  key: 'container',
  storage: AsyncStorage,
  whitelist: ['authData'],
};

const persistedReducer = persistReducer(config, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(logger, thunk),
);
export const persistor = persistStore(store);
