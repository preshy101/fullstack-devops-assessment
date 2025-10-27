import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  currentForm: null,
  sections: [],
  history: {
    past: [],
    future: [],
  },
  isDirty: false,
  isLoading: false,
  error: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // Form Management
    setCurrentForm: (state, action) => {
      state.currentForm = action.payload;
      state.sections = action.payload?.sections || [];
      state.isDirty = false;
    },
    
    clearForm: (state) => {
      state.currentForm = null;
      state.sections = [];
      state.history = { past: [], future: [] };
      state.isDirty = false;
    },
    
    // Section Actions
    addSection: (state, action) => {
      const newSection = {
        id: uuidv4(),
        title: action.payload?.title || 'Section Title Here',
        groups: [],
        order: state.sections.length,
        createdAt: new Date().toISOString(),
      };
      
      state.history.past.push(JSON.parse(JSON.stringify(state.sections)));
      state.history.future = [];
      state.sections.push(newSection);
      state.isDirty = true;
    },
    
    removeSection: (state, action) => {
      state.history.past.push(JSON.parse(JSON.stringify(state.sections)));
      state.history.future = [];
      state.sections = state.sections.filter(section => section.id !== action.payload);
      state.isDirty = true;
    },
    
    updateSection: (state, action) => {
      const { sectionId, updates } = action.payload;
      state.history.past.push(JSON.parse(JSON.stringify(state.sections)));
      state.history.future = [];
      
      const sectionIndex = state.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex] = { ...state.sections[sectionIndex], ...updates };
      }
      state.isDirty = true;
    },
    
    reorderSections: (state, action) => {
      state.history.past.push(JSON.parse(JSON.stringify(state.sections)));
      state.history.future = [];
      state.sections = action.payload;
      state.isDirty = true;
    },
    
    // Group Actions
    addGroup: (state, action) => {
      const { sectionId, groupData } = action.payload;
      state.history.past.push(JSON.parse(JSON.stringify(state.sections)));
      state.history.future = [];
      
      const sectionIndex = state.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex !== -1) {
        const newGroup = {
          id: uuidv4(),
          title: groupData?.title || 'Group Title',
          fields: [],
          isRequired: false,
          order: state.sections[sectionIndex].groups.length,
          createdAt: new Date().toISOString(),
        };
        state.sections[sectionIndex].groups.push(newGroup);
      }
      state.isDirty = true;
    },
    
    removeGroup: (state, action) => {
      const { sectionId, groupId } = action.payload;
      state.history.past.push(JSON.parse(JSON.stringify(state.sections)));
      state.history.future = [];
      
      const sectionIndex = state.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].groups = state.sections[sectionIndex].groups.filter(
          group => group.id !== groupId
        );
      }
      state.isDirty = true;
    },
    
    updateGroup: (state, action) => {
      const { sectionId, groupId, updates } = action.payload;
      state.history.past.push(JSON.parse(JSON.stringify(state.sections)));
      state.history.future = [];
      
      const sectionIndex = state.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex !== -1) {
        const groupIndex = state.sections[sectionIndex].groups.findIndex(g => g.id === groupId);
        if (groupIndex !== -1) {
          state.sections[sectionIndex].groups[groupIndex] = {
            ...state.sections[sectionIndex].groups[groupIndex],
            ...updates,
          };
        }
      }
      state.isDirty = true;
    },
    
    reorderGroups: (state, action) => {
      const { sectionId, groups } = action.payload;
      state.history.past.push(JSON.parse(JSON.stringify(state.sections)));
      state.history.future = [];
      
      const sectionIndex = state.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].groups = groups;
      }
      state.isDirty = true;
    },
    
    // Field Actions
    addField: (state, action) => {
      const { sectionId, groupId, fieldData } = action.payload;
      state.history.past.push(JSON.parse(JSON.stringify(state.sections)));
      state.history.future = [];
      
      const sectionIndex = state.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex !== -1) {
        const groupIndex = state.sections[sectionIndex].groups.findIndex(g => g.id === groupId);
        if (groupIndex !== -1) {
          const newField = {
            id: uuidv4(),
            type: fieldData.type,
            label: fieldData.label || 'Field Label',
            placeholder: fieldData.placeholder || '',
            isRequired: fieldData.isRequired || false,
            isFull: fieldData.isFull || false,
            options: fieldData.options || [],
            validation: fieldData.validation || {},
            order: state.sections[sectionIndex].groups[groupIndex].fields.length,
            createdAt: new Date().toISOString(),
          };
          state.sections[sectionIndex].groups[groupIndex].fields.push(newField);
        }
      }
      state.isDirty = true;
    },
    
    removeField: (state, action) => {
      const { sectionId, groupId, fieldId } = action.payload;
      state.history.past.push(JSON.parse(JSON.stringify(state.sections)));
      state.history.future = [];
      
      const sectionIndex = state.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex !== -1) {
        const groupIndex = state.sections[sectionIndex].groups.findIndex(g => g.id === groupId);
        if (groupIndex !== -1) {
          state.sections[sectionIndex].groups[groupIndex].fields = 
            state.sections[sectionIndex].groups[groupIndex].fields.filter(f => f.id !== fieldId);
        }
      }
      state.isDirty = true;
    },
    
    updateField: (state, action) => {
      const { sectionId, groupId, fieldId, updates } = action.payload;
      state.history.past.push(JSON.parse(JSON.stringify(state.sections)));
      state.history.future = [];
      
      const sectionIndex = state.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex !== -1) {
        const groupIndex = state.sections[sectionIndex].groups.findIndex(g => g.id === groupId);
        if (groupIndex !== -1) {
          const fieldIndex = state.sections[sectionIndex].groups[groupIndex].fields.findIndex(
            f => f.id === fieldId
          );
          if (fieldIndex !== -1) {
            state.sections[sectionIndex].groups[groupIndex].fields[fieldIndex] = {
              ...state.sections[sectionIndex].groups[groupIndex].fields[fieldIndex],
              ...updates,
            };
          }
        }
      }
      state.isDirty = true;
    },
    
    reorderFields: (state, action) => {
      const { sectionId, groupId, fields } = action.payload;
      state.history.past.push(JSON.parse(JSON.stringify(state.sections)));
      state.history.future = [];
      
      const sectionIndex = state.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex !== -1) {
        const groupIndex = state.sections[sectionIndex].groups.findIndex(g => g.id === groupId);
        if (groupIndex !== -1) {
          state.sections[sectionIndex].groups[groupIndex].fields = fields;
        }
      }
      state.isDirty = true;
    },
    
    // Undo/Redo
    undo: (state) => {
      if (state.history.past.length > 0) {
        const previous = state.history.past.pop();
        state.history.future.unshift(JSON.parse(JSON.stringify(state.sections)));
        state.sections = previous;
        state.isDirty = true;
      }
    },
    
    redo: (state) => {
      if (state.history.future.length > 0) {
        const next = state.history.future.shift();
        state.history.past.push(JSON.parse(JSON.stringify(state.sections)));
        state.sections = next;
        state.isDirty = true;
      }
    },
    
    // Loading and Error States
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCurrentForm,
  clearForm,
  addSection,
  removeSection,
  updateSection,
  reorderSections,
  addGroup,
  removeGroup,
  updateGroup,
  reorderGroups,
  addField,
  removeField,
  updateField,
  reorderFields,
  undo,
  redo,
  setLoading,
  setError,
  clearError,
} = formSlice.actions;

export default formSlice.reducer;