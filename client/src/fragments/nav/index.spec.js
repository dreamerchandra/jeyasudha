import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import fireEvent from '@testing-library/user-event'
import NavBar from './index'

describe('testing nav bar', () => {
  it('testing opening and closing nav bar', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <NavBar />
      </MemoryRouter>
    )
    console.log(container.querySelector('.menu-container').classList.toString())
    fireEvent.click(container.querySelector('.bar1'))
    console.log(container.querySelector('.menu-container').classList.toString())
    expect(
      container.querySelector('.menu-container').classList.contains('menu-container')
    ).toBeFalsy()
  })
})
