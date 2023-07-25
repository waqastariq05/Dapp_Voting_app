import React, { useContext, useEffect } from 'react'
import CandidateForm from '../components/Form/CandidateForm'
import AdminVoting from '../components/AdminVoting'
import VotingTime from '../components/VotingTime'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import VotingContext from '../context/VotingContext'


const Admin = () => {
    const context = useContext(VotingContext)
    const { web3Api, ownerAcc, account } = context;
    const navigate = useNavigate();

    useEffect(() => {
        if (account !== ownerAcc) {
            navigate('/');
        }
    }, [web3Api.web3])

    const handleLogout = () => {
        navigate('/')
    }

    return (
        <div className='admin'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 shadow">
                        <nav class="nav flex-column">
                            <Link class="nav-link active" to="/admin"><i class="fa-solid fa-clipboard icon"></i>Information</Link>
                            <Link class="nav-link" to="/admin/register"><i class="fa-solid fa-square-check icon"></i>Add Candidate</Link>
                            <Link class="nav-link" to="/admin/voting"><i class="fa-solid fa-check-to-slot icon"></i>Voting Area</Link>
                            <Link class="nav-link" to="/admin/votingTime"><i class="fa-solid fa-square-poll-vertical icon"></i>Update Voting Time</Link>
                            <button class="nav-link" onClick={handleLogout}><i class="fa-solid fa-right-from-bracket icon"></i>logout</button>
                        </nav>
                    </div>
                    <div className="col-md-9">
                        <Routes>
                            <Route exact path='/' element="" />
                            <Route exact path='/register' element={<CandidateForm />} />
                            <Route exact path='/voting' element={<AdminVoting />} />
                            <Route exact path='/votingTime' element={<VotingTime />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
