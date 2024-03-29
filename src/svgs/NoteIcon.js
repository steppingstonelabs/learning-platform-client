import React, { useState } from "react"

export const NoteIcon = ({ tip, position, clickFunction }) => {
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
            onMouseOver={handleMouseEnter}
            onMouseOut={handleMouseLeave}
            onClick={clickFunction}
            className="svg"
            viewBox="0 0 18 18">
            <g fill="none">
            <path d="M10 5.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0zm-4-2a.5.5 0 0 0-1 0V5H3.5a.5.5 0 0 0 0 1H5v1.5a.5.5 0 0 0 1 0V6h1.5a.5.5 0 0 0 0-1H6V3.5zm8 .5h-3.207a5.466 5.466 0 0 0-.393-1H14a3 3 0 0 1 2.995 2.824L17 6v4.379a2 2 0 0 1-.467 1.284l-.119.13l-4.621 4.621a2 2 0 0 1-1.238.578l-.176.008H6a3 3 0 0 1-2.995-2.824L3 14v-3.6c.317.162.651.294 1 .393V14a2 2 0 0 0 1.85 1.995L6 16h4v-3a3 3 0 0 1 2.824-2.995L13 10h3V6a2 2 0 0 0-1.85-1.995L14 4zm1.783 7.001L13 11a2 2 0 0 0-1.995 1.85L11 13v2.781l.086-.074l4.621-4.621c.027-.027.052-.055.075-.085z" fill="currentColor"></path>
            </g>
        </svg>
    </span>
}
