import { Container, Row, Col, Image, Button, Badge, Table, Alert, Spinner } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { useState } from "react"

export function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const {
    products,
    loading,
    error,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()

  const [isZoomed, setIsZoomed] = useState(false)
  const [selectedStorage, setSelectedStorage] = useState("256 GB")

  // Find product from API data instead of imported JSON
  const item = products.find(item => item.id === parseInt(id || ""))
  
  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading product details...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Connection Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    )
  }

  if (!item) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="warning">
          <Alert.Heading>Product Not Found</Alert.Heading>
          <p>The product you're looking for doesn't exist or may have been removed.</p>
         
        </Alert>
      </Container>
    )
  }

  // Set initial selected storage based on product
  if (selectedStorage === "256 GB" && item.storage !== "256 GB") {
    setSelectedStorage(item.storage)
  }

  const quantity = getItemQuantity(item.id)
  const discount = 0.2
  const mrp = Math.round(item.price / (1 - discount))
  const rating = 4.5
  const ratingCount = Math.floor(Math.random() * 5000) + 100
  const reviewCount = Math.floor(Math.random() * 500) + 50

  const imageStyle = {
    objectFit: "contain" as const,
    transition: "transform 0.3s ease",
    transform: isZoomed ? "scale(1.5)" : "scale(1)",
  }

  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 3)
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  })

  const highlights = [
    `${item.storage} Storage`,
    `Camera: ${item.camera}`,
    `Battery: ${item.battery}`,
    `${item.description}`,
  ]

  const specifications = [
    { key: "Name", value: item.name },
    { key: "Category", value: item.category },
    { key: "Storage", value: item.storage },
    { key: "Camera", value: item.camera },
    { key: "Battery", value: item.battery },
    { key: "Price", value: formatCurrency(item.price) },
  ]

  // Generate storage options based on common variants
  const storageOptions = ["128 GB", "256 GB", "512 GB"]

  return (
    <Container className="mt-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Button variant="link" className="p-0" onClick={() => navigate("/")}>
              Home
            </Button>
          </li>
          <li className="breadcrumb-item">
            <Button variant="link" className="p-0" onClick={() => navigate("/store")}>
              Store
            </Button>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {item.name}
          </li>
        </ol>
      </nav>

      <Row>
        {/* Image Section */}
        <Col md={6} className="mb-4 mb-md-0">
          <div
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            style={{
              overflow: "hidden",
              borderRadius: "10px",
              border: "1px solid #ddd",
              padding: "15px",
              background: "#fff",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              cursor: "zoom-in"
            }}
          >
            <Image 
              src={item.imgUrl} 
              fluid 
              style={imageStyle} 
              alt={item.name}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/imgs/placeholder.png" // Fallback image
              }}
            />
          </div>
          
          {/* Additional product images could go here */}
          <div className="mt-3 d-flex gap-2">
            <div 
              className="border rounded p-2" 
              style={{ width: "80px", height: "80px", cursor: "pointer" }}
            >
              <img 
                src={item.imgUrl} 
                alt={item.name} 
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>
        </Col>

        {/* Details Section */}
        <Col md={6}>
          <div className="sticky-top" style={{ top: "2rem" }}>
            <h1 className="fw-bold mb-3">{item.name}</h1>

            {/* Category Badge */}
            <Badge bg="success" className="mb-3 fs-6 px-3 py-2">
              {item.category}
            </Badge>

            {/* Rating */}
            <div className="d-flex align-items-center mb-3">
              <Badge bg="success" className="me-2">{rating}★</Badge>
              <span className="text-muted">
                {ratingCount.toLocaleString()} Ratings & {reviewCount.toLocaleString()} Reviews
              </span>
            </div>

            {/* Price */}
            <div className="d-flex align-items-baseline mb-4">
              <span className="fs-2 fw-bold text-primary">{formatCurrency(item.price)}</span>
              <span className="ms-3 text-muted fs-5">
                <del>{formatCurrency(mrp)}</del>
              </span>
              <span className="ms-2 text-success fw-semibold">
                {Math.round(discount * 100)}% off
              </span>
            </div>

            {/* Offers */}
            <div className="mb-4 p-3 bg-light rounded">
              <h6 className="fw-bold mb-2">
                <i className="bi bi-gift me-2"></i>
                Available Offers
              </h6>
              <ul className="mb-0 small">
                <li>Bank Offer: 5% cashback on SBI Credit Card</li>
                <li>Bank Offer: Flat ₹500 off on EMI purchases above ₹10,000</li>
                <li>Special Discount: Extra 2% off with App Payment</li>
              </ul>
            </div>

            {/* Storage Options */}
            <div className="mb-4">
              <h6 className="fw-bold mb-2">
                <i className="bi bi-hdd me-2"></i>
                Select Storage
              </h6>
              {storageOptions.map(storageOption => (
                <Button
                  key={storageOption}
                  variant={selectedStorage === storageOption ? "primary" : "outline-primary"}
                  className="me-2 mb-2"
                  size="sm"
                  onClick={() => setSelectedStorage(storageOption)}
                >
                  {storageOption}
                </Button>
              ))}
            </div>

            {/* Delivery */}
            <div className="mb-4 p-3 border rounded">
              <div className="d-flex align-items-center">
                <i className="bi bi-truck text-success me-2"></i>
                <div>
                  <strong>Delivery by: </strong>
                  <span className="text-success">{formattedDeliveryDate}</span>
                </div>
              </div>
            </div>

            {/* Cart Controls */}
            <div className="mb-4">
              {quantity === 0 ? (
                <Button 
                  className="w-100" 
                  size="lg"
                  onClick={() => increaseCartQuantity(item.id)}
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  Add To Cart
                </Button>
              ) : (
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-center align-items-center gap-3 p-3 border rounded">
                    <Button 
                      variant="outline-secondary"
                      onClick={() => decreaseCartQuantity(item.id)}
                      style={{ width: "40px", height: "40px", fontSize: "18px" }}
                    >
                      −
                    </Button>
                    <div className="text-center">
                      <div className="fs-3 fw-bold">{quantity}</div>
                      <small className="text-muted">in cart</small>
                    </div>
                    <Button 
                      variant="outline-secondary"
                      onClick={() => increaseCartQuantity(item.id)}
                      style={{ width: "40px", height: "40px", fontSize: "18px" }}
                    >
                      +
                    </Button>
                  </div>
                  
                  <div className="d-flex gap-2">
                    <Button 
                      variant="outline-danger" 
                      className="flex-grow-1"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="bi bi-trash me-2"></i>
                      Remove
                    </Button>
                    <Button 
                      variant="success" 
                      className="flex-grow-1"
                      onClick={() => increaseCartQuantity(item.id)}
                    >
                      <i className="bi bi-plus me-2"></i>
                      Add More
                    </Button>
                  </div>
                  
                  <div className="text-center p-3 bg-light rounded">
                    <strong className="fs-5 text-primary">Subtotal: {formatCurrency(item.price * quantity)}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>

      {/* Additional Details Section */}
      <Row className="mt-5">
        <Col md={6}>
          {/* Highlights */}
          <div className="mb-4">
            <h4 className="fw-bold mb-3">
              <i className="bi bi-star me-2"></i>
              Highlights
            </h4>
            <ul className="list-unstyled">
              {highlights.map((highlight, idx) => (
                <li key={idx} className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </Col>

        <Col md={6}>
          {/* Specifications */}
          <div className="mb-4">
            <h4 className="fw-bold mb-3">
              <i className="bi bi-info-circle me-2"></i>
              Specifications
            </h4>
            <Table striped hover responsive>
              <tbody>
                {specifications.map(spec => (
                  <tr key={spec.key}>
                    <td className="fw-semibold" style={{ width: "40%" }}>{spec.key}</td>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      {/* Description */}
      <Row className="mt-4">
        <Col>
          <div className="p-4 bg-light rounded">
            <h4 className="fw-bold mb-3">
              <i className="bi bi-file-text me-2"></i>
              Description
            </h4>
            <p className="mb-0 fs-6 lh-lg">{item.description}</p>
          </div>
        </Col>
      </Row>

      {/* Navigation Buttons */}
      <Row className="mt-4 mb-5">
        <Col>
          <div className="d-flex gap-2">
            <Button 
              variant="outline-secondary"
              onClick={() => navigate("/store")}
            >
              <i className="bi bi-arrow-left me-2"></i>
            </Button>
            <Button 
              variant="outline-primary"
              onClick={() => navigate("/")}
            >
              <i className="bi bi-house me-2"></i>
              Home
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}