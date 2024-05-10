import React from "react";
import { SelectComponent } from "../../interfaces/component-interfaces";

export default function Select({ label, options, value, onChange }: SelectComponent) {
  return (
    <>
      <div className='select-container'>
        <label>{label}</label>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options?.map((option) => (
          <option key={option?.value} value={option?.value}>
            {option?.label}
          </option>
        ))}
        </select>
      </div>
    </>
  )
}