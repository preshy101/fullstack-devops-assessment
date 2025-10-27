// Section.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Dropdown } from 'antd';
import { PlusOutlined, HolderOutlined, MoreOutlined } from '@ant-design/icons';
import Group from '../Group/Group';
import { addGroup, removeSection, updateSection } from '../../../redux/slices/formSlice';
import './Section.scss';

const Section = ({ section }) => {
  const dispatch = useDispatch();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleAddGroup = () => {
    dispatch(addGroup({ sectionId: section.id }));
  };

  const handleTitleChange = (e) => {
    dispatch(updateSection({
      sectionId: section.id,
      updates: { title: e.target.value }
    }));
  };

  const handleDeleteSection = () => {
    dispatch(removeSection(section.id));
  };

  const menuItems = [
    {
      key: 'duplicate',
      label: 'Duplicate Section',
    },
    {
      key: 'delete',
      label: 'Delete Section',
      danger: true,
      onClick: handleDeleteSection,
    },
  ];

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="section"
    >
      {section.groups.length === 0 ? (
        <div className="section-empty">
          <div className="empty-content">
            <p className="empty-text">Drag or Drop</p>
            <Button 
              type="link" 
              icon={<PlusOutlined />}
              onClick={handleAddGroup}
            >
              Add Group
            </Button>
          </div>
        </div>
      ) : (
        <div className="section-groups">
          {section.groups.map((group) => (
            <Group 
              key={group.id} 
              group={group}
              sectionId={section.id}
            />
          ))}
        </div>
      )}

      {section.groups.length > 0 && (
        <div className="section-footer">
          <Button 
            type="dashed" 
            icon={<PlusOutlined />}
            onClick={handleAddGroup}
            block
          >
            Add Group
          </Button>
        </div>
      )}
    </div>
  );
};

export default Section;

// Section.scss