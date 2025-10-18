import React, { useState } from 'react';
import { MdAdd, MdExpandMore, MdChevronRight, MdEdit, MdSave, MdClose, MdDelete, MdContentCopy, MdSearch, MdDescription, MdLabel, MdArrowBack, MdArrowForward, MdFolder, MdFileUpload, MdFilterList, MdDownload, MdCheckCircle, MdWarning, MdSelectAll, MdRestartAlt, MdShowChart } from 'react-icons/md';

const CategoryManager = () => {
  const [data, setData] = useState({ categories: [], deletedLogs: [] });
  const [addingCategory, setAddingCategory] = useState({ name: '', parentId: null, description: '', fields: [], tags: [], priority: 'medium', status: 'active' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [categorySearch, setCategorySearch] = useState('');
  const [searchFilters, setSearchFilters] = useState({ type: 'name', status: 'all' });
  const [showFieldEditor, setShowFieldEditor] = useState(null);
  const [fieldEditorCategory, setFieldEditorCategory] = useState(null);
  const [newField, setNewField] = useState({ name: '', type: 'text', required: false, options: [] });
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [showStats, setShowStats] = useState(false);
  const [activeWindow, setActiveWindow] = useState(null);
  const [bulkTagsInput, setBulkTagsInput] = useState('');
  const [bulkStatusInput, setBulkStatusInput] = useState('active');
  const [uploadMessage, setUploadMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const fieldTypes = [
    { value: 'text', label: 'Text Input' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'number', label: 'Number' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'url', label: 'URL' },
    { value: 'date', label: 'Date' },
    { value: 'dropdown', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'radio', label: 'Radio' },
    { value: 'file', label: 'File' }
  ];

  const getCategoryById = (id) => data.categories.find(cat => cat.id === id);
  const getChildrenByParentId = (parentId) => data.categories.filter(cat => cat.parentId === parentId);
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
  const getAllCategoriesFlat = () => data.categories.map(cat => ({ ...cat, fullPath: getParentChain(cat.id).map(c => c.name).join(' > ') }));

  const regenerateCategoryIds = (categories) => {
    const updated = JSON.parse(JSON.stringify(categories));
    const updateIds = (parentId = null, prefix = '') => {
      const children = updated.filter(c => c.parentId === parentId).sort((a, b) => a.name.localeCompare(b.name));
      children.forEach((child, index) => {
        const newId = parentId ? `${prefix}.${index + 1}` : `CAT${index + 1}`;
        const idx = updated.findIndex(c => c.id === child.id);
        if (idx !== -1) updated[idx].categoryId = newId;
        updateIds(child.id, newId);
      });
    };
    updateIds(null, '');
    return updated;
  };

  const generateId = (parentId = null) => {
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

  const addCategory = () => {
    if (!addingCategory.name.trim()) {
      alert('Enter category name');
      return;
    }
    const now = new Date().toISOString();
    const categoryId = generateId(addingCategory.parentId);
    const newCategory = {
      id: 'id_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9),
      categoryId,
      name: addingCategory.name.trim(),
      description: addingCategory.description.trim(),
      parentId: addingCategory.parentId,
      fields: addingCategory.fields,
      tags: addingCategory.tags,
      priority: addingCategory.priority,
      status: addingCategory.status,
      createdAt: now,
      modifiedAt: now,
      logs: [{ action: 'Created', timestamp: now, details: 'Category created' }]
    };
    let updated = [...data.categories, newCategory];
    updated = regenerateCategoryIds(updated);
    setData({ ...data, categories: updated });
    setAddingCategory({ name: '', parentId: null, description: '', fields: [], tags: [], priority: 'medium', status: 'active' });
    alert('Category added');
  };

  const updateCategory = () => {
    if (!editingCategory || !editingCategory.name.trim()) {
      alert('Enter category name');
      return;
    }
    const now = new Date().toISOString();
    const updated = data.categories.map(cat =>
      cat.id === editingCategory.id
        ? {
            ...cat,
            name: editingCategory.name.trim(),
            description: editingCategory.description.trim(),
            parentId: editingCategory.parentId,
            fields: editingCategory.fields,
            tags: editingCategory.tags,
            priority: editingCategory.priority,
            status: editingCategory.status,
            modifiedAt: now,
            logs: [...(cat.logs || []), { action: 'Modified', timestamp: now, details: 'Category updated' }]
          }
        : cat
    );
    let final = regenerateCategoryIds(updated);
    setData({ ...data, categories: final });
    setEditingCategory(null);
    alert('Category updated');
  };

  const deleteCategory = (id) => {
    const category = getCategoryById(id);
    if (data.categories.some(cat => cat.parentId === id)) {
      alert('Delete children first');
      return;
    }
    if (!window.confirm('Delete this category?')) return;
    
    const now = new Date().toISOString();
    const deletedLog = {
      categoryId: category.categoryId,
      categoryName: category.name,
      action: 'Deleted',
      timestamp: now,
      details: 'Category deleted',
      categoryData: category
    };
    
    const updated = data.categories.filter(cat => cat.id !== id);
    let final = regenerateCategoryIds(updated);
    setData({ 
      categories: final, 
      deletedLogs: [...(data.deletedLogs || []), deletedLog] 
    });
    if (editingCategory?.id === id) setEditingCategory(null);
  };

  const moveCategoryOrder = (categoryId, direction) => {
    const category = data.categories.find(c => c.id === categoryId);
    if (!category) return;

    const siblings = getChildrenByParentId(category.parentId).sort((a, b) => {
      const aIdx = data.categories.findIndex(c => c.id === a.id);
      const bIdx = data.categories.findIndex(c => c.id === b.id);
      return aIdx - bIdx;
    });

    const currentIndex = siblings.findIndex(c => c.id === categoryId);
    if (currentIndex === -1) return;

    const now = new Date().toISOString();
    let updated = JSON.parse(JSON.stringify(data.categories));

    if (direction === 'up' && currentIndex > 0) {
      const currentPos = updated.findIndex(c => c.id === categoryId);
      const prevSiblingId = siblings[currentIndex - 1].id;
      const prevPos = updated.findIndex(c => c.id === prevSiblingId);
      [updated[currentPos], updated[prevPos]] = [updated[prevPos], updated[currentPos]];
    } else if (direction === 'down' && currentIndex < siblings.length - 1) {
      const currentPos = updated.findIndex(c => c.id === categoryId);
      const nextSiblingId = siblings[currentIndex + 1].id;
      const nextPos = updated.findIndex(c => c.id === nextSiblingId);
      [updated[currentPos], updated[nextPos]] = [updated[nextPos], updated[currentPos]];
    }

    setData({ ...data, categories: updated });
  };

  const moveCategoryLevel = (categoryId, direction) => {
    const category = data.categories.find(c => c.id === categoryId);
    if (!category) return;

    let newParentId = category.parentId;
    if (direction === 'right') {
      const siblings = getChildrenByParentId(category.parentId).sort((a, b) => {
        const aIdx = data.categories.findIndex(c => c.id === a.id);
        const bIdx = data.categories.findIndex(c => c.id === b.id);
        return aIdx - bIdx;
      });
      const currentIndex = siblings.findIndex(c => c.id === categoryId);
      if (currentIndex <= 0) return;
      newParentId = siblings[currentIndex - 1].id;
    } else if (direction === 'left') {
      if (!category.parentId) return;
      const parent = data.categories.find(c => c.id === category.parentId);
      newParentId = parent?.parentId || null;
    }

    const now = new Date().toISOString();
    let updated = data.categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, parentId: newParentId, modifiedAt: now, logs: [...(cat.logs || []), { action: 'Moved', timestamp: now, details: direction === 'right' ? 'Indented' : 'Outdented' }] }
        : cat
    );
    updated = regenerateCategoryIds(updated);
    setData({ ...data, categories: updated });
  };

  const duplicateCategoryWithHierarchy = (categoryId) => {
    const category = data.categories.find(c => c.id === categoryId);
    if (!category) return;
    const now = new Date().toISOString();
    const duplicatedCategories = [];
    const duplicateRecursive = (cat, newParentId) => {
      const newId = 'id_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
      const newCategoryId = generateId(newParentId);
      const duplicated = {
        id: newId,
        categoryId: newCategoryId,
        name: cat.name + ' (Copy)',
        description: cat.description,
        parentId: newParentId,
        fields: JSON.parse(JSON.stringify(cat.fields || [])),
        tags: [...(cat.tags || [])],
        priority: cat.priority,
        status: cat.status,
        createdAt: now,
        modifiedAt: now,
        logs: [{ action: 'Duplicated', timestamp: now, details: `From "${cat.name}"` }]
      };
      duplicatedCategories.push(duplicated);
      const children = getChildrenByParentId(cat.id);
      children.forEach(child => duplicateRecursive(child, newId));
    };
    duplicateRecursive(category, category.parentId);
    let updated = [...data.categories, ...duplicatedCategories];
    updated = regenerateCategoryIds(updated);
    setData({ ...data, categories: updated });
  };

  const bulkEditStatus = () => {
    if (selectedCategories.size === 0) {
      alert('Select categories first');
      return;
    }
    const now = new Date().toISOString();
    const updated = data.categories.map(cat => {
      if (selectedCategories.has(cat.id)) {
        return {
          ...cat,
          status: bulkStatusInput,
          modifiedAt: now,
          logs: [...(cat.logs || []), { action: 'Bulk Edit', timestamp: now, details: `Status: ${bulkStatusInput}` }]
        };
      }
      return cat;
    });
    setData({ ...data, categories: updated });
    setSelectedCategories(new Set());
    alert('Status updated');
  };

  const bulkAddTags = () => {
    if (selectedCategories.size === 0) {
      alert('Select categories first');
      return;
    }
    const tags = bulkTagsInput.split(',').map(t => t.trim()).filter(t => t);
    if (tags.length === 0) return;
    const now = new Date().toISOString();
    const updated = data.categories.map(cat => {
      if (selectedCategories.has(cat.id)) {
        const combinedTags = [...new Set([...cat.tags, ...tags])];
        return { ...cat, tags: combinedTags, modifiedAt: now, logs: [...(cat.logs || []), { action: 'Tags Added', timestamp: now, details: `Added: ${tags.join(', ')}` }] };
      }
      return cat;
    });
    setData({ ...data, categories: updated });
    setBulkTagsInput('');
    alert('Tags added');
  };

  const bulkDelete = () => {
    if (selectedCategories.size === 0) {
      alert('Select categories first');
      return;
    }
    if (!window.confirm(`Delete ${selectedCategories.size} categories?`)) return;

    const deletedCount = selectedCategories.size;
    const now = new Date().toISOString();
    const deletedCategories = data.categories.filter(cat => selectedCategories.has(cat.id));
    
    const newDeletedLogs = deletedCategories.map(cat => ({
      categoryId: cat.categoryId,
      categoryName: cat.name,
      action: 'Deleted',
      timestamp: now,
      details: 'Bulk deleted',
      categoryData: cat
    }));

    let updated = data.categories.filter(cat => !selectedCategories.has(cat.id));
    updated = regenerateCategoryIds(updated);

    setData({ 
      categories: updated, 
      deletedLogs: [...(data.deletedLogs || []), ...newDeletedLogs] 
    });
    setSelectedCategories(new Set());
    alert(`Deleted ${deletedCount} categories`);
  };

  const addFieldToCategory = () => {
    if (!newField.name.trim()) {
      alert('Enter field name');
      return;
    }
    const field = {
      id: 'field_' + Date.now(),
      name: newField.name.trim(),
      type: newField.type,
      required: newField.required,
      options: (newField.type === 'dropdown' || newField.type === 'radio') ? newField.options.filter(o => o.trim()) : []
    };
    if (editingCategory) {
      setEditingCategory(prev => ({ ...prev, fields: [...(prev.fields || []), field] }));
    } else {
      setAddingCategory(prev => ({ ...prev, fields: [...prev.fields, field] }));
    }
    setNewField({ name: '', type: 'text', required: false, options: [] });
  };

  const removeField = (fieldId) => {
    if (editingCategory) {
      setEditingCategory(prev => ({ ...prev, fields: prev.fields.filter(f => f.id !== fieldId) }));
    } else {
      setAddingCategory(prev => ({ ...prev, fields: prev.fields.filter(f => f.id !== fieldId) }));
    }
  };

  const toggleCategoryExpand = (id) => {
    setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCategorySelect = (id) => {
    const newSet = new Set(selectedCategories);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedCategories(newSet);
  };

  const selectAll = () => {
    if (selectedCategories.size === data.categories.length) {
      setSelectedCategories(new Set());
    } else {
      setSelectedCategories(new Set(data.categories.map(c => c.id)));
    }
  };

  const getAllDescendants = (categoryId) => {
    const descendants = [];
    const stack = [categoryId];
    while (stack.length > 0) {
      const id = stack.pop();
      const children = getChildrenByParentId(id);
      children.forEach(child => {
        descendants.push(child.id);
        stack.push(child.id);
      });
    }
    return descendants;
  };

  const searchCategories = () => {
    let results = data.categories;
    
    if (categorySearch.trim()) {
      const query = categorySearch.toLowerCase();
      const matchedIds = new Set();
      
      data.categories.forEach(cat => {
        let matches = false;
        if (searchFilters.type === 'name') {
          matches = cat.name.toLowerCase().includes(query);
        } else if (searchFilters.type === 'id') {
          matches = cat.categoryId.toLowerCase().includes(query);
        } else if (searchFilters.type === 'tags') {
          matches = cat.tags.some(tag => tag.toLowerCase().includes(query));
        }
        
        if (matches) {
          matchedIds.add(cat.id);
          // Add all ancestors
          let currentParentId = cat.parentId;
          while (currentParentId) {
            matchedIds.add(currentParentId);
            const parent = getCategoryById(currentParentId);
            currentParentId = parent?.parentId || null;
          }
          // Add all descendants
          getAllDescendants(cat.id).forEach(id => matchedIds.add(id));
        }
      });
      
      results = results.filter(cat => matchedIds.has(cat.id));
    }
    
    if (searchFilters.status !== 'all') {
      results = results.filter(cat => cat.status === searchFilters.status);
    }
    
    return results.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'date') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'priority') {
        const pMap = { high: 0, medium: 1, low: 2 };
        return pMap[a.priority] - pMap[b.priority];
      }
      return 0;
    });
  };

  const handleJSONUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        let jsonData = JSON.parse(event.target.result);
        if (!Array.isArray(jsonData)) jsonData = jsonData.categories || [];
        const now = new Date().toISOString();
        const idMap = {};
        
        const newCategories = jsonData.map((cat, idx) => {
          const newId = 'id_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
          idMap[cat.id || idx] = newId;
          
          return {
            id: newId,
            categoryId: cat.categoryId || `CAT${data.categories.length + idx + 1}`,
            name: cat.name || `Category ${idx + 1}`,
            description: cat.description || '',
            parentId: null,
            fields: cat.fields || [],
            tags: cat.tags || [],
            priority: cat.priority || 'medium',
            status: cat.status || 'active',
            createdAt: now,
            modifiedAt: now,
            logs: [{ action: 'Imported', timestamp: now, details: 'JSON Import' }]
          };
        });

        // Map parent IDs to new IDs
        const mappedCategories = newCategories.map((cat, idx) => {
          const originalCat = jsonData[idx];
          if (originalCat.parentId && idMap[originalCat.parentId]) {
            return { ...cat, parentId: idMap[originalCat.parentId] };
          }
          return cat;
        });

        let updated = [...data.categories, ...mappedCategories];
        updated = regenerateCategoryIds(updated);
        setData({ ...data, categories: updated });
        setUploadMessage(`Success: ${newCategories.length} imported`);
        setTimeout(() => setUploadMessage(''), 3000);
      } catch (error) {
        setUploadMessage(`Error: ${error.message}`);
      }
    };
    reader.readAsText(file);
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const lines = event.target.result.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const now = new Date().toISOString();
        const idMap = {};
        
        const newCategories = lines.slice(1).map((line, idx) => {
          const values = line.split(',').map(v => v.trim());
          const obj = {};
          headers.forEach((header, i) => {
            obj[header] = values[i] || '';
          });
          
          const newId = 'id_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
          const origId = obj.id || idx;
          idMap[origId] = newId;
          
          return {
            id: newId,
            categoryId: obj.categoryid || `CAT${data.categories.length + idx + 1}`,
            name: obj.name || `Category ${idx + 1}`,
            description: obj.description || '',
            parentId: null,
            fields: [],
            tags: obj.tags ? obj.tags.split(';').map(t => t.trim()) : [],
            priority: obj.priority || 'medium',
            status: obj.status || 'active',
            createdAt: now,
            modifiedAt: now,
            logs: [{ action: 'Imported', timestamp: now, details: 'CSV Import' }]
          };
        });

        // Map parent IDs
        const mappedCategories = newCategories.map((cat, idx) => {
          const line = lines[idx + 1];
          const values = line.split(',').map(v => v.trim());
          const obj = {};
          headers.forEach((header, i) => {
            obj[header] = values[i] || '';
          });
          
          if (obj.parentid && idMap[obj.parentid]) {
            return { ...cat, parentId: idMap[obj.parentid] };
          }
          return cat;
        });

        let updated = [...data.categories, ...mappedCategories];
        updated = regenerateCategoryIds(updated);
        setData({ ...data, categories: updated });
        setUploadMessage(`Success: ${newCategories.length} imported`);
        setTimeout(() => setUploadMessage(''), 3000);
      } catch (error) {
        setUploadMessage(`Error: ${error.message}`);
      }
    };
    reader.readAsText(file);
  };

  const downloadTemplate = (type) => {
    if (type === 'json') {
      const template = { 
        categories: [
          { id: 'cat1', categoryId: 'CAT1', name: 'Parent', description: 'Test', parentId: null, tags: ['tag1'], priority: 'medium', status: 'active', fields: [] },
          { id: 'cat2', categoryId: 'CAT1.1', name: 'Child', description: 'Nested', parentId: 'cat1', tags: [], priority: 'medium', status: 'active', fields: [] }
        ]
      };
      const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'template.json';
      link.click();
    } else {
      const csv = 'id,categoryid,name,description,parentid,tags,priority,status\ncat1,CAT1,Parent,Test,,tag1,medium,active\ncat2,CAT1.1,Child,Nested,cat1,,medium,active';
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'template.csv';
      link.click();
    }
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `categories-${Date.now()}.json`;
    link.click();
  };

  const searchResults = searchCategories();
  const filteredIds = categorySearch.trim() || searchFilters.status !== 'all' ? new Set(searchResults.map(c => c.id)) : null;

  const stats = {
    total: data.categories.length,
    active: data.categories.filter(c => c.status === 'active').length,
    highPriority: data.categories.filter(c => c.priority === 'high').length,
    withFields: data.categories.filter(c => c.fields?.length > 0).length
  };

  const CategoryTreeView = ({ parentId = null, level = 0 }) => {
    const categories = getChildrenByParentId(parentId);
    if (categories.length === 0) return null;

    return (
      <div className={level > 0 ? `ml-8 border-l-2 ${isDarkMode ? 'border-slate-600' : 'border-slate-300'} pl-4 mt-2` : ''}>
        {categories.map(cat => {
          const children = getChildrenByParentId(cat.id);
          const hasChildren = children.length > 0;
          const isMatched = !filteredIds || filteredIds.has(cat.id);
          const hasMatchedChildren = hasChildren && filteredIds && children.some(child => filteredIds.has(child.id));
          const shouldShow = !filteredIds || isMatched || hasMatchedChildren;

          if (!shouldShow) return null;

          return (
            <div key={cat.id} className="mb-3">
              <div className={`border rounded-lg p-3 transition ${isDarkMode ? 'border-slate-600 bg-slate-800 hover:border-slate-500' : 'border-slate-300 bg-white hover:border-slate-400'}`}>
                <div className="flex items-center gap-3 justify-between flex-wrap">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <input type="checkbox" checked={selectedCategories.has(cat.id)} onChange={() => toggleCategorySelect(cat.id)} className="w-4 h-4" />
                    {hasChildren && <button onClick={() => toggleCategoryExpand(cat.id)} className={isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-800'}>{expandedCategories[cat.id] || (isMatched && hasMatchedChildren) ? <MdExpandMore size={18} /> : <MdChevronRight size={18} />}</button>}
                    {!hasChildren && <div className="w-5"></div>}
                    <MdFolder size={18} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{cat.name}</span>
                        <span className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>{cat.categoryId}</span>
                        <span className={`text-xs px-2 py-1 rounded ${cat.status === 'active' ? (isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700') : (isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700')}`}>{cat.status}</span>
                      </div>
                      {cat.description && <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{cat.description}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => moveCategoryOrder(cat.id, 'up')} className={`p-1.5 rounded flex items-center gap-1 ${isDarkMode ? 'text-blue-400 hover:bg-blue-900' : 'text-blue-600 hover:bg-blue-100'}`} title="Move Up"><MdArrowBack size={14} style={{transform: 'rotate(90deg)'}} /></button>
                    <button onClick={() => moveCategoryOrder(cat.id, 'down')} className={`p-1.5 rounded flex items-center gap-1 ${isDarkMode ? 'text-blue-400 hover:bg-blue-900' : 'text-blue-600 hover:bg-blue-100'}`} title="Move Down"><MdArrowForward size={14} style={{transform: 'rotate(90deg)'}} /></button>
                    <button onClick={() => moveCategoryLevel(cat.id, 'left')} disabled={!cat.parentId} className={`p-1.5 rounded disabled:opacity-50 ${isDarkMode ? 'text-orange-400 hover:bg-orange-900' : 'text-orange-600 hover:bg-orange-100'}`} title="Outdent"><MdArrowBack size={14} /></button>
                    <button onClick={() => moveCategoryLevel(cat.id, 'right')} className={`p-1.5 rounded ${isDarkMode ? 'text-orange-400 hover:bg-orange-900' : 'text-orange-600 hover:bg-orange-100'}`} title="Indent"><MdArrowForward size={14} /></button>
                    <button onClick={() => { setFieldEditorCategory(cat); setShowFieldEditor(cat.id); }} className={`p-1.5 rounded ${isDarkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200'}`}><MdDescription size={14} /></button>
                    <button onClick={() => setEditingCategory({...cat})} className={`p-1.5 rounded ${isDarkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200'}`}><MdEdit size={14} /></button>
                    <button onClick={() => duplicateCategoryWithHierarchy(cat.id)} className={`p-1.5 rounded ${isDarkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200'}`}><MdContentCopy size={14} /></button>
                    <button onClick={() => setAddingCategory({...addingCategory, parentId: cat.id})} className={`p-1.5 rounded ${isDarkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-200'}`}><MdAdd size={14} /></button>
                    <button onClick={() => deleteCategory(cat.id)} className={`p-1.5 rounded ${isDarkMode ? 'text-red-400 hover:bg-red-900' : 'text-red-600 hover:bg-red-100'}`}><MdDelete size={14} /></button>
                  </div>
                </div>
              </div>
              {hasChildren && (expandedCategories[cat.id] || (isMatched && hasMatchedChildren)) && <CategoryTreeView parentId={cat.id} level={level + 1} />}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`min-h-screen p-6 transition-colors ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Category Manager</h1>
            <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Manage hierarchical categories efficiently</p>
          </div>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className={`px-4 py-2 rounded-lg font-medium transition ${isDarkMode ? 'bg-yellow-600 text-white hover:bg-yellow-700' : 'bg-slate-800 text-white hover:bg-slate-900'}`}>
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        <div className="flex gap-3 mb-8 flex-wrap">
          <button onClick={() => setActiveWindow(activeWindow === 'logs' ? null : 'logs')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${activeWindow === 'logs' ? 'bg-indigo-600 text-white' : (isDarkMode ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-slate-200 text-slate-800 hover:bg-slate-300')}`}><MdDescription size={16} /> Logs</button>
          <button onClick={() => setActiveWindow(activeWindow === 'bulk' ? null : 'bulk')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${activeWindow === 'bulk' ? 'bg-orange-600 text-white' : (isDarkMode ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-slate-200 text-slate-800 hover:bg-slate-300')}`}><MdFileUpload size={16} /> Bulk</button>
          <button onClick={() => setShowStats(!showStats)} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${showStats ? 'bg-cyan-600 text-white' : (isDarkMode ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-slate-200 text-slate-800 hover:bg-slate-300')}`}><MdShowChart size={16} /> Stats</button>
          <button onClick={exportData} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${isDarkMode ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}><MdDownload size={16} /> Export</button>
        </div>

        {showStats && (
          <div className={`mb-8 p-6 rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-300'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-lg text-white">
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs mt-1">Total</p>
              </div>
              <div className="bg-gradient-to-br from-green-600 to-green-700 p-4 rounded-lg text-white">
                <div className="text-2xl font-bold">{stats.active}</div>
                <p className="text-xs mt-1">Active</p>
              </div>
              <div className="bg-gradient-to-br from-red-600 to-red-700 p-4 rounded-lg text-white">
                <div className="text-2xl font-bold">{stats.highPriority}</div>
                <p className="text-xs mt-1">High Priority</p>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 rounded-lg text-white">
                <div className="text-2xl font-bold">{stats.withFields}</div>
                <p className="text-xs mt-1">With Fields</p>
              </div>
            </div>
          </div>
        )}

        {activeWindow === 'logs' && (
          <div className={`mb-8 p-6 rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-300'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Activity Logs</h2>
              <button onClick={() => setActiveWindow(null)} className={`${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-gray-900'}`}><MdClose size={20} /></button>
            </div>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {[...data.categories.flatMap(cat => (cat.logs || []).map((log, idx) => (
                <div key={`cat-${cat.id}-${idx}`} className={`p-3 rounded border-l-4 border-indigo-500 text-sm ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                  <div className="flex justify-between gap-2">
                    <div><span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{cat.name}</span> <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{log.action}</span></div>
                    <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              ))), ...((data.deletedLogs || []).map((log, idx) => (
                <div key={`deleted-${idx}`} className={`p-3 rounded border-l-4 border-red-500 text-sm ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                  <div className="flex justify-between gap-2">
                    <div><span className={`font-semibold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>{log.categoryName}</span> <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{log.action}</span></div>
                    <span className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              )))].reverse().slice(0, 50)}
            </div>
          </div>
        )}

        {activeWindow === 'bulk' && (
          <div className={`mb-8 p-6 rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-300'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Bulk Operations</h2>
              <button onClick={() => setActiveWindow(null)} className={`${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-gray-900'}`}><MdClose size={20} /></button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`p-6 rounded-lg border ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-300'}`}>
                <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}><MdFileUpload size={18} /> Upload</h3>
                <div className="space-y-4">
                  <label className={`flex items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition ${isDarkMode ? 'border-slate-500 hover:bg-slate-600 bg-slate-800' : 'border-slate-400 hover:bg-slate-100 bg-white'}`}>
                    <div className="text-center">
                      <MdFileUpload className={`mx-auto mb-2 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} size={24} />
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>JSON File</p>
                      <input type="file" accept=".json" onChange={handleJSONUpload} className="hidden" />
                    </div>
                  </label>
                  <label className={`flex items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition ${isDarkMode ? 'border-slate-500 hover:bg-slate-600 bg-slate-800' : 'border-slate-400 hover:bg-slate-100 bg-white'}`}>
                    <div className="text-center">
                      <MdFileUpload className={`mx-auto mb-2 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} size={24} />
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>CSV File</p>
                      <input type="file" accept=".csv" onChange={handleCSVUpload} className="hidden" />
                    </div>
                  </label>
                  <div className="flex gap-2">
                    <button onClick={() => downloadTemplate('json')} className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm font-medium">JSON Template</button>
                    <button onClick={() => downloadTemplate('csv')} className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm font-medium">CSV Template</button>
                  </div>
                  {uploadMessage && (
                    <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${uploadMessage.includes('Success') ? (isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800') : (isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800')}`}>
                      {uploadMessage.includes('Success') ? <MdCheckCircle size={16} /> : <MdWarning size={16} />}
                      {uploadMessage}
                    </div>
                  )}
                </div>
              </div>
              <div className={`p-6 rounded-lg border ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-300'}`}>
                <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Bulk Edit ({selectedCategories.size})</h3>
                <div className="space-y-4">
                  <button onClick={selectAll} className={`text-xs flex items-center gap-1 ${isDarkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'}`}><MdSelectAll size={14} /> {selectedCategories.size === data.categories.length ? 'Deselect All' : 'Select All'}</button>
                  <div>
                    <label className={`text-sm block mb-2 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Status</label>
                    <select value={bulkStatusInput} onChange={(e) => setBulkStatusInput(e.target.value)} className={`w-full px-3 py-2 rounded text-sm ${isDarkMode ? 'bg-slate-800 border border-slate-600 text-white' : 'bg-white border border-slate-300 text-gray-900'}`}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <button onClick={bulkEditStatus} disabled={selectedCategories.size === 0} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium">Update Status</button>
                  <div>
                    <label className={`text-sm block mb-2 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Add Tags</label>
                    <input type="text" placeholder="tag1, tag2" value={bulkTagsInput} onChange={(e) => setBulkTagsInput(e.target.value)} className={`w-full px-3 py-2 rounded text-sm mb-2 ${isDarkMode ? 'bg-slate-800 border border-slate-600 text-white' : 'bg-white border border-slate-300 text-gray-900'}`} />
                    <button onClick={bulkAddTags} disabled={selectedCategories.size === 0} className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 text-sm font-medium">Add Tags</button>
                  </div>
                  <button onClick={bulkDelete} disabled={selectedCategories.size === 0} className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 text-sm font-medium">Delete Selected</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`border rounded-xl p-6 ${isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-300'}`}>
            <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{editingCategory ? <MdEdit size={18} /> : <MdAdd size={18} />} {editingCategory ? 'Edit' : 'Add'}</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <label className={`text-sm font-medium block mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Parent</label>
                <select value={editingCategory ? editingCategory.parentId || '' : addingCategory.parentId || ''} onChange={(e) => { const id = e.target.value || null; if (editingCategory) setEditingCategory({...editingCategory, parentId: id}); else setAddingCategory({...addingCategory, parentId: id}); }} className={`w-full px-3 py-2 rounded text-sm ${isDarkMode ? 'bg-slate-700 border border-slate-600 text-white' : 'bg-slate-50 border border-slate-300 text-gray-900'}`}>
                  <option value="">Root Level</option>
                  {getAllCategoriesFlat().filter(c => !editingCategory || c.id !== editingCategory.id).map(c => <option key={c.id} value={c.id}>{c.categoryId} - {c.fullPath}</option>)}
                </select>
              </div>
              <div>
                <label className={`text-sm font-medium block mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Name</label>
                <input type="text" value={editingCategory ? editingCategory.name : addingCategory.name} onChange={(e) => editingCategory ? setEditingCategory({...editingCategory, name: e.target.value}) : setAddingCategory({...addingCategory, name: e.target.value})} className={`w-full px-3 py-2 rounded text-sm ${isDarkMode ? 'bg-slate-700 border border-slate-600 text-white' : 'bg-slate-50 border border-slate-300 text-gray-900'}`} />
              </div>
              <div>
                <label className={`text-sm font-medium block mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Description</label>
                <textarea value={editingCategory ? editingCategory.description : addingCategory.description} onChange={(e) => editingCategory ? setEditingCategory({...editingCategory, description: e.target.value}) : setAddingCategory({...addingCategory, description: e.target.value})} className={`w-full px-3 py-2 rounded text-sm ${isDarkMode ? 'bg-slate-700 border border-slate-600 text-white' : 'bg-slate-50 border border-slate-300 text-gray-900'}`} rows="2" />
              </div>
              <div>
                <label className={`text-sm font-medium block mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Priority</label>
                <select value={editingCategory ? editingCategory.priority : addingCategory.priority} onChange={(e) => editingCategory ? setEditingCategory({...editingCategory, priority: e.target.value}) : setAddingCategory({...addingCategory, priority: e.target.value})} className={`w-full px-3 py-2 rounded text-sm ${isDarkMode ? 'bg-slate-700 border border-slate-600 text-white' : 'bg-slate-50 border border-slate-300 text-gray-900'}`}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className={`text-sm font-medium block mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Status</label>
                <select value={editingCategory ? editingCategory.status : addingCategory.status} onChange={(e) => editingCategory ? setEditingCategory({...editingCategory, status: e.target.value}) : setAddingCategory({...addingCategory, status: e.target.value})} className={`w-full px-3 py-2 rounded text-sm ${isDarkMode ? 'bg-slate-700 border border-slate-600 text-white' : 'bg-slate-50 border border-slate-300 text-gray-900'}`}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className={`text-sm font-medium block mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Tags</label>
                <input type="text" value={editingCategory ? editingCategory.tags.join(', ') : addingCategory.tags.join(', ')} onChange={(e) => { const tags = e.target.value.split(',').map(t => t.trim()).filter(t => t); editingCategory ? setEditingCategory({...editingCategory, tags}) : setAddingCategory({...addingCategory, tags}); }} className={`w-full px-3 py-2 rounded text-sm ${isDarkMode ? 'bg-slate-700 border border-slate-600 text-white' : 'bg-slate-50 border border-slate-300 text-gray-900'}`} placeholder="tag1, tag2" />
              </div>
              <div className={`flex gap-2 pt-4 border-t ${isDarkMode ? 'border-slate-600' : 'border-slate-300'}`}>
                {editingCategory ? (
                  <>
                    <button onClick={updateCategory} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm flex items-center justify-center gap-2"><MdSave size={14} /> Update</button>
                    <button onClick={() => setEditingCategory(null)} className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-600 text-white hover:bg-slate-500' : 'bg-slate-300 text-gray-900 hover:bg-slate-400'}`}><MdClose size={14} /></button>
                  </>
                ) : (
                  <>
                    <button onClick={addCategory} className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm flex items-center justify-center gap-2"><MdAdd size={14} /> Add</button>
                    <button onClick={() => setAddingCategory({ name: '', parentId: null, description: '', fields: [], tags: [], priority: 'medium', status: 'active' })} className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-slate-600 text-white hover:bg-slate-500' : 'bg-slate-300 text-gray-900 hover:bg-slate-400'}`}><MdClose size={14} /></button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className={`border rounded-xl p-6 ${isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-300'}`}>
              <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}><MdSearch size={18} /> Search</h3>
              <div className="space-y-3">
                <input type="text" value={categorySearch} onChange={(e) => setCategorySearch(e.target.value)} placeholder="Search..." className={`w-full px-3 py-2 rounded text-sm ${isDarkMode ? 'bg-slate-700 border border-slate-600 text-white' : 'bg-slate-50 border border-slate-300 text-gray-900'}`} />
                <div className="flex gap-2">
                  <button onClick={() => setShowAdvancedFilters(!showAdvancedFilters)} className={`flex-1 px-3 py-2 rounded text-sm font-medium ${isDarkMode ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'}`}>Filters</button>
                  <button onClick={() => { setCategorySearch(''); setSearchFilters({ type: 'name', status: 'all' }); }} className={`flex-1 px-3 py-2 rounded text-sm font-medium ${isDarkMode ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'}`}>Reset</button>
                </div>
                {showAdvancedFilters && (
                  <div className={`space-y-3 p-3 rounded border text-sm ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-300'}`}>
                    <select value={searchFilters.type} onChange={(e) => setSearchFilters({...searchFilters, type: e.target.value})} className={`w-full px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-slate-800 border border-slate-600 text-white' : 'bg-white border border-slate-300 text-gray-900'}`}>
                      <option value="name">Name</option>
                      <option value="id">ID</option>
                      <option value="tags">Tags</option>
                    </select>
                    <select value={searchFilters.status} onChange={(e) => setSearchFilters({...searchFilters, status: e.target.value})} className={`w-full px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-slate-800 border border-slate-600 text-white' : 'bg-white border border-slate-300 text-gray-900'}`}>
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="archived">Archived</option>
                    </select>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={`w-full px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-slate-800 border border-slate-600 text-white' : 'bg-white border border-slate-300 text-gray-900'}`}>
                      <option value="name">Sort: Name</option>
                      <option value="date">Sort: Date</option>
                      <option value="priority">Sort: Priority</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className={`border rounded-xl p-6 ${isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-300'}`}>
              <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}><MdFolder size={18} /> Categories {filteredIds && `(${searchResults.length})`}</h3>
              <div className="max-h-96 overflow-y-auto">
                {data.categories.length === 0 ? (
                  <div className={`text-center py-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}><MdFolder size={32} className="mx-auto mb-2 opacity-50" /><p>No categories</p></div>
                ) : (
                  <CategoryTreeView />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showFieldEditor && fieldEditorCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className={`border rounded-xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto ${isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-300'}`}>
            <div className={`p-6 border-b sticky top-0 flex justify-between items-center ${isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-300'}`}>
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Fields for: {fieldEditorCategory?.name}</h3>
              <button onClick={() => { setShowFieldEditor(null); setFieldEditorCategory(null); }} className={`${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-gray-900'}`}><MdClose size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className={`p-4 rounded border ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-300'}`}>
                <h4 className={`font-bold mb-3 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Add Field</h4>
                <div className="space-y-2 text-sm">
                  <input type="text" value={newField.name} onChange={(e) => setNewField({...newField, name: e.target.value})} placeholder="Field name" className={`w-full px-2 py-1 rounded ${isDarkMode ? 'bg-slate-800 border border-slate-600 text-white' : 'bg-white border border-slate-300 text-gray-900'}`} />
                  <select value={newField.type} onChange={(e) => setNewField({...newField, type: e.target.value})} className={`w-full px-2 py-1 rounded ${isDarkMode ? 'bg-slate-800 border border-slate-600 text-white' : 'bg-white border border-slate-300 text-gray-900'}`}>
                    {fieldTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                  {(newField.type === 'dropdown' || newField.type === 'radio') && <input type="text" value={newField.options.join(', ')} onChange={(e) => setNewField({...newField, options: e.target.value.split(',')})} placeholder="Options (comma separated)" className={`w-full px-2 py-1 rounded ${isDarkMode ? 'bg-slate-800 border border-slate-600 text-white' : 'bg-white border border-slate-300 text-gray-900'}`} />}
                  <label className={`flex gap-2 cursor-pointer ${isDarkMode ? 'text-white' : 'text-gray-900'}`}><input type="checkbox" checked={newField.required} onChange={(e) => setNewField({...newField, required: e.target.checked})} /> Required</label>
                  <button onClick={() => {
                    addFieldToCategory();
                    setFieldEditorCategory({...fieldEditorCategory, fields: editingCategory ? editingCategory.fields : addingCategory.fields});
                  }} className="w-full px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 font-medium">Add Field</button>
                </div>
              </div>
              <div>
                <h4 className={`font-bold mb-3 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Current Fields ({fieldEditorCategory?.fields?.length || 0})</h4>
                {fieldEditorCategory?.fields && fieldEditorCategory.fields.length > 0 ? (
                  <div className="space-y-2">
                    {fieldEditorCategory.fields.map(f => (
                      <div key={f.id} className={`p-3 rounded flex justify-between items-start gap-2 ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-100 text-gray-900'}`}>
                        <div>
                          <div className="font-medium text-sm">{f.name}</div>
                          <div className="text-xs flex gap-2 mt-1">
                            <span className={`px-2 py-1 rounded ${isDarkMode ? 'bg-slate-600' : 'bg-slate-200'}`}>{fieldTypes.find(t => t.value === f.type)?.label}</span>
                            {f.required && <span className={`px-2 py-1 rounded ${isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700'}`}>Required</span>}
                          </div>
                          {f.options && f.options.length > 0 && (
                            <div className={`text-xs mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                              Options: {f.options.join(', ')}
                            </div>
                          )}
                        </div>
                        <button onClick={() => {
                          if (editingCategory) {
                            setEditingCategory({...editingCategory, fields: editingCategory.fields.filter(field => field.id !== f.id)});
                            setFieldEditorCategory({...fieldEditorCategory, fields: editingCategory.fields.filter(field => field.id !== f.id)});
                          } else {
                            setAddingCategory({...addingCategory, fields: addingCategory.fields.filter(field => field.id !== f.id)});
                            setFieldEditorCategory({...fieldEditorCategory, fields: addingCategory.fields.filter(field => field.id !== f.id)});
                          }
                        }} className={`flex-shrink-0 ${isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'}`}><MdDelete size={18} /></button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`text-center py-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    <p className="text-sm">No fields added yet</p>
                  </div>
                )}
              </div>
              <button onClick={() => { setShowFieldEditor(null); setFieldEditorCategory(null); }} className={`w-full px-4 py-2 rounded font-medium ${isDarkMode ? 'bg-slate-600 hover:bg-slate-500 text-white' : 'bg-slate-300 hover:bg-slate-400 text-gray-900'}`}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;