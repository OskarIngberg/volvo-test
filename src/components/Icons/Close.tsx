import React from "react";

interface props {
    className?: string
}

const Close = ({ className }: props) => {
    return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24">
            <path stroke="currentColor" d="M4.222 4.222l15.556 15.556M4.222 19.778L19.778 4.222"></path>
        </svg>
    )
}

export default Close;