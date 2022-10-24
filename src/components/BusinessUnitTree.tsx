import { TreeSelect } from 'antd';
import { IBusinessUnit } from '../services/interfaces';

interface BusinessUnitTreeProps {
  businessUnits: IBusinessUnit[];
  onChange: (value: string) => void;
  value: string;
}

const BusinessUnitTree: React.FC<BusinessUnitTreeProps> = ({
  businessUnits,
  onChange,
  value,
}) => {
  const disableNonLeaf = true;

  const getBusinessUnitTree = (bu: any) => (
    <TreeSelect.TreeNode
      disabled={disableNonLeaf && bu.childUnits?.length}
      key={bu.businessUnitId}
      value={bu.businessUnitId}
      title={bu.name}
    >
      {bu.childUnits?.map(getBusinessUnitTree)}
    </TreeSelect.TreeNode>
  );

  return (
    <>
      <TreeSelect
        style={{ width: '100%' }}
        showSearch
        value={value}
        dropdownStyle={{
          width: 600,
          maxHeight: 400,
          overflow: 'auto',
        }}
        placeholder="Seleccione una unidad de negocio"
        treeDefaultExpandAll
        onChange={onChange}
      >
        {businessUnits && getBusinessUnitTree(businessUnits)}
      </TreeSelect>
    </>
  );
};

export default BusinessUnitTree;
