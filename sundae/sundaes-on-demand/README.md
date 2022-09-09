# Sundaes on Demand

This project accompanies the Udemy course [Testing React with Jest and Testing Library](https://www.udemy.com/course/react-testing-library/).

- change **fireEvent** for **userEvent**
- commmand[All]By**QueryType**

  `command`

  - **get**: expect element to be in DOM
  - **query**: expect element not to be in DOM
  - **find**: expect element appear async

  `[All]`

  - **(exclude)** expect only one match
  - **(include)** expect more than one match

  `QueryType`

  - **Role** (most preferred)
  - **AltText** (images)
  - **Text** (display elements)
  - **Form elements**
    - PlaceholderText
    - LabelText
    - DisplayValue

- Mock Service Worker [msw](https://mswjs.io/docs/getting-started)

```
> mocks/handlers.js
> setupTest.js
```

- await findBy: Waiting for something to appear asynchronously on the page
- waitFor: for test where **await findBy** is not enough
- Isolate file by typing **p** in Jest watch model
- Isolate test within file with **test.only** or **test.skip**

## Mock-Ups

### 1. Order Summary Page

<img width="478" alt="1-order-summary-page" src="https://user-images.githubusercontent.com/37992878/185156200-0dc88c3d-a9ca-4dfd-8378-ca344de5e857.png">

### 2. Terms and Conditions Popover

<img width="479" alt="2-terms-and-conditions-popover" src="https://user-images.githubusercontent.com/37992878/185156398-c97513f4-b533-46f1-974c-50d1836b442f.png">

### 3. Order Entry Page

<img width="357" alt="3-order-entry-page" src="https://user-images.githubusercontent.com/37992878/185156451-2a769c26-c384-4ff4-b831-686ea3d33c51.png">

### 4. Order Entry Page with Server Error

<img width="475" alt="4-order-entry-server-error" src="https://user-images.githubusercontent.com/37992878/185156504-fc83e9c9-109f-4b7c-9508-21112ff91e5b.png">

### 5. Order Confirmation Page

<img width="453" alt="5-order-confirmation-page" src="https://user-images.githubusercontent.com/37992878/185156592-0916075f-8c5f-49e0-978f-0cc45d0da4fc.png">

### 6. Order Summary Page: No Toppings

<img width="477" alt="6-order-summary-no-toppings" src="https://user-images.githubusercontent.com/37992878/185156650-44aae7ad-fcfd-473e-9c01-1daa2d32cd9c.png">

### 7. Button Disabled on Order Entry when No Scoops Selected

<img width="413" alt="7-order-entry-no-scoops" src="https://user-images.githubusercontent.com/37992878/185156732-040726df-4c68-4ac3-bbae-2a15fbd6b2cd.png">

### 8. Invalid Entry for Scoops on Order Page

<img width="416" alt="8-order-entry-invalid-input" src="https://user-images.githubusercontent.com/37992878/185156784-536a6d2f-da5e-4cf5-8113-6c2b29db380f.png">

### 9. Order Confirmation Page with Server Error

<img width="452" alt="9-order-confirmation-server-error" src="https://user-images.githubusercontent.com/37992878/185156818-c8947e79-daa4-4ec8-982e-3dd3b354c010.png">

## Use the queryMethods
<img width="535" alt="Screen Shot 2022-09-06 at 11 01 45 AM" src="https://user-images.githubusercontent.com/37992878/189447713-6a70e152-62f5-42ae-b150-1dff43f0f29e.png">

![](https://user-images.githubusercontent.com/37992878/189447768-190401e4-51b7-40eb-ab00-930c42a4c072.png)
![](https://user-images.githubusercontent.com/37992878/189447864-35b8c197-d4fe-4096-89f4-1d2f8f1a41cb.png)



# Mock Service Worker

## When you are waiting for something to appear asynchronously on the page you must use **await** **findBy**

- Mock Service Worker mimics response from server
  - create handler
  - create server
  - update **setupTest** to listen for request
- **getAllByRole**
  - search for more than one match to role
- await **findAllByRole**
  - for asynchronous DOM update of elements
- await **waitFor** for test where **await find by** isn't enough.


# Test the Context Provider
![](https://user-images.githubusercontent.com/37992878/189448267-85a34b0d-343b-4be4-a9a0-43c6629a04b6.png)

Redefine the render and other methos in `testing-library-utils.jsx` in this way:
```
import { render } from '@testing-library/react'
import { OrderDetailsProvider } from '../context/OrderDetails'

const renderWithContext = (ui, options) => render(ui, { wrapper: OrderDetailsProvider, ...options })

//* re-export everything
export * from '@testing-library/react'

//* override render method
export { renderWithContext as render }
```

and consume:
`import { render, screen } from '../../../test-utils/testing-library-utils'`
