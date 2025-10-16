import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronRight, Edit2, Save, X, Trash2, FolderTree, Copy, Search, FileText, Calendar, Clock, Tag, ArrowRight, ArrowLeft, Eye, EyeOff, Filter } from 'lucide-react';

const HierarchicalStageManager = () => {
  const [data, setData] = useState({
    stages: [],
    categories: []
  });

  const [newStage, setNewStage] = useState({
    title: '',
    jobPosting: '',
    guidelinesFile: '',
    worksheetFile: '',
    taskChecklistFile: '',
    worksheetFormat: '',
    supportiveDoc: '',
    selectedCategories: []
  });

  const [showStageForm, setShowStageForm] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [expandedStages, setExpandedStages] = useState({});
  
  const [addingCategory, setAddingCategory] = useState({
    name: '',
    parentId: null,
    description: '',
    fields: [],
    fieldData: {}
  });

  const [editingCategory, setEditingCategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [categorySearch, setCategorySearch] = useState('');
  const [showCategoryLogs, setShowCategoryLogs] = useState(false);
  const [showFieldEditor, setShowFieldEditor] = useState(null);
  const [viewFieldData, setViewFieldData] = useState(null);
  const [newField, setNewField] = useState({
    name: '',
    type: 'text',
    required: false,
    options: []
  });

  const fieldTypes = [
    { value: 'text', label: 'Text Input' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'number', label: 'Number' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'url', label: 'URL/Link' },
    { value: 'date', label: 'Date' },
    { value: 'dropdown', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'radio', label: 'Radio Button' },
    { value: 'file', label: 'File Upload' }
  ];

  const generateId = (parentId = null) => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    
    if (parentId) {
      const parent = data.categories.find(c => c.id === parentId);
      if (parent) {
        const childCount = data.categories.filter(c => c.parentId === parentId).length + 1;
        return `${parent.categoryId}.${childCount}`;
      }
    }
    
    const rootCount = data.categories.filter(c => c.parentId === null).length + 1;
    return `CAT${rootCount}`;
  };

  const regenerateCategoryIds = () => {
    const updatedCategories = [...data.categories];
    const processedIds = new Set();

    const updateIds = (parentId = null, prefix = '') => {
      const children = updatedCategories.filter(c => c.parentId === parentId);
      children.forEach((child, index) => {
        const newId = parentId ? `${prefix}.${index + 1}` : `CAT${index + 1}`;
        const categoryIndex = updatedCategories.findIndex(c => c.id === child.id);
        updatedCategories[categoryIndex] = {
          ...updatedCategories[categoryIndex],
          categoryId: newId
        };
        processedIds.add(child.id);
        updateIds(child.id, newId);
      });
    };

    updateIds(null, '');
    
    setData(prev => ({
      ...prev,
      categories: updatedCategories
    }));
  };

 const moveCategoryLevel = (categoryId, direction) => {
  setData(prev => {
    const categories = [...prev.categories];
    const category = categories.find(c => c.id === categoryId);
    if (!category) return prev;

    const now = new Date().toISOString();
    let newParentId = category.parentId;

    if (direction === "right") {
      // Move right → make previous sibling the new parent
      const siblings = categories
        .filter(c => c.parentId === category.parentId)
        .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));

      const currentIndex = siblings.findIndex(c => c.id === categoryId);
      if (currentIndex <= 0) {
        alert("❌ Cannot move right: No previous sibling available");
        return prev;
      }

      const previousSibling = siblings[currentIndex - 1];
      newParentId = previousSibling.id;
    }

    if (direction === "left") {
      // Move left → move to parent's level
      if (!category.parentId) {
        alert("❌ Cannot move left: Already at root level");
        return prev;
      }

      const parent = categories.find(c => c.id === category.parentId);
      newParentId = parent ? parent.parentId || null : null;
    }

    // Prevent circular reference
    if (newParentId) {
      let checkId = newParentId;
      while (checkId) {
        if (checkId === categoryId) {
          alert("❌ Cannot move: Circular hierarchy detected");
          return prev;
        }
        const checkCat = categories.find(c => c.id === checkId);
        checkId = checkCat ? checkCat.parentId : null;
      }
    }

    // Update the category
    const updatedCategories = categories.map(cat =>
      cat.id === categoryId
        ? {
            ...cat,
            parentId: newParentId,
            modifiedAt: now,
            logs: [
              ...(cat.logs || []),
              {
                action: "Hierarchy Changed",
                timestamp: now,
                details:
                  direction === "right"
                    ? "Moved right (indented)"
                    : "Moved left (outdented)",
              },
            ],
          }
        : cat
    );

    // Return updated state
    setTimeout(() => regenerateCategoryIds(), 100);
    alert(
      `✅ Category moved ${
        direction === "right" ? "right (indented)" : "left (outdented)"
      } successfully!`
    );

    return { ...prev, categories: updatedCategories };
  });
};


  const addCategory = () => {
    if (!addingCategory.name.trim()) {
      alert('Please enter a category name');
      return;
    }

    // Validate required fields
    const requiredFields = addingCategory.fields.filter(f => f.required);
    for (const field of requiredFields) {
      if (!addingCategory.fieldData[field.id]) {
        alert(`Please fill required field: ${field.name}`);
        return;
      }
    }

    const categoryId = generateId(addingCategory.parentId);
    const now = new Date().toISOString();

    const newCategory = {
      id: 'id_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9),
      categoryId: categoryId,
      name: addingCategory.name.trim(),
      description: addingCategory.description.trim(),
      parentId: addingCategory.parentId,
      fields: [...addingCategory.fields],
      fieldData: {...addingCategory.fieldData},
      createdAt: now,
      modifiedAt: now,
      createdBy: 'User',
      logs: [{
        action: 'Created',
        timestamp: now,
        details: `Category "${addingCategory.name}" created`
      }]
    };
    
    setData(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));

    setAddingCategory({
      name: '',
      parentId: null,
      description: '',
      fields: [],
      fieldData: {}
    });

    alert('✅ Category added successfully!');
  };

  const updateCategory = () => {
    if (!editingCategory || !editingCategory.name.trim()) {
      alert('Please enter a category name');
      return;
    }

    // Validate required fields
    const requiredFields = editingCategory.fields.filter(f => f.required);
    for (const field of requiredFields) {
      if (!editingCategory.fieldData[field.id]) {
        alert(`Please fill required field: ${field.name}`);
        return;
      }
    }

    const now = new Date().toISOString();
    const oldCategory = data.categories.find(c => c.id === editingCategory.id);

    setData(prev => ({
      ...prev,
      categories: prev.categories.map(cat => 
        cat.id === editingCategory.id ? {
          ...cat,
          name: editingCategory.name.trim(),
          description: editingCategory.description.trim(),
          fields: [...editingCategory.fields],
          fieldData: {...editingCategory.fieldData},
          modifiedAt: now,
          logs: [
            ...cat.logs,
            {
              action: 'Modified',
              timestamp: now,
              details: `Updated category details`
            }
          ]
        } : cat
      )
    }));

    setEditingCategory(null);
    alert('✅ Category updated successfully!');
  };

  const duplicateCategory = (categoryId) => {
    const category = data.categories.find(c => c.id === categoryId);
    if (!category) return;

    const now = new Date().toISOString();
    const newCategoryId = generateId(category.parentId);

    const duplicated = {
      id: 'id_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9),
      categoryId: newCategoryId,
      name: category.name + ' (Copy)',
      description: category.description,
      parentId: category.parentId,
      fields: [...category.fields],
      fieldData: {...category.fieldData},
      createdAt: now,
      modifiedAt: now,
      createdBy: 'User',
      logs: [{
        action: 'Duplicated',
        timestamp: now,
        details: `Duplicated from "${category.name}" (${category.categoryId})`
      }]
    };

    setData(prev => ({
      ...prev,
      categories: [...prev.categories, duplicated]
    }));

    alert('✅ Category duplicated successfully!');
  };

  const deleteCategory = (id) => {
    const hasChildren = data.categories.some(cat => cat.parentId === id);
    
    if (hasChildren) {
      alert('❌ Cannot delete: This category has child categories. Delete children first.');
      return;
    }

    const usedInStages = data.stages.some(stage => 
      stage.selectedCategories.includes(id)
    );

    if (usedInStages) {
      alert('❌ Cannot delete: This category is being used in stages.');
      return;
    }

    if (window.confirm('⚠️ Delete this category permanently?')) {
      setData(prev => ({
        ...prev,
        categories: prev.categories.filter(cat => cat.id !== id)
      }));
      setTimeout(regenerateCategoryIds, 100);
      alert('✅ Category deleted successfully!');
    }
  };

  const addFieldToCategory = (categoryId) => {
    if (!newField.name.trim()) {
      alert('Please enter a field name');
      return;
    }

    const field = {
      id: 'field_' + Date.now().toString(36),
      name: newField.name.trim(),
      type: newField.type,
      required: newField.required,
      options: newField.type === 'dropdown' || newField.type === 'radio' ? 
        newField.options.filter(o => o.trim()) : []
    };

    if (editingCategory && editingCategory.id === categoryId) {
      setEditingCategory(prev => ({
        ...prev,
        fields: [...prev.fields, field]
      }));
    } else if (addingCategory.parentId !== null || addingCategory.name) {
      setAddingCategory(prev => ({
        ...prev,
        fields: [...prev.fields, field]
      }));
    } else {
      setData(prev => ({
        ...prev,
        categories: prev.categories.map(cat => 
          cat.id === categoryId ? {
            ...cat,
            fields: [...cat.fields, field],
            modifiedAt: new Date().toISOString(),
            logs: [
              ...cat.logs,
              {
                action: 'Field Added',
                timestamp: new Date().toISOString(),
                details: `Added field "${field.name}" (${field.type})`
              }
            ]
          } : cat
        )
      }));
    }

    setNewField({
      name: '',
      type: 'text',
      required: false,
      options: []
    });
    alert('✅ Field added successfully!');
  };

  const removeFieldFromCategory = (categoryId, fieldId) => {
    if (editingCategory && editingCategory.id === categoryId) {
      setEditingCategory(prev => ({
        ...prev,
        fields: prev.fields.filter(f => f.id !== fieldId)
      }));
    } else if (addingCategory.fields.length > 0) {
      setAddingCategory(prev => ({
        ...prev,
        fields: prev.fields.filter(f => f.id !== fieldId)
      }));
    } else {
      setData(prev => ({
        ...prev,
        categories: prev.categories.map(cat => 
          cat.id === categoryId ? {
            ...cat,
            fields: cat.fields.filter(f => f.id !== fieldId),
            modifiedAt: new Date().toISOString()
          } : cat
        )
      }));
    }
  };

  const renderFieldInput = (field, value, onChange) => {
    const commonClass = "w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none";
    
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={commonClass}
            rows="3"
            required={field.required}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={commonClass}
            required={field.required}
          />
        );
      case 'email':
        return (
          <input
            type="email"
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={commonClass}
            required={field.required}
          />
        );
      case 'phone':
        return (
          <input
            type="tel"
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={commonClass}
            required={field.required}
          />
        );
      case 'url':
        return (
          <input
            type="url"
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={commonClass}
            placeholder="https://..."
            required={field.required}
          />
        );
      case 'date':
        return (
          <input
            type="date"
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={commonClass}
            required={field.required}
          />
        );
      case 'dropdown':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={commonClass}
            required={field.required}
          >
            <option value="">Select an option</option>
            {field.options.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(field.id, e.target.checked)}
            className="w-5 h-5"
          />
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options.map((opt, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={field.id}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => onChange(field.id, e.target.value)}
                  required={field.required}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );
      case 'file':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={commonClass}
            placeholder="Enter file URL"
            required={field.required}
          />
        );
      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={commonClass}
            required={field.required}
          />
        );
    }
  };

  const getChildrenByParentId = (parentId) => {
    return data.categories.filter(cat => cat.parentId === parentId);
  };

  const getRootCategories = () => {
    return data.categories.filter(cat => cat.parentId === null);
  };

  const getCategoryById = (id) => {
    return data.categories.find(cat => cat.id === id);
  };

  const getParentChain = (categoryId) => {
    const chain = [];
    let currentId = categoryId;

    while (currentId) {
      const category = getCategoryById(currentId);
      if (!category) break;
      
      chain.unshift(category);
      currentId = category.parentId;
    }

    return chain;
  };

  const toggleCategoryExpand = (id) => {
    setExpandedCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filterCategories = (categories, searchTerm) => {
    if (!searchTerm.trim()) return categories;
    
    const term = searchTerm.toLowerCase();
    return categories.filter(cat => 
      cat.name.toLowerCase().includes(term) ||
      cat.categoryId.toLowerCase().includes(term) ||
      (cat.description && cat.description.toLowerCase().includes(term))
    );
  };

  const CategoryTreeView = ({ parentId = null, level = 0 }) => {
    let categories = getChildrenByParentId(parentId);
    
    if (level === 0 && categorySearch.trim()) {
      categories = filterCategories(categories, categorySearch);
    }

    if (categories.length === 0) return null;

    return (
      <div className={`${level > 0 ? 'ml-6 border-l-2 border-gray-300 pl-4 mt-2' : ''}`}>
        {categories.map(category => {
          const children = getChildrenByParentId(category.id);
          const hasChildren = children.length > 0;
          const hasFieldData = category.fieldData && Object.keys(category.fieldData).length > 0;

          return (
            <div key={category.id} className="mb-2">
              <div className="bg-white p-3 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    {hasChildren && (
                      <button
                        onClick={() => toggleCategoryExpand(category.id)}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        {expandedCategories[category.id] ? 
                          <ChevronDown size={18} /> : 
                          <ChevronRight size={18} />
                        }
                      </button>
                    )}
                    {!hasChildren && <div className="w-[18px]"></div>}
                    
                    <FolderTree size={18} className="text-blue-600" />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-800">{category.name}</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-mono">
                          {category.categoryId}
                        </span>
                        {category.fields.length > 0 && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            {category.fields.length} fields
                          </span>
                        )}
                        {hasFieldData && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                            Has Data
                          </span>
                        )}
                      </div>
                      {category.description && (
                        <div className="text-xs text-gray-500 mt-1">{category.description}</div>
                      )}
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(category.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          Modified: {new Date(category.modifiedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Hierarchy Controls */}
                      <button
                        onClick={() => moveCategoryLevel(category.id, 'left')}
                        className="text-orange-600 hover:text-orange-800 text-sm px-2 py-1 bg-orange-50 rounded"
                        title="Move left (outdent)"
                        disabled={category.parentId === null}
                      >
                        <ArrowLeft size={14} />
                      </button>
                      <button
                        onClick={() => moveCategoryLevel(category.id, 'right')}
                        className="text-orange-600 hover:text-orange-800 text-sm px-2 py-1 bg-orange-50 rounded"
                        title="Move right (indent)"
                      >
                        <ArrowRight size={14} />
                      </button>
                      
                      {hasFieldData && (
                        <button
                          onClick={() => setViewFieldData(category.id)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm px-2 py-1 bg-indigo-50 rounded"
                          title="View field data"
                        >
                          <Eye size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => setShowFieldEditor(category.id)}
                        className="text-purple-600 hover:text-purple-800 text-sm px-2 py-1 bg-purple-50 rounded"
                        title="Manage fields"
                      >
                        <FileText size={14} />
                      </button>
                      <button
                        onClick={() => setEditingCategory({...category})}
                        className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 bg-blue-50 rounded"
                        title="Edit category"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => duplicateCategory(category.id)}
                        className="text-teal-600 hover:text-teal-800 text-sm px-2 py-1 bg-teal-50 rounded"
                        title="Duplicate category"
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        onClick={() => setAddingCategory({
                          name: '',
                          parentId: category.id,
                          description: '',
                          fields: [],
                          fieldData: {}
                        })}
                        className="text-green-600 hover:text-green-800 text-sm px-2 py-1 bg-green-50 rounded"
                        title="Add child category"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="text-red-600 hover:text-red-800 text-sm px-2 py-1 bg-red-50 rounded"
                        title="Delete category"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {hasChildren && (expandedCategories[category.id] || level === 0) && (
                <CategoryTreeView parentId={category.id} level={level + 1} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const addStage = () => {
    if (!newStage.title) {
      alert('Please enter a stage title');
      return;
    }

    const stage = {
      id: 'stage_' + Date.now().toString(36),
      title: newStage.title,
      jobPosting: newStage.jobPosting,
      guidelinesFile: newStage.guidelinesFile,
      worksheetFile: newStage.worksheetFile,
      taskChecklistFile: newStage.taskChecklistFile,
      worksheetFormat: newStage.worksheetFormat,
      supportiveDoc: newStage.supportiveDoc,
      selectedCategories: [...newStage.selectedCategories],
      createdAt: new Date().toISOString()
    };

    setData(prev => ({
      ...prev,
      stages: [...prev.stages, stage]
    }));

    setNewStage({
      title: '',
      jobPosting: '',
      guidelinesFile: '',
      worksheetFile: '',
      taskChecklistFile: '',
      worksheetFormat: '',
      supportiveDoc: '',
      selectedCategories: []
    });
    setShowStageForm(false);
  };

  const toggleStageExpand = (id) => {
    setExpandedStages(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'stage-data-' + Date.now() + '.json';
    link.click();
  };

  const getAllCategoriesFlat = () => {
    return data.categories.map(cat => {
      const chain = getParentChain(cat.id);
      return {
        ...cat,
        fullPath: chain.map(c => c.name).join(' > ')
      };
    }).filter(cat => 
      !categorySearch.trim() || 
      cat.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
      cat.categoryId.toLowerCase().includes(categorySearch.toLowerCase())
    );
  };

  const handleFieldDataChange = (fieldId, value, isEditing = false) => {
    if (isEditing) {
      setEditingCategory(prev => ({
        ...prev,
        fieldData: {
          ...prev.fieldData,
          [fieldId]: value
        }
      }));
    } else {
      setAddingCategory(prev => ({
        ...prev,
        fieldData: {
          ...prev.fieldData,
          [fieldId]: value
        }
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Advanced Category & Stage Manager</h1>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCategoryLogs(!showCategoryLogs)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
              >
                <FileText size={18} />
                Logs
              </button>
              <button
                onClick={() => setShowCategoryManager(!showCategoryManager)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
              >
                <Edit2 size={18} />
                Categories
              </button>
              <button
                onClick={() => setShowStageForm(!showStageForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <Plus size={20} />
                Stage
              </button>
              <button
                onClick={exportData}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Export
              </button>
            </div>
          </div>

          {showCategoryLogs && (
            <div className="mb-6 p-6 bg-indigo-50 rounded-lg border border-indigo-200 max-h-96 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4 text-indigo-800">Category Activity Logs</h2>
              <div className="space-y-2">
                {data.categories.flatMap(cat => 
                  cat.logs.map((log, idx) => (
                    <div key={`${cat.id}-${idx}`} className="bg-white p-3 rounded border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">{cat.name}</span>
                          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                            {cat.categoryId}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            log.action === 'Created' ? 'bg-green-100 text-green-700' :
                            log.action === 'Modified' ? 'bg-blue-100 text-blue-700' :
                            log.action === 'Duplicated' ? 'bg-orange-100 text-orange-700' :
                            log.action === 'Hierarchy Changed' ? 'bg-purple-100 text-purple-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {log.action}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                    </div>
                  ))
                ).reverse()}
                {data.categories.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No activity logs yet</p>
                )}
              </div>
            </div>
          )}

          {showCategoryManager && (
            <div className="mb-6 p-6 bg-purple-50 rounded-lg border border-purple-200">
              <h2 className="text-xl font-semibold mb-4 text-purple-800 flex items-center gap-2">
                <Tag size={24} />
                Advanced Category Management System
              </h2>
              
              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    placeholder="Search categories by name or ID..."
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Add/Edit Category Form */}
                <div className="bg-white p-5 rounded-lg border-2 border-purple-300 shadow-sm max-h-[700px] overflow-y-auto">
                  <h3 className="font-semibold mb-4 text-lg flex items-center gap-2 sticky top-0 bg-white pb-2">
                    {editingCategory ? <Edit2 className="text-blue-600" size={20} /> : <Plus className="text-purple-600" size={20} />}
                    {editingCategory ? 'Edit Category' : 'Add New Category'}
                  </h3>
                  
                  <div className="space-y-4">
                    {editingCategory && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                        <span className="text-sm font-semibold text-blue-800">Category ID: </span>
                        <span className="text-sm font-mono text-blue-600">{editingCategory.categoryId}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Parent Category (Optional)
                      </label>
                      <select
                        value={editingCategory ? editingCategory.parentId || '' : addingCategory.parentId || ''}
                        onChange={(e) => {
                          const selectedParentId = e.target.value || null;
                          if (editingCategory) {
                            setEditingCategory({...editingCategory, parentId: selectedParentId});
                          } else {
                            // Get parent's fields when selecting parent
                            const parent = selectedParentId ? getCategoryById(selectedParentId) : null;
                            setAddingCategory({
                              ...addingCategory, 
                              parentId: selectedParentId,
                              fields: parent ? [...parent.fields] : [],
                              fieldData: {}
                            });
                          }
                        }}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                      >
                        <option value="">None (Root Level Category)</option>
                        {getAllCategoriesFlat()
                          .filter(cat => !editingCategory || cat.id !== editingCategory.id)
                          .map(cat => (
                            <option key={cat.id} value={cat.id}>
                              {cat.categoryId} - {cat.fullPath}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Category Name *
                      </label>
                      <input
                        type="text"
                        value={editingCategory ? editingCategory.name : addingCategory.name}
                        onChange={(e) => {
                          if (editingCategory) {
                            setEditingCategory({...editingCategory, name: e.target.value});
                          } else {
                            setAddingCategory({...addingCategory, name: e.target.value});
                          }
                        }}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                        placeholder="e.g., Position, Department, Location, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Description (Optional)
                      </label>
                      <textarea
                        value={editingCategory ? editingCategory.description : addingCategory.description}
                        onChange={(e) => {
                          if (editingCategory) {
                            setEditingCategory({...editingCategory, description: e.target.value});
                          } else {
                            setAddingCategory({...addingCategory, description: e.target.value});
                          }
                        }}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                        placeholder="Brief description of this category"
                        rows="2"
                      />
                    </div>

                    {/* Custom Fields Section */}
                    {(editingCategory ? editingCategory.fields : addingCategory.fields).length > 0 && (
                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-3 text-gray-800 flex items-center gap-2">
                          <FileText size={18} className="text-purple-600" />
                          Fill Custom Field Data
                        </h4>
                        <div className="space-y-3">
                          {(editingCategory ? editingCategory.fields : addingCategory.fields).map(field => (
                            <div key={field.id}>
                              <label className="block text-sm font-medium mb-1 text-gray-700">
                                {field.name}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                                <span className="text-xs text-gray-500 ml-2">({fieldTypes.find(t => t.value === field.type)?.label})</span>
                              </label>
                              {renderFieldInput(
                                field, 
                                editingCategory ? editingCategory.fieldData?.[field.id] : addingCategory.fieldData?.[field.id],
                                (fieldId, value) => handleFieldDataChange(fieldId, value, !!editingCategory)
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-4 border-t">
                      {editingCategory ? (
                        <>
                          <button
                            onClick={updateCategory}
                            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 font-medium"
                          >
                            <Save size={18} />
                            Update Category
                          </button>
                          <button
                            onClick={() => setEditingCategory(null)}
                            className="px-4 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                          >
                            <X size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={addCategory}
                            className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 font-medium"
                          >
                            <Plus size={18} />
                            Add Category
                          </button>
                          <button
                            onClick={() => setAddingCategory({ name: '', parentId: null, description: '', fields: [], fieldData: {} })}
                            className="px-4 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                          >
                            <X size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>💡 Tips:</strong> Use <ArrowLeft size={12} className="inline" />/<ArrowRight size={12} className="inline" /> to adjust hierarchy levels. 
                      Fill custom fields to store category-specific data!
                    </p>
                  </div>
                </div>

                {/* Category Tree View */}
                <div className="bg-white p-5 rounded-lg border-2 border-purple-300 shadow-sm">
                  <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                    <FolderTree className="text-purple-600" size={20} />
                    Category Hierarchy Tree
                  </h3>
                  
                  <div className="max-h-[700px] overflow-y-auto">
                    {data.categories.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <FolderTree size={48} className="mx-auto mb-3 text-gray-300" />
                        <p className="font-medium">No categories yet</p>
                        <p className="text-sm mt-1">Start building your hierarchy!</p>
                      </div>
                    ) : (
                      <CategoryTreeView />
                    )}
                  </div>
                </div>
              </div>

              {/* Category Stats */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-lg border-2 border-purple-200 text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {data.categories.length}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Total Categories</div>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-purple-200 text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {getRootCategories().length}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Root Categories</div>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-purple-200 text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {data.categories.filter(c => c.parentId !== null).length}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Child Categories</div>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-purple-200 text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {data.categories.filter(c => c.fields.length > 0).length}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">With Fields</div>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-purple-200 text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {data.stages.length}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Total Stages</div>
                </div>
              </div>
            </div>
          )}

          {/* Field Editor Modal */}
          {showFieldEditor && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b sticky top-0 bg-white">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <FileText className="text-purple-600" size={24} />
                      Manage Custom Fields
                    </h3>
                    <button
                      onClick={() => {
                        setShowFieldEditor(null);
                        setNewField({ name: '', type: 'text', required: false, options: [] });
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {getCategoryById(showFieldEditor)?.name} - {getCategoryById(showFieldEditor)?.categoryId}
                  </p>
                </div>

                <div className="p-6">
                  {/* Add New Field Form */}
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-6">
                    <h4 className="font-semibold mb-3 text-purple-800">Add New Field</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Field Name *</label>
                          <input
                            type="text"
                            value={newField.name}
                            onChange={(e) => setNewField({...newField, name: e.target.value})}
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="e.g., Employee Name, Salary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Field Type *</label>
                          <select
                            value={newField.type}
                            onChange={(e) => setNewField({...newField, type: e.target.value})}
                            className="w-full px-3 py-2 border rounded-lg"
                          >
                            {fieldTypes.map(type => (
                              <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {(newField.type === 'dropdown' || newField.type === 'radio') && (
                        <div>
                          <label className="block text-sm font-medium mb-1">Options (comma-separated)</label>
                          <input
                            type="text"
                            value={newField.options.join(', ')}
                            onChange={(e) => setNewField({
                              ...newField, 
                              options: e.target.value.split(',').map(o => o.trim())
                            })}
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Option 1, Option 2, Option 3"
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="required"
                          checked={newField.required}
                          onChange={(e) => setNewField({...newField, required: e.target.checked})}
                          className="w-4 h-4"
                        />
                        <label htmlFor="required" className="text-sm font-medium">
                          Required Field
                        </label>
                      </div>

                      <button
                        onClick={() => addFieldToCategory(showFieldEditor)}
                        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
                      >
                        <Plus size={18} />
                        Add Field
                      </button>
                    </div>
                  </div>

                  {/* Existing Fields List */}
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-800">Existing Fields</h4>
                    <div className="space-y-2">
                      {(getCategoryById(showFieldEditor)?.fields || []).map(field => (
                        <div key={field.id} className="bg-white p-3 rounded-lg border-2 border-gray-200 flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-800">{field.name}</span>
                              {field.required && (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Required</span>
                              )}
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                {fieldTypes.find(t => t.value === field.type)?.label}
                              </span>
                            </div>
                            {field.options && field.options.length > 0 && (
                              <div className="text-xs text-gray-500 mt-1">
                                Options: {field.options.join(', ')}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => removeFieldFromCategory(showFieldEditor, field.id)}
                            className="text-red-600 hover:text-red-800 ml-2"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      {(!getCategoryById(showFieldEditor)?.fields || getCategoryById(showFieldEditor)?.fields.length === 0) && (
                        <p className="text-center text-gray-500 py-4">No fields added yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* View Field Data Modal */}
          {viewFieldData && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b sticky top-0 bg-white">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <Eye className="text-indigo-600" size={24} />
                      View Field Data
                    </h3>
                    <button
                      onClick={() => setViewFieldData(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {getCategoryById(viewFieldData)?.name} - {getCategoryById(viewFieldData)?.categoryId}
                  </p>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {getCategoryById(viewFieldData)?.fields.map(field => {
                      const value = getCategoryById(viewFieldData)?.fieldData?.[field.id];
                      return (
                        <div key={field.id} className="bg-gray-50 p-4 rounded-lg border">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gray-800">{field.name}</span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                              {fieldTypes.find(t => t.value === field.type)?.label}
                            </span>
                          </div>
                          <div className="text-gray-700">
                            {field.type === 'checkbox' ? (
                              <span>{value ? '✅ Yes' : '❌ No'}</span>
                            ) : value ? (
                              <span>{value}</span>
                            ) : (
                              <span className="text-gray-400 italic">No data</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {(!getCategoryById(viewFieldData)?.fields || getCategoryById(viewFieldData)?.fields.length === 0) && (
                      <p className="text-center text-gray-500 py-4">No fields defined</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {showStageForm && (
            <div className="mb-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h2 className="text-xl font-semibold mb-4 text-blue-800">Add New Stage</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Title of The Stage *</label>
                  <input
                    type="text"
                    value={newStage.title}
                    onChange={(e) => setNewStage({...newStage, title: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter stage title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Job Posting</label>
                  <input
                    type="text"
                    value={newStage.jobPosting}
                    onChange={(e) => setNewStage({...newStage, jobPosting: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Worksheet Format</label>
                  <input
                    type="text"
                    value={newStage.worksheetFormat}
                    onChange={(e) => setNewStage({...newStage, worksheetFormat: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Guidelines File (URL)</label>
                  <input
                    type="text"
                    value={newStage.guidelinesFile}
                    onChange={(e) => setNewStage({...newStage, guidelinesFile: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Worksheet File (URL)</label>
                  <input
                    type="text"
                    value={newStage.worksheetFile}
                    onChange={(e) => setNewStage({...newStage, worksheetFile: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Task Checklist File (URL)</label>
                  <input
                    type="text"
                    value={newStage.taskChecklistFile}
                    onChange={(e) => setNewStage({...newStage, taskChecklistFile: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Supportive Document (URL)</label>
                  <input
                    type="text"
                    value={newStage.supportiveDoc}
                    onChange={(e) => setNewStage({...newStage, supportiveDoc: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={addStage}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Save size={18} />
                  Save Stage
                </button>
                <button
                  onClick={() => setShowStageForm(false)}
                  className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Stages ({data.stages.length})</h2>
          
          {data.stages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No stages added yet. Click "Add Stage" to create one.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {data.stages.map(stage => (
                <div key={stage.id} className="border rounded-lg overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 cursor-pointer hover:from-blue-200 hover:to-purple-200"
                    onClick={() => toggleStageExpand(stage.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        {expandedStages[stage.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                        <h3 className="font-bold text-lg">{stage.title}</h3>
                      </div>
                      <span className="text-sm text-gray-600">
                        {new Date(stage.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  {expandedStages[stage.id] && (
                    <div className="p-6 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stage.jobPosting && (
                          <div className="p-3 bg-gray-50 rounded">
                            <span className="font-semibold text-gray-700 block mb-1">Job Posting:</span>
                            <p className="text-gray-600">{stage.jobPosting}</p>
                          </div>
                        )}
                        {stage.worksheetFormat && (
                          <div className="p-3 bg-gray-50 rounded">
                            <span className="font-semibold text-gray-700 block mb-1">Worksheet Format:</span>
                            <p className="text-gray-600">{stage.worksheetFormat}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HierarchicalStageManager;