// Canvas.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Section from '../Section/Section';
import { addSection } from '../../../redux/slices/formSlice';
import './Canvas.scss';

const Canvas = ({ sections, onAddElementsClick }) => {
  const dispatch = useDispatch();

  const handleAddSection = () => {
    dispatch(addSection());
  };

  return (
    <main className="canvas">
      <div className="canvas-header">
        <input 
          type="text" 
          className="section-title-input" 
          placeholder="Section Title Here..."
          defaultValue="Section Title He..."
        />
        
        <Button 
          type="default"
          icon={<PlusOutlined />}
          onClick={onAddElementsClick}
          className="add-elements-btn"
        >
          Add Elements
        </Button>
      </div>

      <div className="canvas-content">
        {sections.length === 0 ? (
          <Empty
            description="No sections yet"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleAddSection}
            >
              Add First Section
            </Button>
          </Empty>
        ) : (
          <SortableContext
            items={sections.map(s => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section) => (
              <Section 
                key={section.id} 
                section={section}
              />
            ))}
          </SortableContext>
        )}

        {sections.length > 0 && (
          <div className="canvas-footer">
            <div className="end-marker">End</div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Canvas;

// Canvas.scss