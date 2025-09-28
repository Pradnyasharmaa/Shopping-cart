import { createContext, ReactNode, useContext, useState, useEffect } from "react"

type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number
  quantity: number
}

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

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  cartQuantity: number
  cartItems: CartItem[]
  products: Product[]
  loading: boolean
  error: string | null
  refreshProducts: () => void
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

const CART_STORAGE_KEY = "verto-shopping-cart"

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          setCartItems(parsedCart)
          console.log("📦 Cart loaded from localStorage:", parsedCart.length, "items")
        }
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
        localStorage.removeItem(CART_STORAGE_KEY)
      }
    }
  }, [])

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    // Only save if cartItems is not empty or if we're explicitly clearing it
    if (cartItems.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
      console.log("💾 Cart saved to localStorage:", cartItems.length, "items")
    } else {
      // If cart is empty, remove from localStorage to keep it clean
      localStorage.removeItem(CART_STORAGE_KEY)
      console.log("🗑️ Empty cart removed from localStorage")
    }
  }, [cartItems])

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('http://localhost:5000/api/products')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.success) {
        setProducts(result.data)
      } else {
        throw new Error(result.message || 'Failed to fetch products')
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setError(error instanceof Error ? error.message : 'Network error. Please check if the backend server is running.')
    } finally {
      setLoading(false)
    }
  }

  // Fetch products on mount
  useEffect(() => {
    fetchProducts()
  }, [])

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  function clearCart() {
    setCartItems([])
    localStorage.removeItem(CART_STORAGE_KEY)
    console.log("🛒 Cart cleared completely")
  }

  function refreshProducts() {
    fetchProducts()
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        clearCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        products,
        loading,
        error,
        refreshProducts,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}

// Import ShoppingCart component here to avoid circular dependency
import { ShoppingCart } from "../components/ShoppingCart"