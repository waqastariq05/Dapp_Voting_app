import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <>
            <nav class="navbar fixed-top">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">
                        <i class="fa-regular fa-circle-check"></i>
                        Voting
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Nav
