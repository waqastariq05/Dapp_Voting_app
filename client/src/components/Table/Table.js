import React, { useContext, useEffect, useState } from 'react'
import VotingContext from '../../context/VotingContext'

const Table = () => {
    const context = useContext(VotingContext)
    const { web3Api, result, getResult } = context;
    let id = 1;

    const [maxValue, setMaxValue] = useState({ name: "", vote: null });

    function findMaxValueInColumn() {
        const table = document.getElementById("tableId");
        let max = Number.MIN_SAFE_INTEGER;
        let maxUserName = '';

        // Loop through each row of the table and extract the value from the desired column
        for (let i = 1; i < table.rows.length; i++) { // Start from 1 to skip the header row
            const cellValue = parseInt(table.rows[i].cells[6].innerText, 10);
            console.log(cellValue)

            // Update max if the current cellValue is greater
            if (!isNaN(cellValue) && cellValue > max) {
                max = cellValue;
                maxUserName = table.rows[i].cells[1].innerText;
            }
        }

        setMaxValue({ name: maxUserName, vote: max });
    }

    useEffect(() => {
        web3Api.contract && getResult();
    }, [web3Api.contract])

    useEffect(() => {
        findMaxValueInColumn()
    })

    return (
        <>
            <h2 className='mb-3 fw-bold'>Winner Candidate:</h2>
            <h4>Name: {maxValue.name}</h4>
            <h4>Votes: {maxValue.vote}</h4>
            <table class="table table-light table-bordered border-dark table-hover mt-5" id='tableId'>
                <thead className='table-dark text-center'>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Candidate Name</th>
                        <th scope="col">Party Name</th>
                        <th scope="col">Party Flag</th>
                        <th scope="col">Nomination Number</th>
                        <th scope="col">State Code</th>
                        <th scope="col">Votes Count</th>
                    </tr>
                </thead>
                <tbody className='table-group-divider'>
                    {result !== '' && result.map((res) => {
                        return (
                            <tr>
                                <th scope="row">{id++}</th>
                                <td>{res.candidateName}</td>
                                <td>{res.partyName}</td>
                                <td>{res.partyFlag}</td>
                                <td>{parseInt(res.nominationNumber)}</td>
                                <td>{parseInt(res.stateCode)}</td>
                                <td>{parseInt(res.voteCount)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Table
