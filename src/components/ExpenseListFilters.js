import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from '../actions/filters';
import {DateRangePicker} from 'react-dates';

class ExpenseListFilters extends Component {
    state = {
        calenderFocused : null,
    }
    onDatesChange = ({startDate, endDate}) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    }
    onFocusChange = (calenderFocused) => {
        this.setState (() => ({calenderFocused}));
    }
    render () {
        return(
            <div>
        <input type='text' value={this.props.filters.text} onChange={(e) =>{
            this.props.dispatch(setTextFilter(e.target.value));
        }}>
        </input>
        <select 
        value={this.props.filters.sortBy} 
        onChange={(e) => {
            if(e.target.value==='date' ) {
                this.props.dispatch(sortByDate());
            } else {
                this.props.dispatch(sortByAmount());
            }
        }}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
        </select>
        <DateRangePicker
            startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
            focusedInput={this.state.calenderFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
            numberOfMonths={1}
            isOutsideRange={() => false}
            showClearDates={true}
        />
    </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

export default connect (mapStateToProps)(ExpenseListFilters);
