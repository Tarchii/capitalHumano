import styled from "styled-components";
import { Input } from "antd";
import { theme } from "../utils/constants";

const CustomInput = styled(Input)`
  border-radius: ${theme.radius};
  padding: 13px 20px;
  font-size: 17px;

  .ant-input {
    font-size: 17px;
  }
`;

export default CustomInput;