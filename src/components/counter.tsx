import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount, selectCounter } from '../state/main/counterSlice';

export function LoginBar() {
    const count = useSelector(selectCounter);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    return (
        <div>
            <div>
                <button aria-label="Increment value" onClick={() => dispatch(increment())}>
                    +
                </button>
                <span>{count}</span>
                <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                    -
                </button>
            </div>
            <div>
                <input
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                />
                <button onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}>
                    Add Amount
                </button>
            </div>
        </div>
    );
}
