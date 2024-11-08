import { Card, CardBody, CardFooter, CardHeader, Button } from "react-bootstrap";
import PropTypes  from "prop-types";
import { useNavigate } from "react-router-dom";

const ProductItem = ({name, code, img }) => {

    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(`product/:id`, {
            state: {
                product: {
                    name,
                    code,
                    img
                }
            }
        })
    }

    return(
        <>
            <Card border="warning" className="my-3 w-100 p-1">
                <CardHeader>
                    {name}
                </CardHeader>
                <CardBody>
                    {code}
                    <hr/>
                    {img}
                </CardBody>
                <CardFooter>
                    <Button onClick={clickHandler}>
                        Ver más
                    </Button>
                </CardFooter>
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