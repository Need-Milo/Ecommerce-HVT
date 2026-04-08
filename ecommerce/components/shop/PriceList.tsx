import React, { useState } from 'react'
import { Title } from '../ui/text';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

interface Props {
  value: string | null;
  onChange: (value: string |null) => void
}

const priceArray = [
  { title: "Under $100", value: "0-100" },
  { title: "$100 - $200", value: "100-200" },
  { title: "$200 - $300", value: "200-300" },
  { title: "$300 - $500", value: "300-500" },
  { title: "Over $500", value: "500-10000" },
  {title: "Price: Low -> High", value: "asc" },
  {title: "Price: High -> Low ", value: "desc" }
];

const PriceList = ({value, onChange}:Props ) => {
  return (
    <div className='w-full bg-white p-5' >
      <Title className='text-base font-black' >Price</Title>
      <RadioGroup
  value={value ?? ""}
  onValueChange={onChange}
  className="mt-2 space-y-1"
>
  {priceArray.map(price => {
    const active = value === price.value

    return (
      <label
        key={price.value}
        htmlFor={price.value}
        className={`flex items-center space-x-2 hover:cursor-pointer gap-2 
          ${active ? "font-semibold text-shop-dark-green bg-green-50" : "text-gray-700"}
        `}
      >
        <RadioGroupItem value={price.value} id={price.value} />
        {price.title}
      </label>
    )
  })}
</RadioGroup>
        {value && (
          <button onClick={() => onChange(null) } 
          className='text-sm font-medium mt-2 underline underline-offset-2 decoration-1px hover:text-shop-dark-green hoverEffect  ' >
            Reset button
          </button>
        ) }

    </div>
  )
}

export default PriceList