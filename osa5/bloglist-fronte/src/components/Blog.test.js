import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  const blog = {
    title: 'Ihmisjohtaminen globaalissa kontekstissa',
    author: 'Jari Aarnio',
    url: 'www.kako.la',
    likes: 3,
    user: { username: 'jartsa420' }
  }

  let component
  let mockHandler
  beforeEach(() => {
    mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} liked={ mockHandler }/>
    )
  })

  test('Sisältää titlen', () => {
    expect(component.container).toHaveTextContent(
      'Ihmisjohtaminen globaalissa kontekstissa'
    )
  })

  test('Sisältää authorin', () => {
    expect(component.container).toHaveTextContent(
      'Jari Aarnio'
    )
  })

  test('Ei sisällä likejä vielä', () => {
    expect(component.container).not.toHaveTextContent(
      '3'
    )
  })

  test('Ei sisällä urlia vielä', () => {
    expect(component.container).not.toHaveTextContent(
      'www.kako.la'
    )
  })

  test('Infon jälkeen näkyy liket', () => {
    const button = component.getByText('info')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      '3'
    )
  })

  test('Infon jälkeen näkyy urli', () => {
    const button = component.getByText('info')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'www.kako.la'
    )
  })

  test('Liken painaminen kahdesti kutsuu funktiota kahdesti', async () => {
    const button = component.getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})