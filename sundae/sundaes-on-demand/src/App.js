import { useState } from 'react'
import Container from 'react-bootstrap/Container'

import { OrderDetailsProvider } from './context/OrderDetails'
import { OrderEntry } from './pages/entry/OrderEntry'
import OrderSummary from './pages/summary/OrderSummary'
import OrderConfirmation from './pages/confirmation/OrderConfirmation'

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress')
  const OrderPhase = {
    inProgress: OrderEntry,
    review: OrderSummary,
    completed: OrderConfirmation,
  }

  const Component = OrderPhase[orderPhase]

  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  )
}

export default App
