// LeftSidebar.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Tooltip } from 'antd';
import { 
  UndoOutlined, 
  RedoOutlined,
  HomeOutlined,
  PlusOutlined,
  MinusOutlined
} from '@ant-design/icons';
import { undo, redo, addSection } from '../../../redux/slices/formSlice';
import './LeftSidebar.scss';

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const { sections, history } = useSelector((state) => state.form);

  const handleUndo = () => {
    dispatch(undo());
  };

  const handleRedo = () => {
    dispatch(redo());
  };

  const handleHome = () => {
    console.log('Navigate to home');
  };

  const handleAddSection = () => {
    dispatch(addSection());
  };

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  return (
    <aside className="left-sidebar">
      <div className="sidebar-top">
        <Tooltip title="Add Section" placement="right">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleAddSection}
            className="add-section-btn"
          />
        </Tooltip>
      </div>

      <div className="sidebar-actions">
        <Tooltip title="Undo" placement="right">
          <Button
            type="text"
            icon={<UndoOutlined />}
            onClick={handleUndo}
            disabled={!canUndo}
            className="action-btn"
          />
        </Tooltip>

        <Tooltip title="Redo" placement="right">
          <Button
            type="text"
            icon={<RedoOutlined />}
            onClick={handleRedo}
            disabled={!canRedo}
            className="action-btn"
          />
        </Tooltip>

        <Tooltip title="Home" placement="right">
          <Button
            type="text"
            icon={<HomeOutlined />}
            onClick={handleHome}
            className="action-btn"
          />
        </Tooltip>
      </div>

      <div className="sidebar-sections">
        {sections.map((section, index) => (
          <Tooltip 
            key={section.id} 
            title={`Section ${index + 1}`} 
            placement="right"
          >
            <div className="section-indicator">
              {String(index + 1).padStart(2, '0')}
            </div>
          </Tooltip>
        ))}
      </div>

      <div className="sidebar-bottom">
        <Tooltip title="Zoom Out" placement="right">
          <Button
            type="text"
            icon={<MinusOutlined />}
            className="action-btn"
          />
        </Tooltip>

        <div className="zoom-level">100</div>

        <Tooltip title="Zoom In" placement="right">
          <Button
            type="text"
            icon={<PlusOutlined />}
            className="action-btn"
          />
        </Tooltip>
      </div>
    </aside>
  );
};

export default LeftSidebar;

// LeftSidebar.scss