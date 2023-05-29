import styled from "styled-components"
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SuccessPage() {

    const status = useLocation().state; 
    console.log(status);
    const seats = status.orderFinal.ids
    console.log(seats)
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{status.session.movie.title}</p>
                <p>{status.session.day.date} - {status.session.name}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                {/* <strong><p>Ingressos</p></strong> */}

                {seats.map( (id) => (
                    <p key='status.orderFinal.ids'>Assento {id.name}</p>
                ))} 
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {status.order.name}</p>
                <p>CPF: {status.order.cpf}</p>
            </TextContainer>
            <Link to='/'>
            <button data-test="go-home-btn" >Voltar para Home</button>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 20px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
        cursor: pointer;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`