import { Container, Nav, Navbar as NavbarBs, Button } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"

export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart()

  return (
    <NavbarBs sticky="top" expand="lg" className="bg-light shadow-sm mb-4">
      <Container>
        {/* Brand */}
        <NavbarBs.Brand as={NavLink} to="/" className="fw-bold fs-3">
          VERTO
        </NavbarBs.Brand>

        {/* Toggle for mobile */}
        <NavbarBs.Toggle aria-controls="responsive-navbar-nav" />
        <NavbarBs.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
          </Nav>

          {/* Shopping Cart Button */}
          <Button
            variant="outline-primary"
            onClick={openCart}
            className="position-relative d-flex align-items-center"
            style={{ fontSize: "1.5rem" }}
          >
            {/* Shopping cart symbol */}
            <i className="bi bi-cart3"></i>

            {/* Badge for item count */}
            {cartQuantity > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {cartQuantity}
              </span>
            )}
          </Button>
        </NavbarBs.Collapse>
      </Container>
    </NavbarBs>
  )
}
