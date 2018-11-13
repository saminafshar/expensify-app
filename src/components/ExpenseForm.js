import React, {Component} from 'react';
import moment from 'moment';   
import {SingleDatePicker} from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class ExpenseForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : 0,
            note: props.expense ? props.expense.note : '',
            createdAt : props.expense ? moment(props.expense.createdAt): moment(),
            calendarFocused : false,
            error: ''
        }
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState (() => ({description}));
    } 
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState (() => ({note:note}));
    }
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}([\.\,]\d{0,2})?$/)) {
            this.setState (() => ({amount}));
        }
    }
    onDateChange = (createdAt) => {
        if(createdAt) {
            this.setState(() => ({createdAt}));
        }
    }
    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused:focused}))
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.description && !this.state.amount) {
            this.setState(() => ({error:'Please provide description and amount'}))
        } else {
            this.setState(() => ({error:''}))
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount,10) *100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    }
    render() {
        return (
            <div>
                <h1>ExpenseForm</h1>
                {this.state.error &&  <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Description" autoFocus value={this.state.description} onChange={this.onDescriptionChange}></input>
                    <input type="text" placeholder="Amount" value={this.state.amount} onChange={this.onAmountChange}></input>
                    <textarea placeholder="Add a note for your expense (optional)" value={this.state.note} onChange={this.onNoteChange}></textarea>
                    <SingleDatePicker
                        date={this.state.createdAt} // momentPropTypes.momentObj or null
                        onDateChange={this.onDateChange} // PropTypes.func.isRequired
                        focused={this.state.calendarFocused} // PropTypes.bool
                        onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
                        id="your_unique_id" // PropTypes.string.isRequired,
                        numberOfMonths={1}
                        isOutsideRange={() => false }
                        />
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}
export default ExpenseForm;