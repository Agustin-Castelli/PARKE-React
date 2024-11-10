import { Card } from "react-bootstrap";
import PropTypes  from "prop-types";

const ProductItem = ({name, code, img }) => {

    return(
        <>
            <Card style={{ width: "13rem", height: "20rem" }}>
            <Card.Img
              variant="top"
              src={img}
              alt="Imagen del producto"
              height={175}
            />
            <hr></hr>
            <Card.Body className="py-1 mx-1">
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