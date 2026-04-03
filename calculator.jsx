import React, { useState } from 'react';
import './App.css';

function App() {
    // State untuk menyimpan nilai yang ditampilkan
    const [display, setDisplay] = useState('0');
    const [firstNumber, setFirstNumber] = useState(null);
    const [operation, setOperation] = useState(null);
    const [newNumber, setNewNumber] = useState(false);

    // Fungsi untuk menambah angka
    const handleNumber = (num) => {
        if (newNumber) {
            setDisplay(num);
            setNewNumber(false);
        } else {
            setDisplay(display === '0' ? num : display + num);
        }
    };

    // Fungsi untuk menambah desimal
    const handleDecimal = () => {
        if (newNumber) {
            setDisplay('0.');
            setNewNumber(false);
        } else if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    // Fungsi untuk operator
    const handleOperator = (op) => {
        if (firstNumber !== null && operation !== null && !newNumber) {
            calculate();
        }
        setFirstNumber(parseFloat(display));
        setOperation(op);
        setNewNumber(true);
    };

    // Fungsi untuk menghitung
    const calculate = () => {
        if (operation === null || firstNumber === null) return;

        const secondNumber = parseFloat(display);
        let result = 0;

        switch (operation) {
            case '+':
                result = firstNumber + secondNumber;
                break;
            case '-':
                result = firstNumber - secondNumber;
                break;
            case '*':
                result = firstNumber * secondNumber;
                break;
            case '/':
                if (secondNumber === 0) {
                    result = 'Error';
                } else {
                    result = firstNumber / secondNumber;
                }
                break;
            default:
                return;
        }

        setDisplay(result.toString());
        setFirstNumber(null);
        setOperation(null);
        setNewNumber(true);
    };

    // Fungsi clear semua
    const clearAll = () => {
        setDisplay('0');
        setFirstNumber(null);
        setOperation(null);
        setNewNumber(false);
    };

    // Fungsi delete karakter terakhir
    const deleteLast = () => {
        if (display.length === 1 || display === 'Error') {
            setDisplay('0');
        } else {
            setDisplay(display.slice(0, -1));
        }
    };

    return (
        <div className="calculator-container">
            <div className="calculator">
                {/* Display */}
                <div className="display">{display}</div>

                {/* Tombol-tombol */}
                <div className="buttons">
                    <button onClick={clearAll} className="btn clear">AC</button>
                    <button onClick={deleteLast} className="btn delete">DEL</button>
                    <button onClick={() => handleOperator('/')} className="btn operator">÷</button>
                    <button onClick={() => handleOperator('*')} className="btn operator">×</button>

                    <button onClick={() => handleNumber('7')} className="btn number">7</button>
                    <button onClick={() => handleNumber('8')} className="btn number">8</button>
                    <button onClick={() => handleNumber('9')} className="btn number">9</button>
                    <button onClick={() => handleOperator('-')} className="btn operator">-</button>

                    <button onClick={() => handleNumber('4')} className="btn number">4</button>
                    <button onClick={() => handleNumber('5')} className="btn number">5</button>
                    <button onClick={() => handleNumber('6')} className="btn number">6</button>
                    <button onClick={() => handleOperator('+')} className="btn operator">+</button>

                    <button onClick={() => handleNumber('1')} className="btn number">1</button>
                    <button onClick={() => handleNumber('2')} className="btn number">2</button>
                    <button onClick={() => handleNumber('3')} className="btn number">3</button>
                    <button onClick={calculate} className="btn equals">=</button>

                    <button onClick={() => handleNumber('0')} className="btn number zero">0</button>
                    <button onClick={handleDecimal} className="btn number">.</button>
                </div>
            </div>
        </div>
    );
}

export default App;