import React, { useContext, useEffect, useState } from 'react'
import '../Card/Card.css'
import bgImg from '../../images/banner.avif'
import VotingContext from '../../context/VotingContext'

const Card = (props) => {
    const context = useContext(VotingContext)
    const { web3Api, account } = context;


    const handleClick = async () => {
        try {
            const { contract } = web3Api;
            console.log(account)
            await contract.methods.vote(parseInt(props.nominationNo), Math.floor(Date.now() / 1000)).send({ from: account });
            alert("You have voted successFully");
        }
        catch (error) {
            alert("Your Voting is cancel");
        }
    }

    return (
        <>
            <div class="card shadow">
                <img src={bgImg} class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">{props.name}</h5>
                    <button class="btn" onClick={handleClick}>Vote</button>
                </div>
            </div>
        </>
    )
}

export default Card
