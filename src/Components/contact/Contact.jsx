import { Card, CardBody, CardText } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaInstagram, FaDiscord } from 'react-icons/fa';

const Contact = () => {

return (
    <div className="d-flex justify-content-center flex-column align-items-center">
        <h2 className="mt-5 mb-3 text-info">Datos de contacto del desarrollador:</h2>
        <Card className="shadow-lg w-25" style={{ width: '20rem', borderRadius: '10px' }}>
            <CardBody className="bg-dark text-white">
                <CardText>
                    <p><FaEnvelope className="me-2" /> Correo electrónico: agustincastelli2000@gmail.com</p>
                    <p><FaPhone className="me-2" /> Teléfono: 3413041103</p>
                    <p><FaInstagram className="me-2" /> Instagram: <a href="https://www.instagram.com/agus.castelli/?hl=es-la" className="text-info" target="_blank" rel="noopener noreferrer">@agus.castelli</a></p>
                    <p><FaDiscord className="me-2" /> Discord: <span className="text-info">Agus Castelli#0388</span></p>
                </CardText>
            </CardBody>
        </Card>
    </div>
);

}

export default Contact;