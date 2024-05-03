import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/react';
import NavBar from './Navbar';

describe('Navbar Component', () => {
  test('navbar has consistent class names', () => {
    render(<NavBar />);
    const navElement = screen.getByRole('navigation');
    expect(navElement).toHaveClass('carbon-navbar');
  })
})