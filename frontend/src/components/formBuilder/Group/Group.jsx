import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Button, Switch, Dropdown, Input } from 'antd';
import { 
  HolderOutlined, 
  CopyOutlined, 
  DeleteOutlined, 
  MoreOutlined,
  EditOutlined,
  CheckOutlined 
} from '@ant-design/icons';
import Field from '../Field/Field';
import { removeGroup, updateGroup } from '../../../redux/slices/formSlice';
import './Group.scss';

const Group = ({ group, sectionId }) => {
  const dispatch = useDispatch();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(group.title);

  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: group.id,
    data: { type: 'group', sectionId, group }
  });

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `group-droppable-${group.id}`,
    data: { 
      type: 'group', 
      sectionId, 
      groupId: group.id,
      accepts: ['new-field'] // Explicitly accept new fields
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Combine refs for both sortable and droppable
  const setNodeRefs = (node) => {
    setSortableRef(node);
    setDroppableRef(node);
  };

  const handleRequiredToggle = (checked) => {
    dispatch(updateGroup({
      sectionId,
      groupId: group.id,
      updates: { isRequired: checked }
    }));
  };

  const handleDeleteGroup = () => {
    dispatch(removeGroup({ sectionId, groupId: group.id }));
  };

  const handleDuplicateGroup = () => {
    // Implement duplicate logic
    console.log('Duplicate group', group.id);
  };

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    dispatch(updateGroup({
      sectionId,
      groupId: group.id,
      updates: { title: titleValue }
    }));
    setIsEditingTitle(false);
  };

  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  const menuItems = [
    {
      key: 'duplicate',
      label: 'Duplicate Group',
      icon: <CopyOutlined />,
      onClick: handleDuplicateGroup,
    },
    {
      key: 'delete',
      label: 'Delete Group',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: handleDeleteGroup,
    },
  ];

  return (
    <div 
      ref={setNodeRefs}
      style={style}
      className={`group ${isDragging ? 'dragging' : ''} ${isOver ? 'drop-target' : ''}`}
    >
      <div className="group-header">
        <div className="group-title-section">
          <div 
            className="drag-handle" 
            {...attributes} 
            {...listeners}
          >
            <HolderOutlined />
          </div>
          
          {isEditingTitle ? (
            <div className="title-edit">
              <Input
                value={titleValue}
                onChange={handleTitleChange}
                onPressEnter={handleTitleSave}
                autoFocus
                size="small"
              />
              <Button
                type="text"
                size="small"
                icon={<CheckOutlined />}
                onClick={handleTitleSave}
              />
            </div>
          ) : (
            <div className="group-title">
              <span>{group.title}</span>
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={handleTitleEdit}
                className="edit-btn"
              />
            </div>
          )}
        </div>

        <div className="group-actions">
          <div className="required-toggle">
            <span>Required</span>
            <Switch 
              size="small" 
              checked={group.isRequired}
              onChange={handleRequiredToggle}
            />
          </div>

          <Button
            type="text"
            size="small"
            icon={<CopyOutlined />}
            onClick={handleDuplicateGroup}
          />

          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={handleDeleteGroup}
            danger
          />

          <Dropdown
            menu={{ items: menuItems }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Button
              type="text"
              size="small"
              icon={<MoreOutlined />}
            />
          </Dropdown>
        </div>
      </div>

      <div 
        className={`group-content ${isOver ? 'drag-over' : ''}`}
      >
        {group.fields.length === 0 ? (
          <div className="group-empty">
            <p>Drop fields here or click "Add Elements"</p>
          </div>
        ) : (
          <div className="group-fields">
            {group.fields.map((field) => (
              <Field
                key={field.id}
                field={field}
                sectionId={sectionId}
                groupId={group.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Group;
