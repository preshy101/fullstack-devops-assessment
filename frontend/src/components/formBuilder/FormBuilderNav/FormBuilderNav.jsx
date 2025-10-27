import React from 'react';
import { Tabs } from 'antd';
import { 
  RightOutlined,
  EyeOutlined,
  SyncOutlined,
  BellOutlined,
  ShareAltOutlined
} from '@ant-design/icons';
import './FormBuilderNav.scss';

const FormBuilderNav = ({ activeTab, onTabChange }) => {
  // Define navigation tabs
  const NAV_TABS = [
    { key: 'details', label: 'Details' },
    { key: 'identities', label: 'Identities' },
    { key: 'builder', label: 'Builder' },
    { key: 'settings', label: 'Settings' },
    { key: 'embed', label: 'Embed' },
    { key: 'theme', label: 'Theme' },
    { key: 'pdf-filler', label: 'PDF Filler' },
    { key: 'api-mappings', label: 'API Mappings' },
    { key: 'workflow', label: 'Workflow' },
    { key: 'digest', label: 'Digest' },
  ];

  const items = NAV_TABS.map(tab => ({
    key: tab.key,
    label: tab.label,
  }));

  return (
    <div className="form-builder-nav">
      <div className="nav-tabs-container">
        <Tabs
          activeKey={activeTab}
          onChange={onTabChange}
          items={items}
          className="builder-tabs"
        />
      </div>

      <div className="nav-actions">
        <RightOutlined className="action-icon" />
        <EyeOutlined className="action-icon" />
        <SyncOutlined className="action-icon" />
        <BellOutlined className="action-icon" />
        <ShareAltOutlined className="action-icon" />
        <RightOutlined className="action-icon chevron" />
      </div>
    </div>
  );
};

export default FormBuilderNav;