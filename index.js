import 'react-native-gesture-handler'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import React from 'react'
import { AppRegistry, Text, View } from 'react-native';
import App from './src/container/App';
import { name as appName } from './app.json';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import rootReducer from "./src/reducers";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store)

const ProviderComponent = () => {
    return (
        <Provider store={store} >
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(ProviderComponent));
