import { useState } from "react"
import styled from "styled-components"
import loading from "./../../assets/Loading_icon.gif"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"



export default function SeatsPage() {

    const navigate = useNavigate();

    const [session, setSession] = useState(undefined)
    const [selectSeat, setselectSeat] = useState([]);
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const params = useParams();
    console.log(params)

    useEffect( () => {

        const urlget = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${params.idSessao}/seats`;

        const promise = axios.get(urlget)

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



    function confirm(e) {
        e.preventDefault();

        const order = {ids: selectSeat, name: name, cpf: cpf}
        console.log(order)

        const urlpost = 'https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many'

        const promise = axios.post(urlpost, order)

        promise.then( answer => {navigate('/sucesso', { state: {order, session} })})
        promise.catch(err => err.data)
    }

    function selectSeats(seat) {
        if(selectSeat.includes(seat) ) {
            seat.selected = false;
            const arr = selectSeat.filter(seat => seat.selected === true)
            console.log(arr)
            setselectSeat(arr)
            return seat.isAvailable = true
        }
        if (seat.isAvailable === false) {
            return alert("Esse assento não está disponível")
        }
        if (seat.isAvailable) {
            seat.selected = true;
            const arr = [...selectSeat, seat.id];
            setselectSeat(arr)      
            console.log(arr)

        }
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer>
            {seats.map( seat =>  (
                <SeatItem key={seat.id} isAvailable={seat.isAvailable} data-test="seat" selected={seat.selected} onClick={() => selectSeats(seat)}>{seat.name}</SeatItem>
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
                <form onSubmit={confirm}>
                <label htmlFor="name">Nome do Comprador:</label>
                <input placeholder="Digite seu nome..." data-test="client-name" type="text" required id="nome" 
                value={name} onChange={(e) => setName(e.target.value)}/>

                <label htmlFor="cpf">CPF do Comprador:</label>
                <input placeholder="Digite seu CPF..." data-test="client-cpf" type="text"  required id="cpf" 
                value={cpf} onChange={(e) => setCpf(e.target.value)}/> 

                <button data-test="book-seat-btn" type="submit" style={{textDecoration: 'none',alignSelf: "center",}}>Reservar Assento(s)</button>
                </form>
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
    background-color: ${props => (props.isAvailable === false ? '#FBE192' : (props.selected === true ? '#0E7D71' : '#C3CFD9'))};
    border: 1px solid ${props => (props.isAvailable === false ? '#F7C52B' : (props.selected === true ? "#1AAE9E" : '#7B8B99'))};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    cursor: pointer;
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