import { Card } from "react-bootstrap";
import PropTypes  from "prop-types";

const ProductItem = ({name, code, img }) => {

    return(
        <>
            <Card className="bg-dark text-white" style={{ width: "13rem", height: "20rem" }}>
            <Card.Img
              variant="top"
              src={img}
              alt="Imagen del producto"
              height={175}
            />
            <Card.Body className="py-1 my-3">
              <Card.Title className="mb-4">{name}</Card.Title>
              <Card.Text>Código: {code}</Card.Text>
            </Card.Body>
          </Card>
        </>
    )
};

ProductItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    code: PropTypes.string,
    img: PropTypes.string
}

export default ProductItem;