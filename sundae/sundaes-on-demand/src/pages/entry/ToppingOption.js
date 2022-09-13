import { Col, Form } from 'react-bootstrap'

export default function ToppingOption({ name, imagePath, updateItemCount }) {
  const handleChange = (e) => updateItemCount(name, e.target.checked ? 1 : 0)

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img style={{ width: '75%' }} src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type='checkbox' label={name} onChange={handleChange} />
      </Form.Group>
    </Col>
  )
}