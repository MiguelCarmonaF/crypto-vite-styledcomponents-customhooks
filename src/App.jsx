import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import imgcrypto from './assets/imagen-criptos.png'
import Form from './components/form'
import Result from './components/result'
import Spinner from './components/Spinner'

const Heading = styled.h1 `
  font-family: 'Lato', sans-serif;
  color: #FFF; 
  text-align:center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;
  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

const Container= styled.div `
  max-width: 900px;
  margin: 0 auto; 
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Img = styled.img `
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

function App() {
 
  const [monedas, setMonedas] = useState({})
  const [result, setResult] = useState({})
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if(Object.keys(monedas).length > 0){
      const quoteCrypto = async () =>{
        setLoad(true)
        setResult({})
        const {currencie, cryptocoin} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocoin}&tsyms=${currencie}`
        const answer = await fetch(url)
        const result = await answer.json()
        setResult(result.DISPLAY[cryptocoin][currencie])
        setLoad(false)
      }
      quoteCrypto()
    }
  }, [monedas])

  return (
    <>
      <Container>
        <Img 
          src={imgcrypto}
          alt="Cryptos img"
        />
        <div>
          <Heading>Quote cryptocurrencies instantly</Heading>
          <Form
            setMonedas={setMonedas}
          />
          {load && <Spinner/>}
          {result.PRICE && <Result result={result}/>}
        </div>
        
      </Container>
    </>
  )
}

export default App
