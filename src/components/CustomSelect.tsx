import { Select } from "antd";
import styled from "styled-components";

const CustomSelect = styled(Select)`
  .ant-select-selector {
    border-radius: 6px !important;
  }

  &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    box-shadow: none;
    border-color: #d9d9d9;
  }

  &:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: #d9d9d9;
  }
`;

export default CustomSelect;