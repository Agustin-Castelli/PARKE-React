import { Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetails = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const {id, name, code, img} = location.state.product;

    const clickHandler = () => {
        navigate("/home");
    };

    return (
        <Card className="my-3">
        <Card.Img
        height={300}
        variant="top"
        src={img !== "" ? img : "https://bit.ly/47NylZk"}
        />
        <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>{id}</Card.Subtitle>
        <p className="my-1">
        <b>Código</b>: {code}{" "}
        </p>
        <Button className="me-2" onClick={clickHandler}>
        Volver a la página principal
        </Button>
        </Card.Body>
        </Card>
    );

};

export default ProductDetails;