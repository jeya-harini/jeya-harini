import React, { useState } from 'react';
import './App.css';

function App() {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    // Handle number input
    const inputNumber = (num) => {
        if (waitingForOperand) {
            setDisplay(String(num));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? String(num) : display + num);
        }
    };

    // Handle decimal point
    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    // Handle operator
    const handleOperator = (op) => {
        if (operator !== null && !waitingForOperand) {
            calculate();
        }
        setPreviousValue(parseFloat(display));
        setOperator(op);
        setWaitingForOperand(true);
    };

    // Calculate result
    const calculate = () => {
        if (operator === null || previousValue === null) return;

        const currentValue = parseFloat(display);
        let result = 0;

        switch (operator) {
            case '+':
                result = previousValue + currentValue;
                break;
            case '-':
                result = previousValue - currentValue;
                break;
            case '*':
                result = previousValue * currentValue;
                break;
            case '/':
                if (currentValue === 0) {
                    setDisplay('Error');
                    resetCalculator();
                    return;
                }
                result = previousValue / currentValue;
                break;
            default:
                return;
        }

        setDisplay(String(result));
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
    };

    // Clear everything
    const clearAll = () => {
        resetCalculator();
        setDisplay('0');
    };

    // Reset calculator state
    const resetCalculator = () => {
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(false);
    };

    // Delete last character
    const deleteLast = () => {
        if (display.length === 1 || display === 'Error') {
            setDisplay('0');
        } else {
            setDisplay(display.slice(0, -1));
        }
    };

    return (
        <div className="calculator">
            <h1>React Calculator</h1>

            <div className="display">
                <div className="display-value">{display}</div>
            </div>

            <div className="buttons">
                {/* Row 1 */}
                <button onClick={clearAll} className="btn clear">AC</button>
                <button onClick={deleteLast} className="btn delete">DEL</button>
                <button onClick={() => handleOperator('/')} className="btn operator">÷</button>
                <button onClick={() => handleOperator('*')} className="btn operator">×</button>

                {/* Row 2 */}
                <button onClick={() => inputNumber(7)} className="btn number">7</button>
                <button onClick={() => inputNumber(8)} className="btn number">8</button>
                <button onClick={() => inputNumber(9)} className="btn number">9</button>
                <button onClick={() => handleOperator('-')} className="btn operator">-</button>

                {/* Row 3 */}
                <button onClick={() => inputNumber(4)} className="btn number">4</button>
                <button onClick={() => inputNumber(5)} className="btn number">5</button>
                <button onClick={() => inputNumber(6)} className="btn number">6</button>
                <button onClick={() => handleOperator('+')} className="btn operator">+</button>

                {/* Row 4 */}
                <button onClick={() => inputNumber(1)} className="btn number">1</button>
                <button onClick={() => inputNumber(2)} className="btn number">2</button>
                <button onClick={() => inputNumber(3)} className="btn number">3</button>
                <button onClick={calculate} className="btn equals">=</button>

                {/* Row 5 */}
                <button onClick={() => inputNumber(0)} className="btn number zero">0</button>
                <button onClick={inputDecimal} className="btn number">.</button>
            </div>
        </div>
    );
}

export default App;