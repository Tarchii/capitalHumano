import { Button } from 'antd';
import { theme } from '../utils/constants';
import styled, { css } from 'styled-components';

const CustomButton = styled(Button)`
  background-color: ${theme.primary};
  color: ${theme.white};
  font-weight: bolder;
  padding: 5px 15px;
  border-radius: ${theme.radius};
  height: auto;

  &:hover,
  &:focus,
  &:active {
    border-color: ${theme.primary};
    color: ${theme.primary};
  }

  ${(props) => {
    if (props.danger) {
      return css`
        background: #df4759 !important;
        border-color: #df4759 !important;

        &:hover,
        &:active {
          background: #d9263c !important;
        }
      `;
    }
  }}
`;

export default CustomButton;
