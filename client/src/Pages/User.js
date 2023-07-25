import React, { useContext, useEffect } from 'react'
import UserForm from '../components/Form/UserForm'
import Voting from '../components/Voting'
import Result from '../components/Result'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import VotingContext from '../context/VotingContext'

const User = () => {
    const context = useContext(VotingContext)
    const { web3Api, account, ownerAcc } = context;
    const navigate = useNavigate();

    useEffect(() => {
        if (account === ownerAcc) {
            navigate('/');
        }
    }, [web3Api.web3])

    const handleLogout = () => {
        navigate('/')
    }

    return (
        <div className='user'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 shadow">
                        <nav class="nav flex-column">
                            <Link class="nav-link active" to="/user"><i class="fa-solid fa-clipboard icon"></i>Information</Link>
                            <Link class="nav-link" to="/user/register"><i class="fa-solid fa-square-check icon"></i>Voter Registration</Link>
                            <Link class="nav-link" to="/user/voting"><i class="fa-solid fa-check-to-slot icon"></i>Voting Area</Link>
                            <Link class="nav-link" to="/user/result"><i class="fa-solid fa-square-poll-vertical icon"></i>Result</Link>
                            <button class="nav-link" onClick={handleLogout}><i class="fa-solid fa-right-from-bracket icon"></i>logout</button>
                        </nav>
                    </div>
                    <div className="col-md-9">
                        <Routes>
                            <Route exact path='/' element="" />
                            <Route exact path='/register' element={<UserForm />} />
                            <Route exact path='/voting' element={<Voting />} />
                            <Route exact path='/result' element={<Result />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User
