import React from 'react'
import styled from 'styled-components';
import AppLayout from '../../components/layout/AppLayout'
import CardMember from './CardMember';
import franco_tarchini from '../../assets/img/franco_tarchini.jpg';

const Members = () => {
    return (
        <AppLayout>
            <Container>
                <PageTitle>
                    Integrantes
                </PageTitle>
                <CardsWrapper>
                    <CardMember name="Franco Tarchini" legajo="45.189" email="francotarchini97@gmail.com" img={franco_tarchini} />
                    <CardMember name="Franco Tarchini" legajo="45.189" email="francotarchini97@gmail.com" img={franco_tarchini} />
                    <CardMember name="Franco Tarchini" legajo="45.189" email="francotarchini97@gmail.com" img={franco_tarchini} />
                    <CardMember name="Franco Tarchini" legajo="45.189" email="francotarchini97@gmail.com" img={franco_tarchini} />
                    <CardMember name="Franco Tarchini" legajo="45.189" email="francotarchini97@gmail.com" img={franco_tarchini} />
                    <CardMember name="Franco Tarchini" legajo="45.189" email="francotarchini97@gmail.com" img={franco_tarchini} />
                    <CardMember name="Franco Tarchini" legajo="45.189" email="francotarchini97@gmail.com" img={franco_tarchini} />
                </CardsWrapper>
            </Container>
        </AppLayout>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
`;

const PageTitle = styled.h1`
font-size: 20px;
font-weight: bolder;
padding: 10px;
`;

const CardsWrapper = styled.div`
display: flex;
flex-wrap: wrap;
padding: 20px;
justify-content: space-around;
`;

export default Members