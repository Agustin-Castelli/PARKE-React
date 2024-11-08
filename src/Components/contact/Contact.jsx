import { Card, CardBody, CardText } from "react-bootstrap";

const Contact = () => {
    return(
        <div className="d-flex justify-content-center">
            <h2>Datos de contacto del desarrollador:</h2>
            <Card>
                <CardBody>
                    <CardText>
                        Correo electrónico: agustincastelli2000@gmail.com
                    </CardText>
                </CardBody>
            </Card>
            
        </div>
    )

}

export default Contact;