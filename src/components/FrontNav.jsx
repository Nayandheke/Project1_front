import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import http from "../http"
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"

export const FrontNav = () => {
  const [categories, setCategories] = useState([])
  const [choices, setChoices] = useState([])

  useEffect(() =>{
    http.get('categories')
        .then(({data}) => {
          setCategories(data)
          return http.get('choices')
        })
        .then(({data}) => setChoices(data))
        .catch(err => {})
  },[])


    return <> 
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Nav className="mx-auto mb-2 mb-lg-0">
            <Nav.Item>
              <Link to="/" className="nav-link text-light">Home</Link>
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
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </>

}