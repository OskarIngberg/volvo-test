import React, { ReactElement } from "react";

interface props {
    className?: string,
    width: number,
    heigth: number,
    viewBox?: string
}

const Close = ({ className, width, heigth, viewBox = '0 0 24 24' }: props): ReactElement<SVGSVGElement> => {
    return (
        <svg className={className} width={width} height={heigth} viewBox={viewBox}>
            <path stroke="currentColor" d="M4.222 4.222l15.556 15.556M4.222 19.778L19.778 4.222"></path>
        </svg>
    )
}

export default Close;