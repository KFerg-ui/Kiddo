import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('The word "home" is rendered on the screen', () => {
    render(<App />);

    expect(screen.getByText(/Home/)).toBeInTheDocument();

  });

  test('Our video is displayed on the page', () => {
    render(<App />);
    expect(screen.getByTestId("video")).toBeInTheDocument();
  })

  test('When we click "Register" we see "REGISTER TO JOIN OUR MISSION"', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('registerNav'));
    
    expect(screen.getByText(/REGISTER TO JOIN OUR MISSION/)).toBeInTheDocument();
  })

  test('When we click "Login" we see "Login To Kiddo"', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('loginNav'));
    
    expect(screen.getByText(/Login To Kiddo/)).toBeInTheDocument();
  })

  test('When we click "Login" and then "Home" in the Navbar it takes us back home', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('loginNav'));
    fireEvent.click(screen.getByTestId('homeNav'));

    expect(screen.getByTestId("video")).toBeInTheDocument();

  })
});