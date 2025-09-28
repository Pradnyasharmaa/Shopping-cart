import { Button, Stack, Badge, ButtonGroup } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"

type CartItemProps = {
  id: number
  quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity, products } = useShoppingCart()
  const item = products?.find(i => i.id === id)
  
  if (!item) {
    // Show loading placeholder if product not found yet
    return (
      <Stack
        direction="horizontal"
        gap={3}
        className="align-items-center p-3 bg-white shadow-sm rounded"
      >
        <div 
          className="placeholder-glow bg-light rounded"
          style={{ width: "80px", height: "60px" }}
        ></div>
        <div className="me-auto">
          <div className="placeholder-glow">
            <span className="placeholder col-8 mb-1"></span>
            <span className="placeholder col-6"></span>
          </div>
        </div>
        <div className="placeholder-glow">
          <span className="placeholder col-4"></span>
        </div>
      </Stack>
    )
  }

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="align-items-center p-3 bg-white shadow-sm rounded"
      style={{ 
        transition: "all 0.2s ease-in-out",
        border: "1px solid #e9ecef"
      }}
    >
      {/* Product Image */}
      <img
        src={item.imgUrl}
        alt={item.name}
        style={{ 
          width: "60px", 
          height: "60px", 
          objectFit: "contain", 
          borderRadius: "4px",
          backgroundColor: "#f8f9fa"
        }}
      />

      {/* Product Info */}
      <div className="me-auto" style={{ minWidth: "0", flex: "1" }}>
        <div className="fw-semibold mb-1" style={{ fontSize: "0.9rem", lineHeight: "1.2" }}>
          {item.name}
        </div>
        <div className="text-muted d-flex align-items-center gap-2" style={{ fontSize: "0.75rem" }}>
          <span>{formatCurrency(item.price)} each</span>
          <Badge bg="success" text="white" className="px-2 py-1" style={{ fontSize: "0.7rem" }}>
            {item.category}
          </Badge>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="d-flex align-items-center gap-2">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => decreaseCartQuantity(id)}
          style={{ 
            width: "30px", 
            height: "30px", 
            fontSize: "14px", 
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          −
        </Button>
        <span 
          className="fw-bold mx-2"
          style={{ 
            minWidth: "20px", 
            textAlign: "center", 
            fontSize: "16px",
            color: "#000"
          }}
        >
          {quantity}
        </span>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => increaseCartQuantity(id)}
          style={{ 
            width: "30px", 
            height: "30px", 
            fontSize: "14px", 
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          +
        </Button>
      </div>

      {/* Total Price and Remove */}
      <div className="text-end" style={{ minWidth: "100px" }}>
        <div className="fw-bold mb-2" style={{ color: "#0d6efd", fontSize: "1.1rem" }}>
          {formatCurrency(item.price * quantity)}
        </div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart(id)}
          className="px-2"
          style={{ fontSize: "0.75rem" }}
        >
          Remove
        </Button>
      </div>
    </Stack>
  )
}