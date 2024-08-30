import React, { useState } from 'react'
import Header from '../components/Header'
import { styled } from 'styled-components'
import { useParams } from 'react-router-dom'
import ButtonBack from '../components/ButtonBack'
import APIWrapper from '../API/APIWrapper'

const PaymentPage = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [cardNumber, setCardNumber] = useState<string>('')
    const [cvc, setCvc] = useState<string>('')
    const [amount, setAmount] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const params = useParams()
    const api = APIWrapper()

    const handlePayment = async () => {
        try {
            const body = {
                number: 4242424242424242,
                cvc: Number(cvc),
                amount: Number(amount),
                description: description,
            }
            const response = await api.post(`payment/${params.id}`, body)
            if (response.status === 200) {
                console.log(response)
            } else {
                console.log('Payment failed: ', response)
            }
        } catch (e) {
            console.log('Error: ', e)
        }
    }

    return (
        <>
            <Container>
                <Header search={searchValue} setSearch={setSearchValue} />
                <Wrapper>
                    <PaymentForm onSubmit={handlePayment}>
                        <ButtonBack />
                        <FormBody>
                            <h1>Payment</h1>
                            <FormLabel>Card number</FormLabel>
                            <FormInput
                                type="number"
                                value={cardNumber}
                                onChange={(event) =>
                                    setCardNumber(event.target.value)
                                }
                            />
                            <FormLabel>cvc</FormLabel>
                            <FormInput
                                type="number"
                                value={cvc}
                                onChange={(event) => setCvc(event.target.value)}
                            />
                            <FormLabel>Amount</FormLabel>
                            <FormInput
                                type="number"
                                value={amount}
                                onChange={(event) =>
                                    setAmount(event.target.value)
                                }
                            />
                            <FormLabel>Description</FormLabel>
                            <FormInput
                                type="string"
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                            />
                            <FormButton type="submit">Pay</FormButton>
                        </FormBody>
                    </PaymentForm>
                </Wrapper>
            </Container>
        </>
    )
}

export default PaymentPage

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`

const Wrapper = styled.div`
    padding-top: 4rem;
    background-color: #cccccc;
    flex: 1;
`
const PaymentForm = styled.form`
    background-color: #e6e6e6;
    width: 40%;
    margin: 2rem auto;
    border-radius: 20px;
    position: relative;
`

const FormBody = styled.div`
    width: 80%;
    display: flex;
    gap: 15px;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    margin: 0 auto;
    padding: 4rem 0;
`

const FormLabel = styled.label``
const FormInput = styled.input`
    height: 40px;
    padding: 10px;
    border: 1px solid #000;
    border-radius: 5px;
    font-size: 20px;
`

const FormButton = styled.button`
    width: 100%;
    height: 50px;
    padding: 10px;
    background: #88d66c;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
`
