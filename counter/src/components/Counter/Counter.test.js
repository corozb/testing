// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from 'react'
import Counter from './Counter'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

let view

beforeEach(() => {
  view = render(<Counter />)
})

test('should renders title with correct text', () => {
  // view.getByText('Counter')

  // or
  const headerEl = view.getByTestId('header')
  expect(headerEl.textContent).toBe('Counter')
})

test('counter initially starts with text of 0', () => {
  const counterEl = view.getByTestId('counter')

  expect(counterEl.textContent).toBe('0')
})

test('input element contains initial value of 1', () => {
  const inputEl = view.getByTestId('input')

  expect(inputEl.value).toBe('1')
})

test('add button renders with +', () => {
  const addButton = view.getByTestId('add-btn')

  expect(addButton.textContent).toBe('+')
})

test('add button renders with -', () => {
  const subtrButton = view.getByTestId('subtract-btn')

  expect(subtrButton.textContent).toBe('-')
})

test('change value of input works correctly', () => {
  const inputEl = view.getByTestId('input')

  expect(inputEl.value).toBe('1')

  fireEvent.change(inputEl, {
    target: {
      value: '5',
    },
  })

  expect(inputEl.value).toBe('5')
})

it('click on plus button adds 1 to counter', () => {
  const addButton = view.getByTestId('add-btn')
  const counterEl = view.getByTestId('counter')

  expect(counterEl.textContent).toBe('0')
  fireEvent.click(addButton)
  expect(counterEl.textContent).toBe('1')
})

it('click on plus button subtracts 1 from counter', () => {
  const subtrButton = view.getByTestId('subtract-btn')
  const counterEl = view.getByTestId('counter')

  expect(counterEl.textContent).toBe('0')
  fireEvent.click(subtrButton)
  expect(counterEl.textContent).toBe('-1')
})

it('change input value then click on add button works properly', () => {
  const addButton = view.getByTestId('add-btn')
  const counterEl = view.getByTestId('counter')
  const inputEl = view.getByTestId('input')

  expect(inputEl.value).toBe('1')

  fireEvent.change(inputEl, {
    target: {
      value: '5',
    },
  })

  fireEvent.click(addButton)

  expect(counterEl.textContent).toBe('5')
})

it('change input value then click on subtract button works properly', () => {
  const subtrButton = view.getByTestId('subtract-btn')
  const counterEl = view.getByTestId('counter')
  const inputEl = view.getByTestId('input')

  expect(inputEl.value).toBe('1')

  fireEvent.change(inputEl, {
    target: {
      value: '5',
    },
  })

  fireEvent.click(subtrButton)

  expect(counterEl.textContent).toBe('-5')
})

it('add and substrate leads to the correct counter number', () => {
  const addButton = view.getByTestId('add-btn')
  const subtrButton = view.getByTestId('subtract-btn')
  const counterEl = view.getByTestId('counter')
  const inputEl = view.getByTestId('input')

  expect(inputEl.value).toBe('1')

  fireEvent.change(inputEl, {
    target: {
      value: '10',
    },
  })

  fireEvent.click(addButton)
  fireEvent.click(addButton)
  fireEvent.click(addButton)
  fireEvent.click(subtrButton)

  expect(counterEl.textContent).toBe('20')

  fireEvent.change(inputEl, {
    target: {
      value: '5',
    },
  })

  fireEvent.click(addButton)
  fireEvent.click(addButton)
  fireEvent.click(addButton)
  fireEvent.click(subtrButton)
  fireEvent.click(subtrButton)
  fireEvent.click(subtrButton)
  fireEvent.click(subtrButton)

  expect(counterEl.textContent).toBe('15')
})

it('counter contains correct className', () => {
  const counterEl = view.getByTestId('counter')
  const inputEl = view.getByTestId('input')
  const addButton = view.getByTestId('add-btn')
  const subtrButton = view.getByTestId('subtract-btn')

  expect(counterEl.className).toBe('')

  fireEvent.change(inputEl, {
    target: {
      value: '80',
    },
  })

  expect(counterEl.className).toBe('')

  fireEvent.click(addButton)
  fireEvent.click(addButton)
  expect(counterEl.className).toBe('green')

  fireEvent.click(subtrButton)
  expect(counterEl.className).toBe('')

  fireEvent.click(subtrButton)
  fireEvent.click(subtrButton)
  fireEvent.click(subtrButton)
  expect(counterEl.className).toBe('red')
})
