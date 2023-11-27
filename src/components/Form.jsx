import {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import useSelectCurrencies from '../Hooks/useSelectCurrencies'
import currencies from '../Data/data'
import Error from '../components/Error'
const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover{
        background-color: #4a4df7;
        cursor: pointer;
    }
`

const Form = ({setMonedas}) => {
    const [cryptos, setCryptos] = useState([])
    const [error, setError] = useState(false)
    const [currencie, SelectCurrencies] = useSelectCurrencies('Choose currency', currencies);
    const [cryptocoin, SelectCryptos] = useSelectCurrencies('Choose crypto', cryptos);

    useEffect(() => {
        const consultAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const answer = await fetch(url)
            const result = await answer.json()
            const arrayCriptos = result.Data.map(cripto => {
                const object = {
                    id: cripto.CoinInfo.Name,
                    name: cripto.CoinInfo.FullName
                }
                return object
            })
            setCryptos (arrayCriptos)
        }
        consultAPI();
    },[])

    const handleSubmit = e =>{
        e.preventDefault()
        if([currencie, cryptocoin].includes('')) {
            setError(true);
        } else {
            setError(false);
            setMonedas({
                currencie,
                cryptocoin,
            })
        }
    }

    return (
        <>
            {error && <Error>Select all fields</Error>}
            <form
                onSubmit={handleSubmit}
            >
                <SelectCurrencies />
                <SelectCryptos />
                <InputSubmit 
                    type="submit" value="Quote"
                />
            </form>
        </>
    )
}

export default Form