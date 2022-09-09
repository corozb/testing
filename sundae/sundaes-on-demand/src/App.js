import Container from 'react-bootstrap/Container'
import OrderEntry from './pages/entry/OrderEntry'
import Options from './pages/entry/Options'
import SummaryForm from './pages/summary/SummaryForm'
import { OrderDetailsProvider } from './context/OrderDetails'

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <Options optionType='scoops' />
        <Options optionType='toppings' />
        <SummaryForm />
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  )
}

export default App
