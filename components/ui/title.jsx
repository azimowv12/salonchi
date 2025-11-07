import React from 'react'

export default function Title({ text, color, size, cls }) {
    return (
        <h2 className={`${cls} ${color ? color : ' font-semibold text-[#000000]'} ${size ? size : "text-[26px]   max-md:text-[22px]"}`}>{text}</h2>
    )
}
