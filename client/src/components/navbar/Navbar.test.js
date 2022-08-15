import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar"



test('Clicking the logo takes us to the "/" path', () => {
    render(
    
    <Router>
        <Navbar/>
    </Router>
    );

    fireEvent.click(screen.getByText('Home'))
    const path = document.location.pathname
    expect(path).toEqual('/')
})

test('Clicking the login button takes us to the "/login" path', () => {
    render(
    
    <Router>
        <Navbar/>
    </Router>
    );


    fireEvent.click(screen.getByText('Login'))
    const path = document.location.pathname
    expect(path).toEqual('/login')
})

test('Clicking the register button takes us to the "/register" path', () => {
    render(
    
    <Router>
        <Navbar/>
    </Router>
    );


    fireEvent.click(screen.getByText('Register'))
    const path = document.location.pathname
    expect(path).toEqual('/register')
})