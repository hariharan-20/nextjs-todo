import { IButtonProps } from '@/types/types'
import React from 'react'

const Button = ({ text, onClick, buttonClass }: IButtonProps) => {
    return (
        <button onClick={onClick} className={`cursor-pointer border-gray-700  rounded-sm ${buttonClass}`}>
            {text}
        </button>
    )
}

export default Button
