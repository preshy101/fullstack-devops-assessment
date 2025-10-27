// FormBuilderHeader.jsx
import React from 'react';
import { Button, Space, Dropdown } from 'antd';
import { 
  ArrowLeftOutlined, 
  AppstoreOutlined, 
  MenuOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  SaveOutlined,
  MoreOutlined 
} from '@ant-design/icons';
import './FormBuilderHeader.scss';

const FormBuilderHeader = ({ formTitle, formId }) => {
  const handleBack = () => {
    // Navigate back logic
    console.log('Navigate back');
  };

  const handleImportJSON = () => {
    console.log('Import JSON');
  };

  const handlePublish = () => {
    console.log('Publish form');
  };

  const handleSave = () => {
    console.log('Save form');
  };

  const moreMenuItems = [
    {
      key: 'duplicate',
      label: 'Duplicate',
    },
    {
      key: 'delete',
      label: 'Delete',
      danger: true,
    },
  ];

  return (
    <header className="form-builder-header">
      <div className="header-left">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
          className="back-button"
        />
        
        <div className="form-info">
          <div className="form-icons">
            <AppstoreOutlined className="icon" />
            <MenuOutlined className="icon" />
          </div>
          <div className="form-details">
            <h1 className="form-title">{formTitle}</h1>
            <p className="form-id">{formId}</p>
          </div>
        </div>
      </div>

      <div className="header-right">
        <Space size="small">
          <Button 
            icon={<FileTextOutlined />}
            onClick={handleImportJSON}
          >
            Import JSON
          </Button>
          
          <Button onClick={handlePublish}>
            Publish
          </Button>
          
          <Button 
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
          >
            Save
          </Button>

          <Dropdown 
            menu={{ items: moreMenuItems }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Button 
              type="text" 
              icon={<MoreOutlined />}
            />
          </Dropdown>
        </Space>
      </div>
    </header>
  );
};

export default FormBuilderHeader;
 