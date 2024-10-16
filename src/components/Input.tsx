import { IInputProps } from '@/types/types'
import React from 'react'

const Input = ({ name, value, placeHolder, type, onChange, onBlur, ref, InputClass = '', disabled = false }: IInputProps) => {
    return <input autoComplete="off" onBlur={onBlur} ref={ref} disabled={disabled} className={`w-full border-gray-500 rounded-sm m-2 p-2 outline-none ${InputClass}`} name={name} value={value} type={type} placeholder={placeHolder} onChange={onChange} />

}

export default Input
