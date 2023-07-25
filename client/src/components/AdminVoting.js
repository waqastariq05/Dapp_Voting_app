import React, { useContext, useEffect, useState } from 'react'
import VotingContext from '../context/VotingContext'

const AdminVoting = () => {
    const context = useContext(VotingContext)
    const { web3Api, account, endTime, getEndTime } = context;

    const [startVoting, setStartVoting] = useState({ startTime: null, endTime: null })

    useEffect(() => {
        web3Api.contract && getEndTime();
    }, [web3Api.contract])

    const currentTime = Math.floor(Date.now() / 1000);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const unixStartTime = new Date(startVoting.startTime);
        const unixEndTime = new Date(startVoting.endTime);

        const startTimestamp = Math.floor(unixStartTime.getTime() / 1000);
        const endTimestamp = Math.floor(unixEndTime.getTime() / 1000);

        try {
            const { contract } = web3Api;
            await contract.methods.startElection(startTimestamp, endTimestamp).send({ from: account });
            alert("Voting is now started successfully");
            setStartVoting({ startTime: "", endTime: "" })
        }
        catch (error) {
            alert("voting is not started yet");
        }
    }
    const change = (e) => {
        setStartVoting({ ...startVoting, [e.target.name]: e.target.value })
    }

    if (currentTime < endTime) {
        return (
            <div className='voting pad-50'>
                <h2 className='heading'>Set The Election Time</h2>
                <h4 className='mt-3'>Voting is already started now...</h4>
            </div>
        )
    }

    return (
        <div className='voting pad-50'>
            <h2 className='heading'>Set The Election Time</h2>
            <div className="form" onSubmit={handleSubmit}>
                <form>
                    <div class="row mb-3">
                        <label for="startTime" class="col-md-3 col-form-label">Voting Start Time</label>
                        <div class="col-md-9">
                            <input type="datetime-local" class="form-control" id="startTime" name='startTime' value={startVoting.startTime} onChange={change} />
                        </div>
                    </div>
                    <div class="row mb-5">
                        <label for="endTime" class="col-md-3 col-form-label">Voting End Time</label>
                        <div class="col-md-9">
                            <input type="datetime-local" class="form-control" id="endTime" name='endTime' value={startVoting.endTime} onChange={change} />
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Start Voting</button>
                </form>
            </div>
        </div>
    )
}

export default AdminVoting
