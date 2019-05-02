import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

const ExpenseListItem = ({id, description, amount, createdAt, note}) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>
            {amount/100},- EURO 
        </p>
        <p> 
            {moment(createdAt).format('DD, MMM, YYYY')}
        </p>
        <p>
        {note}
        </p>
    </div>
);


export default ExpenseListItem;