import Container from 'react-bootstrap/Container'
import { OrderEntry } from './pages/entry/OrderEntry'
import SummaryForm from './pages/summary/SummaryForm'
import { OrderDetailsProvider } from './context/OrderDetails'

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
        <SummaryForm />
      </OrderDetailsProvider>
    </Container>
  )
}

export default App
