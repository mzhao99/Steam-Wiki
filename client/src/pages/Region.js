import React, { useState, useEffect, useContext } from "react";
import { CButton } from '@coreui/react';
import Country from '../components/Country';
import currencyList from '../currency.json';
import { CurrencyContext } from '../App';

function Region() {
    const { currency, setCurrency } = useContext(CurrencyContext);

    return (
        <div className='d-flex flex-column justify-content-center align-items-center md:h-screen'>
            <p className="mb-[50px] font-semibold text-3xl">Choose your currency:</p>  
            <div className="grid gap-x-9 gap-y-5 md:grid-cols-5 sm:grid-cols-2">
                {currencyList.currencies.map((c) => {
                    return (
                        <CButton color="primary" variant="outline" shape="rounded-pill" className="w-full" key={c.code} onClick={() => setCurrency(c.code)}>
                            <Country name={c.title} code={c.code} />
                        </CButton>     
                    )
                })}
            </div>
        </div>
    )
}

export default Region;