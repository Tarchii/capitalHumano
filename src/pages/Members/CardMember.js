import { Card } from 'antd';
import styled from 'styled-components';
const { Meta } = Card;
const CardMember = ({ name, legajo, email, img }) => (
    <Card
        hoverable
        style={{
            width: 240,
            margin: 10,
        }}
        cover={<img alt="member image" src={img} />}
    >
        <Meta title={`[${legajo}] ${name}`} description={email} />
    </Card>
);

const Descriptions = styled.div`
display: flex;
flex-direction: column;
`;

export default CardMember;