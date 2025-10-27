
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Input, Radio, Checkbox, Select, Upload, Button, Switch } from 'antd';
import { 
  HolderOutlined, 
  CopyOutlined, 
  DeleteOutlined,
  InboxOutlined 
} from '@ant-design/icons';
import { removeField, updateField } from '../../../redux/slices/formSlice';
import { STANDARD_FIELD_TYPES, CUSTOM_FIELD_TYPES } from '../../../utils/constants';
import './Field.scss';

const { Dragger } = Upload;

const Field = ({ field, sectionId, groupId }) => {
  const dispatch = useDispatch();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: field.id,
    data: { type: 'field', sectionId, groupId, field }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDeleteField = () => {
    dispatch(removeField({ sectionId, groupId, fieldId: field.id }));
  };

  const handleRequiredToggle = (checked) => {
    dispatch(updateField({
      sectionId,
      groupId,
      fieldId: field.id,
      updates: { isRequired: checked }
    }));
  };

  const handleFullToggle = (checked) => {
    dispatch(updateField({
      sectionId,
      groupId,
      fieldId: field.id,
      updates: { isFull: checked }
    }));
  };

  const renderFieldInput = () => {
    switch (field.type) {
      case STANDARD_FIELD_TYPES.LAST_NAME:
      case STANDARD_FIELD_TYPES.FIRST_NAME:
      case STANDARD_FIELD_TYPES.EMAIL_ADDRESS:
      case STANDARD_FIELD_TYPES.MOBILE_NUMBER:
        return (
          <Input 
            placeholder={field.placeholder || field.label}
            disabled
          />
        );

      case STANDARD_FIELD_TYPES.EMAIL_ADDRESS:
      case 'email_dropdown':
        return (
          <Select 
            placeholder={field.placeholder || 'Select Title Here'}
            disabled
            options={field.options || []}
          />
        );

      case STANDARD_FIELD_TYPES.DO_YOU_HAVE_RESIDENCY:
      case CUSTOM_FIELD_TYPES.RADIO_BUTTONS:
        return (
          <Radio.Group disabled>
            {(field.options || [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]).map(option => (
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        );

      case STANDARD_FIELD_TYPES.SALUTATION:
      case 'checkboxes':
        return (
          <Checkbox.Group disabled>
            {(field.options || [
              { label: 'Mr', value: 'mr' },
              { label: 'Mrs', value: 'mrs' },
              { label: 'Alhaji', value: 'alhaji' },
              { label: 'Dr', value: 'dr' }
            ]).map(option => (
              <Checkbox key={option.value} value={option.value}>
                {option.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );

      case STANDARD_FIELD_TYPES.PHOTO:
      case CUSTOM_FIELD_TYPES.FILE_INPUT:
        return (
          <Dragger disabled className="field-upload">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Drag your image to start uploading</p>
            <p className="ant-upload-hint">or PNG and GIF formats</p>
            <Button type="link">Browse files</Button>
          </Dragger>
        );

      case STANDARD_FIELD_TYPES.DATE_OF_BIRTH:
      case CUSTOM_FIELD_TYPES.DATEPICKER:
        return (
          <Input 
            placeholder="DD/MM/YYYY"
            disabled
          />
        );

      case CUSTOM_FIELD_TYPES.DROPDOWN:
        return (
          <Select 
            placeholder={field.placeholder || 'Select an option'}
            disabled
            options={field.options || []}
          />
        );

      default:
        return (
          <Input 
            placeholder={field.placeholder || field.label}
            disabled
          />
        );
    }
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={`field ${field.isFull ? 'field-full' : ''} ${isDragging ? 'dragging' : ''}`}
    >
      <div className="field-header">
        <div className="field-label-section">
          <div 
            className="drag-handle" 
            {...attributes} 
            {...listeners}
          >
            <HolderOutlined />
          </div>
          <label className="field-label">
            {field.label}
          </label>
        </div>

        <div className="field-actions">
          <div className="field-toggles">
            <span className="toggle-label">Full</span>
            <Switch 
              size="small" 
              checked={field.isFull}
              onChange={handleFullToggle}
            />
          </div>

          <div className="field-toggles">
            <span className="toggle-label">Required</span>
            <Switch 
              size="small" 
              checked={field.isRequired}
              onChange={handleRequiredToggle}
            />
          </div>

          <Button
            type="text"
            size="small"
            icon={<CopyOutlined />}
          />

          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={handleDeleteField}
            danger
          />
        </div>
      </div>

      <div className="field-input">
        {renderFieldInput()}
      </div>
    </div>
  );
};

export default Field;

// Field.scss