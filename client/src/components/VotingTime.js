import React, { useContext, useState, useEffect } from 'react'
import VotingContext from '../context/VotingContext'

const VotingTime = () => {
    const context = useContext(VotingContext)
    const { web3Api, account, endTime, getEndTime } = context;

    const [votingStartTime, setVotingStartTime] = useState(null)
    const [votingEndTime, setVotingEndTime] = useState(null)

    useEffect(() => {
        web3Api.contract && getEndTime();
    }, [web3Api.contract])

    const handleUpdate = async (e) => {
        e.preventDefault();
        const unixStartTime = new Date(votingStartTime);
        const startTimestamp = Math.floor(unixStartTime.getTime() / 1000);
        try {
            const { contract } = web3Api;
            await contract.methods.updateVotingStartTime(startTimestamp, Math.floor(Date.now() / 1000)).send({ from: account });
            alert("Voting start time is now updated");
            setVotingStartTime("")
        }
        catch (error) {
            alert("Voting start time is not updated");
        }
    }

    const handleExtend = async (e) => {
        e.preventDefault();
        const unixEndTime = new Date(votingEndTime);
        const endTimestamp = Math.floor(unixEndTime.getTime() / 1000);
        console.log(endTimestamp)
        try {
            const { contract } = web3Api;
            await contract.methods.extendVotingTime(endTimestamp, Math.floor(Date.now() / 1000)).send({ from: account });
            alert("Voting end time is now extended");
            setVotingEndTime("")
        }
        catch (error) {
            alert("Voting end time is not extended");
        }
    }

    const changeUpdate = (e) => {
        setVotingStartTime(e.target.value)
    }

    const changeExtend = (e) => {
        setVotingEndTime(e.target.value)
    }

    const milliseconds = parseInt(endTime) * 1000
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleString()

    return (
        <div className='votingTime pad-50'>
            <h2 className='heading'>Update Voting Start Time</h2>
            <form className='form mb-5' onSubmit={handleUpdate}>
                <div class="row mb-3">
                    <label for="startTime" class="col-sm-3 col-form-label">Voting Start Time</label>
                    <div class="col-sm-9">
                        <input type="datetime-local" class="form-control" id="startTime" name='startTime' value={votingStartTime} onChange={changeUpdate} />
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Update</button>
            </form>

            <h2 className='heading'>Extend Voting Time</h2>
            <form className='form' onSubmit={handleExtend}>
                <label for="end" class="form-label">End Time: {humanDateFormat}</label>
                <div class="row mb-3">
                    <label for="endTime" class="col-sm-3 col-form-label">New End Time</label>
                    <div class="col-sm-9">
                        <input type="datetime-local" class="form-control" id="endTime" name='endTime' value={votingEndTime} onChange={changeExtend} />
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Extend</button>
            </form>
        </div>
    )
}

export default VotingTime
