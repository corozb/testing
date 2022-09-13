import { useOrderDetails } from '../../context/OrderDetails'
import SummaryForm from './SummaryForm'

function OrderSummary({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails()

  const scoopsArray = Array.from(orderDetails.scoops.entries())
  const scoopList = scoopsArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ))

  //* only display toppings if the toppings total is nonzero
  const hasToppings = orderDetails.totals.toppings !== '$0.00'
  const toppingsArray = Array.from(orderDetails.toppings.keys())
  const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>)

  return (
    <>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>{scoopList}</ul>
      {hasToppings ? (
        <>
          <h2>Toppings: {orderDetails.totals.toppings}</h2>
          <ul>{toppingList}</ul>
        </>
      ) : null}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </>
  )
}

export default OrderSummary
