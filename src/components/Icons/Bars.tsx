import React from "react";

interface props {
    className?: string
}

const Bars = ({ className }: props) => {
    return (
        <svg className={className} width='24' height="24" viewBox="0 0 24 24">
            <g fill="currentColor">
                <rect x="1" y="4" width="22" height="1" rx=".5"></rect>
                <rect x="5" y="11" width="18" height="1" rx=".5"></rect>
                <rect x="3" y="18" width="20" height="1" rx=".5"></rect>
            </g>
        </svg>
    )
};

export default Bars;