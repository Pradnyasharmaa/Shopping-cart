import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Store } from "./pages/Store"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { ProductDetails } from "./pages/ProductDetails"

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Store />} /> {/* Store is now the home page */}
          <Route path="/store/:id" element={<ProductDetails />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App
