import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import Logo from "./learnops.png"
import useSimpleAuth from "../auth/useSimpleAuth"
import "./NavBar.css"

export const NavBar = () => {
    const history = useHistory()
    const [name, setName] = useState("Unknown")
    const { getCurrentUser, logout, isAuthenticated } = useSimpleAuth()

    useEffect(
        () => {
            const user = getCurrentUser()
            setName(user.profile.person.first_name)
        }, [getCurrentUser]
    )

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Overview</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/records">Records</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/candidates">Candidates</Link>
            </li>
            {
                isAuthenticated()
                    ? <li className="nav-item">
                        <button className="navbar__link  fakeLink"
                            onClick={() => {
                                logout()
                                history.push({ pathname: "/" })
                            }}
                        >Logout {name}
                        </button>
                    </li>
                    : ""
            }
        </ul>
    )
}
