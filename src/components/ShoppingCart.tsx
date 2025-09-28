import { Offcanvas, Stack, Button, Badge, Alert } from "react-bootstrap"
import { useState } from "react"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { CartItem } from "./CartItem"

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, products, clearCart } = useShoppingCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null)

  const handleCheckout = async () => {
    if (cartItems.length === 0) return

    try {
      setIsCheckingOut(true)
      setCheckoutMessage(null)
      
      // Send cart data to backend API
      const response = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        setCheckoutMessage(
          `🎉 Order placed successfully!\n\n` +
          `📋 Order ID: ${result.orderId}\n` +
          `💰 Total: ${formatCurrency(result.totalAmount)}\n` +
          `📦 Items: ${result.itemCount}\n\n` +
          `Check the backend console for detailed order information!`
        )
        
        console.log("✅ Checkout successful! Order details:", result)
        
        // Clear cart after successful checkout
        setTimeout(() => {
          clearCart()
          closeCart()
          setCheckoutMessage(null)
        }, 3000)
        
      } else {
        throw new Error(result.message || 'Checkout failed')
      }
      
    } catch (error) {
      console.error('Checkout error:', error)
      setCheckoutMessage(
        `❌ Checkout failed!\n\n` +
        `${error instanceof Error ? error.message : 'Network error'}\n\n` +
        `Please make sure the backend server is running on http://localhost:5000`
      )
    } finally {
      setIsCheckingOut(false)
    }
  }

  const total = cartItems.reduce((sum, cartItem) => {
    const item = products.find(i => i.id === cartItem.id)
    return sum + (item?.price || 0) * cartItem.quantity
  }, 0)

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Offcanvas
      show={isOpen}
      onHide={closeCart}
      placement="end"
      style={{ width: "450px", maxWidth: "100%" }}
      className="shadow-lg"
    >
      <Offcanvas.Header closeButton className="bg-light border-bottom">
        <Offcanvas.Title className="fw-bold fs-5">
          <i className="bi bi-cart3 me-2"></i> 
          Your Cart
          <Badge bg="primary" className="ms-2">
            {totalItems}
          </Badge>
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column p-3">
        {checkoutMessage && (
          <Alert variant={checkoutMessage.includes('❌') ? 'danger' : 'success'} className="mb-3">
            <div style={{ whiteSpace: 'pre-line', fontSize: '0.9rem' }}>
              {checkoutMessage}
            </div>
          </Alert>
        )}

        {cartItems.length === 0 ? (
          <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
            <i className="bi bi-cart-x fs-1 text-muted mb-3"></i>
            <h5 className="text-muted mb-2">Your cart is empty</h5>
            <p className="text-muted fs-6 mb-3">
              Add some amazing smartphones to get started!
            </p>
            <Button variant="primary" onClick={closeCart}>
              <i className="bi bi-shop me-2"></i>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <Stack 
              gap={3} 
              className="flex-grow-1 mb-3 overflow-auto" 
              style={{ maxHeight: "calc(100vh - 250px)" }}
            >
              {cartItems.map(item => (
                <CartItem key={item.id} {...item} />
              ))}
            </Stack>

            <div className="border-top pt-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <div className="fw-bold fs-5">Total:</div>
                  <small className="text-muted">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </small>
                </div>
                <div className="fw-bold fs-4 text-primary">
                  {formatCurrency(total)}
                </div>
              </div>

              <div className="d-flex gap-2">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={clearCart}
                  disabled={isCheckingOut}
                  className="flex-shrink-0"
                >
                  <i className="bi bi-trash me-1"></i>
                  Clear
                </Button>
                
                <Button
                  onClick={handleCheckout}
                  variant="success"
                  disabled={cartItems.length === 0 || isCheckingOut}
                  className="w-100 d-flex justify-content-center align-items-center"
                  style={{ fontSize: "1rem", padding: ".6rem" }}
                >
                  {isCheckingOut ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-bag-check me-2"></i> 
                      Checkout ({formatCurrency(total)})
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  )
}