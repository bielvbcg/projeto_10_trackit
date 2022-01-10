import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import styled from 'styled-components';
import axios from 'axios';
import Loader from "react-loader-spinner";

import logo from "../assets/trackit-logo.png"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [nome, setNome] = useState("")
  const [foto, setFoto] = useState("")
  const [botaoClickado, setBotaoClickado] = useState(false)

  let navigate = useNavigate()

  function logar(event) {
    event.preventDefault()

    const cadastro = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      {
        email: email,
        name: nome,
        image: foto,
        password: senha,
      })

    setBotaoClickado(true)

    cadastro.then((r) => {
      navigate("/")
      setBotaoClickado(false)
    })

    cadastro.catch(error => {
      alert(error.response.data.message)
      setBotaoClickado(false)
    })
  }

  return (
    <Main>

      <img src={logo} alt="Track It" />

      <form onSubmit={logar}>

        <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} disabled={botaoClickado} />
        <input type="password" placeholder="senha" value={senha} onChange={e => setSenha(e.target.value)} disabled={botaoClickado} />
        <input type="text" placeholder="nome" value={nome} onChange={e => setNome(e.target.value)} disabled={botaoClickado} />
        <input type="text" placeholder="foto" value={foto} onChange={e => setFoto(e.target.value)} disabled={botaoClickado} />

        <Button type='submit' disabled={botaoClickado}>
          {botaoClickado ?
            <Loader
              type="ThreeDots"
              color="#FFFFFF"
              height={50}
              width={50}
            /> :
            "Cadastrar"}
        </Button>

      </form>

      <StyledLink to={"/"}>Já tem uma conta? Faça login!</StyledLink>

    </Main>
  )
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding-top: 68px;

  img {
    width: 180px;
    height: 180px;
    margin-bottom: 30px;
  }

  form {
    display: flex;
    flex-direction: column;

    gap: 6px;
    margin-bottom: 25px;
  }

  form input {
    width: 303px;
    height: 45px;

    border: 1px solid #D5D5D5;
    border-radius: 5px;

    ${props => props.disabled && "background-color: #F2F2F2"}
  }

  form input::placeholder {
    color: #DBDBDB;
    padding-left: 11px;
  }
`

const Button = styled.button`
  width: 303px;
  height: 45px;

  background: ${props => props.disabled ? "#86CCFF" : "#52B6FF"};
  border-radius: 4.63636px;
  border: none;

  color: #FFFFFF;
  font-size: 20.976px;
  line-height: 26px;
`

const StyledLink = styled(Link)`
    color: #52B6FF;
`