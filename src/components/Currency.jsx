import React from 'react'
import '../css/currency.css';
import { FaArrowCircleRight } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';

function Currency() {
    const [amount, setAmount] = useState();
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("TRY");
    const [result, setResult] = useState(0);

    const exchange = async () => {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const API_KEY = import.meta.env.VITE_API_KEY;

        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`);
        const result = ((response.data.data[toCurrency]) * amount).toFixed(2);
        setResult(result);
    }

    return (
        <div className="currency-div">
            <div style={{ fontFamily: 'Arial', backgroundColor: '#0a9af9', color: '#fff', width: '100%', textAlign: 'center' }}>
                <h1>CURRENCY CONVERTER</h1>
            </div>
            <div className="input-row">
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    className="amount"
                    placeholder="Amount"
                />
                <select
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="from-currency-option"
                >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>TRY</option>
                </select>
                <div className="icon-wrapper">
                    <FaArrowCircleRight className="arrow-icon" />
                </div>
                <select
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="to-currency-option"
                >
                    <option>TRY</option>
                    <option>EUR</option>
                    <option>USD</option>
                </select>
                <input
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    type="number"
                    className="result"
                    placeholder="Result"
                />
            </div>
            <div>
                <button
                    onClick={exchange}
                    className="convert-button"
                >
                    CONVERT
                </button>
            </div>
        </div>
    )
}

export default Currency