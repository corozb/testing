import React from 'react'
import { Button } from 'react-bootstrap'
import { useOrderDetails } from '../../context/OrderDetails'
import Options from './Options'

export const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails()
  const orderDisabled = orderDetails.totals.scoops === '$0.00'

  const handlePage = () => setOrderPhase('review')

  return (
    <>
      <h1>Design Your Sundae!</h1>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
      <Button disabled={orderDisabled} onClick={handlePage}>
        Order Sundae!
      </Button>
    </>
  )
}
