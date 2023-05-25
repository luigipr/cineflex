import { useState } from "react"
import styled from "styled-components"
import loading from "./../../assets/Loading_icon.gif"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"



export default function SeatsPage() {

    const [session, setSession] = useState(undefined)

    const params = useParams();
    console.log(params)

    useEffect( () => {

        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${params.idSessao}/seats`;

        const promise = axios.get(url)

        promise.then((answer) => {
            setSession(answer.data);
            console.log(answer.data)
          })
        promise.catch((erro) => {
            console.log(erro.response.data);}
            );
    }, [params])


    if (session === undefined) {
        return (<Loading><img src={loading} /></Loading>);
      }

    const seats = session.seats;  

    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer>
            {seats.map( seat =>  (
                <SeatItem key={seat.id} isAvailable={seat.isAvailable} data-test="seat">{seat.name}</SeatItem>
            ))}               
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem> 
                    <CaptionCircle color="#1AAE9E" border='#0E7D71'/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color="#C3CFD9" border='#7B8B99'/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color="#FBE192" border='#F7C52B'/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." data-test="client-name"/>

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." data-test="client-cpf"/>

                <button data-test="book-seat-btn">Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer  data-test="footer">
                <div>
                    <img src={session.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{session.movie.title}</p>
                    <p>{session.day.weekday} - {session.day.date}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content:center;
    padding-top: 300px;
`

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.border};
    background-color: ${props => props.color};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    background-color: ${props => (props.isAvailable === true ? '#C3CFD9' : '#FBE192')};
    border: 1px solid ${props => (props.isAvailable === true ? '#7B8B99' : '#F7C52B')};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`