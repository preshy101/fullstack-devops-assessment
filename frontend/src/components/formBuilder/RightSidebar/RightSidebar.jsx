// RightSidebar.jsx
import React, { useState } from 'react';
import { Input, Tabs, Collapse, Button } from 'antd';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { 
  CloseOutlined, 
  SearchOutlined,
  MinusOutlined,
  CheckSquareOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  PictureOutlined
} from '@ant-design/icons';
import './RightSidebar.scss';

const { Panel } = Collapse;

// Draggable Field Item Component
const DraggableFieldItem = ({ field }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `draggable-${field.type}`,
    data: {
      type: 'new-field',
      fieldType: field.type,
      fieldLabel: field.label,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="field-item"
      {...listeners}
      {...attributes}
    >
      <span className="field-icon">{field.icon}</span>
      <span className="field-name">{field.label}</span>
    </div>
  );
};

const RightSidebar = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('standard');
  const [searchQuery, setSearchQuery] = useState('');

  // Standard Fields organized by category
  const standardFields = [
    {
      category: 'PRF - Account Profile',
      fields: [
        { type: 'photo', label: 'Photo', icon: <PictureOutlined /> },
        { type: 'state', label: 'State', icon: <MinusOutlined /> },
        { type: 'gender', label: 'Gender', icon: <UserOutlined /> },
        { type: 'email_address', label: 'Email Address', icon: <MailOutlined /> },
        { type: 'last_name', label: 'Last Name', icon: <UserOutlined /> },
        { type: 'date_of_birth', label: 'Date of Birth', icon: <CalendarOutlined /> },
        { type: 'do_you_have_residency', label: 'Do you have residency?', icon: <CheckSquareOutlined /> },
        { type: 'salutation', label: 'Salutation', icon: <MinusOutlined /> },
        { type: 'mobile_number', label: 'Mobile Number', icon: <PhoneOutlined /> },
        { type: 'first_name', label: 'First Name', icon: <UserOutlined /> },
      ]
    },
    {
      category: 'BIO - Biodata',
      fields: []
    },
    {
      category: 'CON - Contact Info',
      fields: []
    },
    {
      category: 'PAS - Passports',
      fields: []
    },
    {
      category: 'IDC - ID Cards',
      fields: []
    }
  ];

  // Custom Fields
  const customFields = [
    { type: 'amountinput', label: 'AmountInput', icon: <MinusOutlined /> },
    { type: 'backgroundimage_markup', label: 'BackgroundImageMarkup', icon: <MinusOutlined /> },
    { type: 'camera', label: 'Camera', icon: <MinusOutlined /> },
    { type: 'carddetails', label: 'CardDetails', icon: <CheckSquareOutlined /> },
    { type: 'datepicker', label: 'DatePicker', icon: <MinusOutlined /> },
    { type: 'datetime_picker', label: 'DateTimePicker', icon: <MinusOutlined /> },
    { type: 'drawing_signature_input', label: 'DrawingSignatureInput', icon: <MinusOutlined /> },
    { type: 'dropdown', label: 'Dropdown', icon: <MinusOutlined /> },
    { type: 'dropdown_autosuggest_input', label: 'DropdownAutosuggestInput', icon: <MinusOutlined /> },
    { type: 'email_input', label: 'EmailInput', icon: <MinusOutlined /> },
    { type: 'file_input', label: 'FileInput', icon: <MinusOutlined /> },
    { type: 'file_upload_rating', label: 'FileUploadRating', icon: <MinusOutlined /> },
    { type: 'geolocation_picker_input', label: 'GeoLocationPickerInput', icon: <MinusOutlined /> },
    { type: 'header_text', label: 'HeaderText', icon: <MinusOutlined /> },
    { type: 'hidden_input', label: 'HiddenInput', icon: <MinusOutlined /> },
    { type: 'hidden_section_input', label: 'HiddenSectionInput', icon: <MinusOutlined /> },
    { type: 'input_table', label: 'InputTable', icon: <MinusOutlined /> },
    { type: 'number_input', label: 'NumberInput', icon: <MinusOutlined /> },
    { type: 'number_dropdown_input', label: 'NumberDropdownInput', icon: <MinusOutlined /> },
    { type: 'paragraph', label: 'Paragraph', icon: <MinusOutlined /> },
    { type: 'percentage_input', label: 'PercentageInput', icon: <MinusOutlined /> },
    { type: 'phone_number_input', label: 'PhoneNumberInput', icon: <MinusOutlined /> },
    { type: 'progress_bar_input', label: 'ProgressBarInput', icon: <MinusOutlined /> },
    { type: 'radio_buttons', label: 'RadioButtons', icon: <MinusOutlined /> },
    { type: 'rating_scale', label: 'RatingScale', icon: <MinusOutlined /> },
    { type: 'repeater', label: 'Repeater', icon: <MinusOutlined /> },
  ];

  const filterFields = (fields) => {
    if (!searchQuery) return fields;
    return fields.filter(field => 
      field.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const tabItems = [
    {
      key: 'standard',
      label: 'Standard Fields',
      children: (
        <div className="fields-list">
          <Collapse 
            defaultActiveKey={['0']} 
            ghost
            expandIconPosition="end"
          >
            {standardFields.map((category, index) => (
              <Panel 
                header={category.category} 
                key={index}
              >
                <div className="field-items">
                  {filterFields(category.fields).map((field) => (
                    <DraggableFieldItem key={field.type} field={field} />
                  ))}
                  {category.fields.length === 0 && (
                    <div className="field-empty">No fields available</div>
                  )}
                </div>
              </Panel>
            ))}
          </Collapse>
        </div>
      )
    },
    {
      key: 'custom',
      label: 'Custom Fields',
      children: (
        <div className="fields-list">
          <div className="field-items">
            {filterFields(customFields).map((field) => (
              <DraggableFieldItem key={field.type} field={field} />
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <aside className="right-sidebar">
      <div className="sidebar-header">
        <h3>Elements</h3>
        <Button 
          type="text" 
          icon={<CloseOutlined />} 
          onClick={onClose}
        />
      </div>

      <div className="sidebar-tabs">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
        />
      </div>

      <div className="sidebar-search">
        <Input
          placeholder={activeTab === 'standard' ? 'Search' : 'Search Custom Fields'}
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
        />
      </div>

      <div className="sidebar-content">
        {tabItems.find(item => item.key === activeTab)?.children}
      </div>
    </aside>
  );
};

export default RightSidebar;
