// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {

    const [curr1, setCurr1] = useState("USD");
    const [curr2, setCurr2] = useState("USD");
    const [amount, setAmount] = useState(0);
    const [converted, setConverted] = useState(0);

    function handleFirstCurrChange(event) {
        setCurr1(event.target.value);
    }

    function handleSecondCurrChange(event) {
        setCurr2(event.target.value);
    }

    function handleAmountChange(event) {
        setAmount(Number(event.target.value));
    }

    useEffect(function() {
        const controller = new AbortController();
        async function fetchData() {
            if(curr1 == curr2)
            {
                setConverted(amount);
                return;
            }
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${curr1}&to=${curr2}`, {signal: controller.signal});
            const data = await res.json();
            setConverted(data.rates[curr2]);
            return function() {
                controller.abort();
            }
        }
        fetchData();

    }, [curr1, curr2, amount]);

    return (
      <div>
        <input type="text" onChange = {handleAmountChange} />
        <select onChange = {handleFirstCurrChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select onChange = {handleSecondCurrChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <p>{converted}</p>
      </div>
    );
  }
  