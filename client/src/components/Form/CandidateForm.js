import React, { useContext, useState, useEffect } from 'react'
import '../Form/Form.css'
import VotingContext from '../../context/VotingContext'

const CandidateForm = () => {
    const context = useContext(VotingContext)
    const { web3Api, account, endTime, getEndTime } = context;

    const [candidate, setCandidate] = useState({ nominationNo: null, name: '', partyName: '', stateCode: null, partyFlag: '' })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { contract } = web3Api;
            await contract.methods.addCandidate(candidate.nominationNo, candidate.name, candidate.partyName, candidate.partyFlag, candidate.stateCode).send({ from: account });
            alert("Candidate is added successfully");
            setCandidate({ nominationNo: '', name: '', partyName: '', stateCode: '', partyFlag: '' })
        }
        catch (error) {
            alert("Candidate is not added successfully");
        }
    }
    const change = (e) => {
        setCandidate({ ...candidate, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        web3Api.contract && getEndTime();
    }, [web3Api.contract])

    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime < endTime) {
        return (
            <div className='form pad-50'>
                <h2>Add Candidate</h2>
                <h4 className='mt-3'>Sorry you could not add candidate, Because voting lines are open...</h4>
            </div>
        )
    }

    return (
        <div className='form pad-50'>
            <h2>Add Candidate</h2>
            <form class="row" onSubmit={handleSubmit}>
                <div class="col-md-6">
                    <label for="nominationNo" class="form-label">Nomination Number</label>
                    <input type="number" class="form-control" id="nominationNo" name='nominationNo' value={candidate.nominationNo} onChange={change} />
                </div>
                <div class="col-md-6">
                    <label for="name" class="form-label">Candidate Name</label>
                    <input type="text" class="form-control" id="name" name='name' value={candidate.name} onChange={change} />
                </div>
                <div class="col-md-6">
                    <label for="partyName" class="form-label">Party Name</label>
                    <input type="text" class="form-control" id="partyName" name='partyName' value={candidate.partyName} onChange={change} />
                </div>
                <div class="col-md-6">
                    <label for="stateCode" class="form-label">State Code</label>
                    <input type="number" class="form-control" id="stateCode" name='stateCode' value={candidate.stateCode} onChange={change} />
                </div>
                <div class="col-md-12">
                    <label for="partyFlag" class="form-label">Party Flag</label>
                    <input type="text" class="form-control" id="partyFlag" name='partyFlag' value={candidate.partyFlag} onChange={change} />
                </div>
                {/* <div class="col-md-12">
                    <label for="partyFlag" class="form-label">Party Flag</label>
                    <input type="file" class="form-control" id="partyFlag" />
                </div> */}
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CandidateForm
