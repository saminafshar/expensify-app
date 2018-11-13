const incrementCount = ({incrementBy =1} = {}) => ({
    type:'INCREMENT',
    incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type:'DECREMENT',
    decrementBy
})

const resetCount = () => ({
    type:'RESET'
})

const setCount = ({count}) => ({
    type:'SET',
    count
})

const countReducer = (state = {count:0}, action) => {
    switch (action.type) {
        case 'INCREMENT': 
        return {
            count: state.count + action.incrementBy
        };

        case 'DECREMENT':
        return {
            count:state.count - action.decrementBy
        };

        case 'SET':
        return {
            count : action.count
        }

        case 'RESET':
        return {
            count:0
        }

        default: 
        return state;
    }
}

const store = createStore(countReducer);

store.subscribe (() => {
    console.log(store.getState());
})

store.dispatch (incrementCount({incrementBy:500}));
store.dispatch(decrementCount({decrementBy:300}));
store.dispatch(resetCount());
store.dispatch(setCount({count:111}));



// ADD_EXPENSE

const addExpense = ({ 
    description = '', 
    note = '', 
    amount=0, 
    createdAt = 0 
} = {}
) => ({
type:'ADD_EXPENSE',
expense : {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
}
})
// REMOVE_EXPENSE

const removeExpense = ({id} = {}) => ({
type: 'REMOVE_EXPENSE',
id
});
// EDIT_EXPENSE

const editExpense = (id, updates) => ({
type:'EDIT_EXPENSE',
id,
updates
});

// SET_TEXT_FILTER

const setTextFilter = (text='') => ({
type:'SET_TEXT_FILTER',
text : text,
});

// SORT_BY_DATE
// SORT_BY_AMOUNT

const sortByAmount = () => ({
type:'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
type:'SORT_BY_DATE'
});

// SET_START_DATE

const setStartDate = (startDate) => ({
type:'SET_START_DATE',
startDate
})

// SET_END_DATE

const setEndDate = (endDate) => ({
type:'SET_END_DATE',
endDate
})

const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
switch (action.type) {
    case 'ADD_EXPENSE': 
        return [
            ...state,
            action.expense
        ]
    case 'REMOVE_EXPENSE':
        return state.filter (({id}) => id !== action.id);
    case 'EDIT_EXPENSE':
        return state.map ((expense) =>{
            if (expense.id === action.id) {
                return {
                    ...expense,
                    ...action.updates
                }
            } else {
                return expense;
            }
        });
    default:
        return state;
}
};

const filtersReducerDefaultState = {
text:'',
sortBy: 'date',
startDate: undefined,
endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
switch(action.type) {
    case 'SET_TEXT_FILTER':
    return {
        ...state,
        text:action.text
    }
    case 'SORT_BY_AMOUNT':
    return {
        ...state,
        sortBy:'amount'
    }
    case 'SORT_BY_DATE':
    return {
        ...state,
        sortBy:'date'
    }
    case 'SET_START_DATE':
    return {
        ...state,
        startDate:action.startDate
    }
    case 'SET_END_DATE':
    return {
        ...state,
        endDate:action.endDate
    }
    default:
        return state;
}
}

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >=startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch
}).sort((a,b) => {
    if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1:-1;
    }
});
};

const store = createStore(
combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
})
);

store.subscribe (() => {
const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);
});

const ExpenseOne = store.dispatch(addExpense({description:'RENt', amount:100, createdAt: -2221000}));
const ExpenseTwo = store.dispatch(addExpense({description:'Coffee', amount:49999, createdAt:-1000}))
// store.dispatch(removeExpense({id:ExpenseOne.expense.id}));
// store.dispatch (editExpense(ExpenseTwo.expense.id, {amount: 500, description:'coffee-hot'}));
store.dispatch(sortByAmount());
// store.dispatch(setTextFilter('coffee'));
// store.dispatch(sortByDate());
//store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(100));


// const Demostate = {
//     expenses : [{
//         id: 'lfajsdflk',
//         description: 'Rent',
//         note: 'final rent',
//         amount: 50000,
//         createdAt: 0
//     }],
//     filters: {
//         text:'rent',
//         sortBy:'amount', //date or amount
//         startDate: undefined,
//         endDate: undefined
//     }
// }

