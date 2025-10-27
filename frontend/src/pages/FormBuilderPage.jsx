import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import FormBuilderHeader from '../components/formBuilder/FormBuilderHeader/FormBuilderHeader';
import FormBuilderNav from '../components/formBuilder/FormBuilderNav/FormBuilderNav';
import LeftSidebar from '../components/formBuilder/LeftSidebar/LeftSidebar';
import Canvas from '../components/formBuilder/Canvas/Canvas';
import RightSidebar from '../components/formBuilder/RightSidebar/RightSidebar';
import './FormBuilderPages.scss';

const FormBuilderPage = () => {
  const dispatch = useDispatch();
  const { sections, currentForm } = useSelector((state) => state.form);
  const [activeTab, setActiveTab] = useState('builder');
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [activeId, setActiveId] = useState(null);

  // Initialize with a default section if none exist
  useEffect(() => {
    if (sections.length === 0) {
      // Optionally auto-add a first section
      // dispatch(addSection());
    }
  }, [sections, dispatch]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    // Handle drop logic here
  };

  const toggleRightSidebar = () => {
    setShowRightSidebar(!showRightSidebar);
  };

  return (
    <div className="form-builder-page">
      <FormBuilderHeader
        formTitle={currentForm?.title || 'Student Leave Request Form (Sydney Campus)'}
        formId={currentForm?.id || 'FID 1234 5668 9869'}
      />
      
      <FormBuilderNav 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="form-builder-content">
        <LeftSidebar />
        
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Canvas 
            sections={sections}
            onAddElementsClick={toggleRightSidebar}
          />
          
          <DragOverlay>
            {activeId ? <div className="drag-overlay-item">{activeId}</div> : null}
          </DragOverlay>
        </DndContext>

        {showRightSidebar && (
          <RightSidebar onClose={toggleRightSidebar} />
        )}
      </div>
    </div>
  );
};

export default FormBuilderPage;