import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [memory, setMemory] = useState(0);

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

    // Clear everything
    const clearAll = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
    };

    // Clear last entry
    const clearEntry = () => {
        setDisplay('0');
    };

    // Delete last character
    const deleteLast = () => {
        if (display.length === 1) {
            setDisplay('0');
        } else {
            setDisplay(display.slice(0, -1));
        }
    };

    // Handle operations
    const performOperation = (nextOperation) => {
        const inputValue = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operation) {
            const result = calculate(previousValue, inputValue, operation);
            setDisplay(String(result));
            setPreviousValue(result);
        }

        setWaitingForOperand(true);
        setOperation(nextOperation);
    };

    // Calculate function
    const calculate = (first, second, op) => {
        switch (op) {
            case '+': return first + second;
            case '-': return first - second;
            case '×': return first * second;
            case '÷':
                if (second === 0) return 'Error';
                return first / second;
            case '%': return first % second;
            default: return second;
        }
    };

    // Get result
    const getResult = () => {
        if (operation && !waitingForOperand) {
            const inputValue = parseFloat(display);
            const result = calculate(previousValue, inputValue, operation);
            setDisplay(String(result));
            setPreviousValue(null);
            setOperation(null);
            setWaitingForOperand(true);
        }
    };

    // Toggle sign (+/-)
    const toggleSign = () => {
        const newValue = parseFloat(display) * -1;
        setDisplay(String(newValue));
    };

    // Percentage
    const percentage = () => {
        const newValue = parseFloat(display) / 100;
        setDisplay(String(newValue));
    };

    // Square root
    const squareRoot = () => {
        const value = parseFloat(display);
        if (value < 0) {
            setDisplay('Error');
        } else {
            setDisplay(String(Math.sqrt(value)));
        }
    };

    // Square
    const square = () => {
        const value = parseFloat(display);
        setDisplay(String(Math.pow(value, 2)));
    };

    // Reciprocal (1/x)
    const reciprocal = () => {
        const value = parseFloat(display);
        if (value === 0) {
            setDisplay('Error');
        } else {
            setDisplay(String(1 / value));
        }
    };

    // Memory functions
    const memoryAdd = () => {
        setMemory(memory + parseFloat(display));
    };

    const memorySubtract = () => {
        setMemory(memory - parseFloat(display));
    };

    const memoryRecall = () => {
        setDisplay(String(memory));
        setWaitingForOperand(true);
    };

    const memoryClear = () => {
        setMemory(0);
    };

    // Keyboard support
    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key;

            if (/[0-9]/.test(key)) {
                inputNumber(parseInt(key));
            } else if (key === '.') {
                inputDecimal();
            } else if (key === '+' || key === '-') {
                performOperation(key);
            } else if (key === '*') {
                performOperation('×');
            } else if (key === '/') {
                performOperation('÷');
            } else if (key === 'Enter' || key === '=') {
                getResult();
            } else if (key === 'Escape') {
                clearAll();
            } else if (key === 'Backspace') {
                deleteLast();
            } else if (key === '%') {
                percentage();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [display, previousValue, operation, waitingForOperand]);

    return (
        <div className="calculator">
            <div className="calculator-header">
                <h1>Calculator</h1>
                <div className="memory-indicator">
                    {memory !== 0 && <span>M</span>}
                </div>
            </div>

            <div className="calculator-display">
                <div className="display-operation">
                    {previousValue} {operation}
                </div>
                <div className="display-value">{display}</div>
            </div>

            <div className="calculator-buttons">
                {/* Row 1: Memory and Clear */}
                <button onClick={memoryClear} className="btn memory">MC</button>
                <button onClick={memoryAdd} className="btn memory">M+</button>
                <button onClick={memorySubtract} className="btn memory">M-</button>
                <button onClick={memoryRecall} className="btn memory">MR</button>

                {/* Row 2: Functions */}
                <button onClick={clearAll} className="btn function">AC</button>
                <button onClick={clearEntry} className="btn function">CE</button>
                <button onClick={deleteLast} className="btn function">⌫</button>
                <button onClick={() => performOperation('÷')} className="btn operator">÷</button>

                {/* Row 3 */}
                <button onClick={squareRoot} className="btn function">√</button>
                <button onClick={square} className="btn function">x²</button>
                <button onClick={reciprocal} className="btn function">1/x</button>
                <button onClick={() => performOperation('×')} className="btn operator">×</button>

                {/* Row 4 */}
                <button onClick={() => inputNumber(7)} className="btn number">7</button>
                <button onClick={() => inputNumber(8)} className="btn number">8</button>
                <button onClick={() => inputNumber(9)} className="btn number">9</button>
                <button onClick={() => performOperation('-')} className="btn operator">-</button>

                {/* Row 5 */}
                <button onClick={() => inputNumber(4)} className="btn number">4</button>
                <button onClick={() => inputNumber(5)} className="btn number">5</button>
                <button onClick={() => inputNumber(6)} className="btn number">6</button>
                <button onClick={() => performOperation('+')} className="btn operator">+</button>

                {/* Row 6 */}
                <button onClick={() => inputNumber(1)} className="btn number">1</button>
                <button onClick={() => inputNumber(2)} className="btn number">2</button>
                <button onClick={() => inputNumber(3)} className="btn number">3</button>
                <button onClick={toggleSign} className="btn function">±</button>

                {/* Row 7 */}
                <button onClick={() => inputNumber(0)} className="btn number zero">0</button>
                <button onClick={inputDecimal} className="btn number">.</button>
                <button onClick={percentage} className="btn function">%</button>
                <button onClick={getResult} className="btn equals">=</button>
            </div>

            <div className="calculator-footer">
                <small>Keyboard supported | Press ? for help</small>
            </div>
        </div>
    );
}