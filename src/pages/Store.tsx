import { useState, useEffect } from "react"
import { Col, Row, Button, Form, Container, Card, Badge } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { formatCurrency } from "../utilities/formatCurrency"

// Type definition for your products
type Product = {
  id: number
  name: string
  price: number
  imgUrl: string
  description: string
  category: string
  storage: string
  camera: string
  battery: string
}

export function Store() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const categories = ["All", "Samsung", "Apple", "OnePlus"]

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:5000/api/products')
        const result = await response.json()
        
        if (result.success) {
          setProducts(result.data)
        } else {
          setError('Failed to fetch products')
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        setError('Network error. Please check if the backend server is running.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredItems = products.filter(item => {
    const categoryMatch =
      selectedCategory === "All" || item.category === selectedCategory
    const searchMatch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading products...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">Make sure your backend server is running on http://localhost:5000</p>
        </div>
      </Container>
    )
  }

  return (
    <Container fluid className="mt-4">
      <Row>
        {/* Sidebar Filters */}
        <Col md={3} className="bg-light p-4 shadow-sm rounded">
          <h4 className="mb-4">Filters</h4>

          {/* Search */}
          <Form.Group className="mb-4">
            <Form.Label>Search Products</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </Form.Group>

          {/* Categories */}
          <div className="mb-4">
            <h6>Brand</h6>
            {categories.map(category => (
              <Form.Check
                key={category}
                type="radio"
                id={`category-${category}`}
                label={category}
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="mb-2"
              />
            ))}
          </div>

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => {
              setSelectedCategory("All")
              setSearchQuery("")
            }}
          >
            Reset Filters
          </Button>
        </Col>

        {/* Product List */}
        <Col md={9}>
          <h3 className="mb-4">
            Smartphones 
            <Badge bg="info" className="ms-2">{filteredItems.length} items</Badge>
          </h3>
          <div className="d-flex flex-column gap-4">
            {filteredItems.length === 0 && (
              <div className="text-center p-5">
                <h5 className="text-muted">No products found.</h5>
              </div>
            )}

            {filteredItems.map(item => (
              <Card key={item.id} className="shadow-sm border-0 hover-shadow flex-row align-items-center">
                <Card.Img
                  variant="top"
                  src={item.imgUrl}
                  style={{ width: "180px", height: "180px", objectFit: "contain", padding: "15px" }}
                />
                <Card.Body className="d-flex flex-column flex-grow-1">
                  <Card.Title className="fs-5 fw-bold">{item.name}</Card.Title>
                  <div className="text-muted mb-2" style={{ fontSize: "0.9rem" }}>{item.description}</div>
                  <div className="mb-2 d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-primary">{formatCurrency(item.price)}</span>
                    <Badge bg="success">{item.category}</Badge>
                  </div>
                  <div className="mt-auto d-flex gap-2">
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/store/${item.id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  )
}