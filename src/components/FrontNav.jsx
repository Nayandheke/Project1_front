import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import http from "../http"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch } from "react-redux";

export const FrontNav = () => {
  const [categories, setCategories] = useState([])
  const [choices, setChoices] = useState([])
  const[term, setTerm] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() =>{
    http.get('categories')
        .then(({data}) => {
          setCategories(data)
          return http.get('choices')
        })
        .then(({data}) => setChoices(data))
        .catch(err => {})
  },[])
  
  const handleSubmit = ev => {
    ev.preventDefault()

    navigate(`/search?term=${term}`)
  }

    return <> 
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand ><Link className="text-decoration-none" to="/"><h1 className="text-dark">Navigate</h1></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Nav className="mx-auto mb-2 mb-lg-0">
            <Nav.Item>
              <Link to="/" className="nav-link text-dark">Home</Link>
            </Nav.Item>
            <Nav.Item>
              <NavDropdown title="Activities">
                {categories.map(category => <Link to={`/category/${category._id}`} className="dropdown-item" key={category._id}>{category.name}</Link>)}
              </NavDropdown>
            </Nav.Item>
            <Nav.Item>
              <NavDropdown title="Trekking">
              {choices.map(choice => <Link to={`/choice/${choice._id}`} className="dropdown-item" key={choice._id}>{choice.name}</Link>)}
              </NavDropdown>
            </Nav.Item>
          </Nav>
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              name="term" onChange={ev => setTerm(ev.target.value)}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>

}