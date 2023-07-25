import React, { useState, useContext } from 'react'
import '../Form/Form.css'
import VotingContext from '../../context/VotingContext'

const Form = () => {
    const context = useContext(VotingContext)
    const { web3Api, account } = context;

    const [user, setUser] = useState({ aadharNo: null, name: '', age: null, stateCode: null, isAlive: false })

    console.log(web3Api)
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { contract } = web3Api;
            await contract.methods.regVoter(user.aadharNo, user.name, user.age, user.stateCode, Boolean(user.isAlive)).send({ from: account });
            alert("User is register successfully");
            setUser({ aadharNo: '', name: '', age: '', stateCode: '', isAlive: false })
        }
        catch (error) {
            alert("User is not register successfully");
        }
    }
    const change = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <div className='form pad-50'>
            <h2>Voter Registration</h2>
            <form class="row" onSubmit={handleSubmit}>
                <div class="col-md-6">
                    <label for="aadharNo" class="form-label">AadharCard Number</label>
                    <input type="number" class="form-control" id="aadharNo" name='aadharNo' value={user.aadharNo} onChange={change} />
                </div>
                <div class="col-md-6">
                    <label for="name" class="form-label">Voter Name</label>
                    <input type="text" class="form-control" id="name" name='name' value={user.name} onChange={change} />
                </div>
                <div class="col-md-6">
                    <label for="age" class="form-label">Voter Age</label>
                    <input type="number" class="form-control" id="age" name='age' value={user.age} onChange={change} />
                </div>
                <div class="col-md-6">
                    <label for="stateCode" class="form-label">State Code</label>
                    <input type="number" class="form-control" id="stateCode" name='stateCode' value={user.stateCode} onChange={change} />
                </div>
                <div class="col-12">
                    <input type="checkbox" class="form-check-input" id="alive" name="isAlive" defaultValue onChange={change} />
                    <label class="form-check-label" for="alive">Alive</label>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Registar</button>
                </div>
            </form>
        </div>
    )
}

export default Form
