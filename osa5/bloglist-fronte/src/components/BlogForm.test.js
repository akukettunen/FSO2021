import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
  let component
  let mockHandler
  beforeEach(() => {
    mockHandler = jest.fn()

    component = render(
      <BlogForm addBlog={ mockHandler }/>
    )
  })


  test('Sisältää titlen', () => {
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')

    const form = component.container.querySelector('form')

    fireEvent.change(author, { target: { value: 'Katja Liski' } })
    fireEvent.change(title, { target: { value: 'Asuntosijoittamisen Aakkoset' } })
    fireEvent.change(url, { target: { value: 'www.liski.io' } })
    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)

    expect(mockHandler.mock.calls[0][0].blogAuthor).toBe('Katja Liski' )
    expect(mockHandler.mock.calls[0][0].blogTitle).toBe('Asuntosijoittamisen Aakkoset' )
    expect(mockHandler.mock.calls[0][0].blogUrl).toBe('www.liski.io' )
  })
})