import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import './styles/styles.scss';
import * as serviceWorker from './serviceWorker';
import 'normalize.css/normalize.css';

const store = configureStore();
store.dispatch (addExpense({description: 'gas bill', note:'this is the gas bill', amount:500}));
store.dispatch (addExpense({description: 'rent', note:'this is the rent', amount:100, createdAt:-1000}));
store.dispatch (addExpense({description: 'water bill', note:'this is the water bill', amount:43304}));
store.dispatch (setTextFilter(''));
console.log(store.getState());
const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

// Higher Order Component (a component (hoc) that renders another component)

const jsx = (
    <Provider store = {store}>
        <AppRouter />
    </Provider>
)
ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
