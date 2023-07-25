import React, { useContext, useEffect } from 'react'
import Card from './Card/Card'
import VotingContext from '../context/VotingContext'

const Voting = () => {
    const context = useContext(VotingContext)
    const { web3Api, regCandidate, getCandidates, endTime, getEndTime, isReg, getUserIsReg, vote, getUserIsVoted } = context;

    useEffect(() => {
        web3Api.contract && getEndTime();
        web3Api.contract && getUserIsReg();
        web3Api.contract && getCandidates();
        web3Api.contract && getUserIsVoted();
    }, [web3Api.contract])

    const currentTime = Math.floor(Date.now() / 1000);

    const milliseconds = parseInt(endTime) * 1000
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleString()

    if (isReg === true) {
        return (
            <div className='voting pad-50'>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className='heading'>Voting Is Now Live</h2>
                    <h3 className='date mb-3'>End Date: {parseInt(endTime) === 0 ? "Not Started" : humanDateFormat}</h3>
                </div>
                <h4 className='mt-3'>Your account is not registered...</h4>
            </div>
        )
    }

    if (currentTime > endTime) {
        return (
            <div className='voting pad-50'>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className='heading'>Voting Is Now Live</h2>
                    <h3 className='date mb-3'>End Date: {parseInt(endTime) === 0 ? "Not Started" : humanDateFormat}</h3>
                </div>
                <h4 className='mt-3'>Voting is now close...</h4>
            </div>
        )
    }



    return (
        <div className='voting pad-50'>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className='heading'>Voting Is Now Live</h2>
                <h3 className='date mb-3'>End Date: {humanDateFormat}</h3>
            </div>
            <div className="row">
                <h3 className={`mt-3 d-${vote.userVoted_ === true ? "block" : "none"}`}>You have already Voted...</h3>
                {regCandidate !== "" && regCandidate.map((candidate) => {
                    return (
                        <div className={`col-md-4 d-${vote.userVoted_ === true ? "none" : "block"}`}>
                            <Card name={candidate.candidateName} nominationNo={candidate.nominationNumber} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Voting
