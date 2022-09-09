import { useEffect, useState } from 'react'
import axios from 'axios'
import { Row } from 'react-bootstrap'

import ScoopOption from './ScoopOption'
import ToppingOption from './ToppingOption'
import AlertBanner from '../common/AlertBanner'
import { pricePerItem } from '../../contants'
import { useOrderDetails } from '../../context/OrderDetails'

export default function Options({ optionType }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)
  const [orderDetails, updateItemCount] = useOrderDetails()

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch(() => {
        setError(true)
      })
  }, [optionType])

  if (error) {
    return <AlertBanner />
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

  const optionItem = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, optionType)}
    />
  ))

  return (
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItem}</Row>
    </>
  )
}
