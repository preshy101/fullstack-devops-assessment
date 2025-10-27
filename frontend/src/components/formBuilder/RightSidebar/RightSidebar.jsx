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
  IdcardOutlined,
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
        { type: STANDARD_FIELD_TYPES.PHOTO, label: 'Photo', icon: <PictureOutlined /> },
        { type: STANDARD_FIELD_TYPES.STATE, label: 'State', icon: <MinusOutlined /> },
        { type: STANDARD_FIELD_TYPES.GENDER, label: 'Gender', icon: <UserOutlined /> },
        { type: STANDARD_FIELD_TYPES.EMAIL_ADDRESS, label: 'Email Address', icon: <MailOutlined /> },
        { type: STANDARD_FIELD_TYPES.LAST_NAME, label: 'Last Name', icon: <UserOutlined /> },
        { type: STANDARD_FIELD_TYPES.DATE_OF_BIRTH, label: 'Date of Birth', icon: <CalendarOutlined /> },
        { type: STANDARD_FIELD_TYPES.DO_YOU_HAVE_RESIDENCY, label: 'Do you have residency?', icon: <CheckSquareOutlined /> },
        { type: STANDARD_FIELD_TYPES.SALUTATION, label: 'Salutation', icon: <MinusOutlined /> },
        { type: STANDARD_FIELD_TYPES.MOBILE_NUMBER, label: 'Mobile Number', icon: <PhoneOutlined /> },
        { type: STANDARD_FIELD_TYPES.FIRST_NAME, label: 'First Name', icon: <UserOutlined /> },
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

  // Custom Fields (from Image 4)
  const customFields = [
    { type: CUSTOM_FIELD_TYPES.AMOUNTINPUT, label: 'AmountInput', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.BACKGROUNDIMAGE_MARKUP, label: 'BackgroundImageMarkup', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.CAMERA, label: 'Camera', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.CARDDETAILS, label: 'CardDetails', icon: <CheckSquareOutlined /> },
    { type: CUSTOM_FIELD_TYPES.DATEPICKER, label: 'DatePicker', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.DATETIME_PICKER, label: 'DateTimePicker', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.DRAWING_SIGNATURE_INPUT, label: 'DrawingSignatureInput', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.DROPDOWN, label: 'Dropdown', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.DROPDOWN_AUTOSUGGEST_INPUT, label: 'DropdownAutosuggestInput', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.EMAIL_INPUT, label: 'EmailInput', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.FILE_INPUT, label: 'FileInput', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.FILE_UPLOAD_RATING, label: 'FileUploadRating', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.GEOLOCATION_PICKER_INPUT, label: 'GeoLocationPickerInput', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.HEADER_TEXT, label: 'HeaderText', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.HIDDEN_INPUT, label: 'HiddenInput', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.HIDDEN_SECTION_INPUT, label: 'HiddenSectionInput', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.INPUT_TABLE, label: 'InputTable', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.NUMBER_INPUT, label: 'NumberInput', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.NUMBER_DROPDOWN_INPUT, label: 'NumberDropdownInput', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.PARAGRAPH, label: 'Paragraph', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.PERCENTAGE_INPUT, label: 'PercentageInput', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.PHONE_NUMBER_INPUT, label: 'PhoneNumberInput', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.PROGRESS_BAR_INPUT, label: 'ProgressBarInput', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.RADIO_BUTTONS, label: 'RadioButtons', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.RATING_SCALE, label: 'RatingScale', icon: <MinusOutlined /> },
    { type: CUSTOM_FIELD_TYPES.REPEATER, label: 'Repeater', icon: <MinusOutlined /> },
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
