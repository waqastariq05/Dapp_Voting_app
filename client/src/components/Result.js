import React, { useContext, useEffect, useState } from 'react'
import Table from './Table/Table'
import VotingContext from '../context/VotingContext'

const Result = () => {
    const context = useContext(VotingContext)
    const { web3Api, endTime, getEndTime } = context;

    useEffect(() => {
        web3Api.contract && getEndTime();
    }, [web3Api.contract])

    function findMaxValueInColumn(tableId, columnIndex) {
        const table = document.getElementById(tableId);
        let max = Number.MIN_SAFE_INTEGER;

        // Loop through each row of the table and extract the value from the desired column
        for (let i = 1; i < table.rows.length; i++) { // Start from 1 to skip the header row
            const cellValue = parseInt(table.rows[i].cells[columnIndex].innerText, 10);

            // Update max if the current cellValue is greater
            if (!isNaN(cellValue) && cellValue > max) {
                max = cellValue;
            }
        }

        return max;
    }

    const currentTime = Math.floor(Date.now() / 1000);

    const milliseconds = parseInt(endTime) * 1000
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleString()

    if (currentTime < endTime) {
        return (
            <div className='result pad-50'>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className='heading'>Result</h2>
                    <h3 className='date mb-3'>End Date: {humanDateFormat}</h3>
                </div>
                <h4 className='mt-3'>Voting lines are open...</h4>
            </div>
        )
    }

    if (parseInt(endTime) === 0) {
        return (
            <div className='result pad-50'>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className='heading'>Result</h2>
                    <h3 className='date mb-3'>End Date: {humanDateFormat}</h3>
                </div>
                <h4 className='mt-3'>Voting is not started yet...</h4>
            </div>
        )
    }

    return (
        <div className='result pad-50'>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className='heading'>Result</h2>
                <h3 className='date mb-3'>End Date: {humanDateFormat}</h3>
            </div>
            <Table />
        </div>
    )
}

export default Result
