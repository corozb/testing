import React from 'react'
import { useOrderDetails } from '../../context/OrderDetails'
import Options from './Options'

export const OrderEntry = () => {
  const [optionCounts] = useOrderDetails()

  return (
    <>
      <h1>Design Your Sundae!</h1>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand Total: {optionCounts.totals.grandTotal}</h2>
    </>
  )
}
