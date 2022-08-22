import { useEffect, useState } from 'react'
import axios from 'axios'
import { Row } from 'react-bootstrap'

import ScoopOption from './ScoopOption'
import ToppingOption from './ToppingOption'

export default function Options({ optionType }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {})
  }, [optionType])

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption
  const optionItem = items.map((item) => <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />)

  return <Row>{optionItem}</Row>
}
