import React, { useState } from "react"

export const DeleteIcon = ({ tip, position, clickFunction }) => {
    const [visible, setVisible] = useState(false)
    const [delayHandler, setDelayHandler] = useState(null)

    const handleMouseEnter = event => {
        setDelayHandler(setTimeout(() => {
            setVisible(true)
        }, 750))
    }

    const handleMouseLeave = () => {
        setVisible(false)
        clearTimeout(delayHandler)
    }

    const displayTip = () => {
        return <div className="tooltip">{tip}</div>
    }

    return <span style={{ position: "relative" }}>
        {visible ? displayTip() : ""}

        <svg xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={clickFunction}
            className="svg"
            viewBox="0 0 24 24">
            <g fill="none"><path d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5zM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25z" fill="currentColor"></path></g>
        </svg>
    </span>
}
