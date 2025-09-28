import { Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

type StoreItemProps = {
  id: number
  name: string
  price: number
  imgUrl: string
  description: string
  category: string
}

export function StoreItem({
  id,
  name,
  price,
  imgUrl,
  description,
  category,
}: StoreItemProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/store/${id}`) // Navigate to a detailed view
  }

  return (
    <Card className="h-100" onClick={handleClick} style={{ cursor: "pointer" }}>
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "contain" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{price}</span>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}
