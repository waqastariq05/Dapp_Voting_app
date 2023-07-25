import React, { useContext } from 'react'
import '../Banner/Banner.css'
import bgImg from '../../images/banner.avif'
import Nav from '../Nav'
import { useNavigate } from 'react-router-dom'
import VotingContext from '../../context/VotingContext'

const Banner = () => {
    const context = useContext(VotingContext)
    const { connectToMetaMask } = context;

    const navigate = useNavigate()
    const handleUser = async () => {
        await connectToMetaMask();
        navigate('/user')
    }

    const handleAdmin = async () => {
        await connectToMetaMask();
        navigate('/admin')
    }

    return (
        <div className='banner'>
            <Nav />
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-md-5 left">
                        <h2>Online Voting</h2>
                        <p>One push of a button can change the entire nation. One wrong press and you are going to pay for the next five years.</p>
                        <div className='btnGroup'>
                            <button className='btn' onClick={handleUser}>User Lognin</button>
                            <button className='btn' onClick={handleAdmin}>Admin-Login</button>
                        </div>
                    </div>
                    <div className="col-md-7 right">
                        <div className="bannerImg">
                            <img src={bgImg} alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
