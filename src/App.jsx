import React, { useState } from 'react';
import { MdAdd, MdExpandMore, MdChevronRight, MdEdit, MdSave, MdClose, MdDelete, MdContentCopy, MdSearch, MdDescription, MdCalendarToday, MdAccessTime, MdLabel, MdArrowBack, MdArrowForward, MdVisibility, MdFolder } from 'react-icons/md';

const HierarchicalStageManager = () => {
  const [data, setData] = useState({ stages: [], categories: [] });
  const [newStage, setNewStage] = useState({
    title: '', jobPosting: '', guidelinesFile: '', worksheetFile: '',
    taskChecklistFile: '', worksheetFormat: '', supportiveDoc: '', selectedCategories: []
  });
  const [showStageForm, setShowStageForm] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [expandedStages, setExpandedStages] = useState({});
  const [addingCategory, setAddingCategory] = useState({
    name: '', parentId: null, description: '', fields: [], fieldData: {},
    tags: [], priority: 'medium', status: 'active'
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [categorySearch, setCategorySearch] = useState('');
  const [showCategoryLogs, setShowCategoryLogs] = useState(false);
  const [showFieldEditor, setShowFieldEditor] = useState(null);
  const [viewFieldData, setViewFieldData] = useState(null);
  const [newField, setNewField] = useState({ name: '', type: 'text', required: false, options: [] });

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

  const regenerateCategoryIds = (categories) => {
    const updated = JSON.parse(JSON.stringify(categories));
    const updateIds = (parentId = null, prefix = '') => {
      const children = updated.filter(c => c.parentId === parentId).sort((a, b) => a.id.localeCompare(b.id));
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

  const moveCategoryLevel = (categoryId, direction) => {
    const category = data.categories.find(c => c.id === categoryId);
    if (!category) return;

    let newParentId = category.parentId;
    if (direction === "right") {
      const siblings = data.categories.filter(c => c.parentId === category.parentId).sort((a, b) => a.id.localeCompare(b.id));
      const currentIndex = siblings.findIndex(c => c.id === categoryId);
      if (currentIndex <= 0) {
        alert("Cannot move right: No previous sibling");
        return;
      }
      newParentId = siblings[currentIndex - 1].id;
    } else if (direction === "left") {
      if (!category.parentId) {
        alert("Already at root level");
        return;
      }
      const parent = data.categories.find(c => c.id === category.parentId);
      newParentId = parent ? parent.parentId || null : null;
    }

    if (newParentId) {
      let checkId = newParentId;
      while (checkId) {
        if (checkId === categoryId) {
          alert("Circular hierarchy detected");
          return;
        }
        const checkCat = data.categories.find(c => c.id === checkId);
        checkId = checkCat ? checkCat.parentId : null;
      }
    }

    const now = new Date().toISOString();
    let updated = data.categories.map(cat =>
      cat.id === categoryId
        ? {
            ...cat, parentId: newParentId, modifiedAt: now,
            logs: [...(cat.logs || []), {
              action: "Hierarchy Changed", timestamp: now,
              details: direction === "right" ? "Moved right (indented)" : "Moved left (outdented)"
            }]
          }
        : cat
    );
    updated = regenerateCategoryIds(updated);
    setData(prev => ({ ...prev, categories: updated }));
    alert(`Moved ${direction === "right" ? "right" : "left"}`);
  };

  const addCategory = () => {
    if (!addingCategory.name.trim()) {
      alert('Enter category name');
      return;
    }
    const categoryId = generateId(addingCategory.parentId);
    const now = new Date().toISOString();
    const newCategory = {
      id: 'id_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9),
      categoryId, name: addingCategory.name.trim(), description: addingCategory.description.trim(),
      parentId: addingCategory.parentId, fields: [...addingCategory.fields],
      fieldData: {...addingCategory.fieldData}, tags: addingCategory.tags,
      priority: addingCategory.priority, status: addingCategory.status,
      createdAt: now, modifiedAt: now, createdBy: 'User',
      logs: [{ action: 'Created', timestamp: now, details: `Category "${addingCategory.name}" created` }]
    };
    let updated = [...data.categories, newCategory];
    updated = regenerateCategoryIds(updated);
    setData(prev => ({ ...prev, categories: updated }));
    setAddingCategory({ name: '', parentId: null, description: '', fields: [], fieldData: {}, tags: [], priority: 'medium', status: 'active' });
    alert('Category added!');
  };

  const updateCategory = () => {
    if (!editingCategory || !editingCategory.name.trim()) {
      alert('Enter category name');
      return;
    }
    const now = new Date().toISOString();
    let updated = data.categories.map(cat =>
      cat.id === editingCategory.id
        ? {
            ...cat, name: editingCategory.name.trim(), description: editingCategory.description.trim(),
            parentId: editingCategory.parentId, fields: [...editingCategory.fields],
            fieldData: {...editingCategory.fieldData}, tags: editingCategory.tags,
            priority: editingCategory.priority, status: editingCategory.status, modifiedAt: now,
            logs: [...cat.logs, { action: 'Modified', timestamp: now, details: 'Updated category details' }]
          }
        : cat
    );
    updated = regenerateCategoryIds(updated);
    setData(prev => ({ ...prev, categories: updated }));
    setEditingCategory(null);
    alert('Updated!');
  };

  const duplicateCategory = (categoryId) => {
    const category = data.categories.find(c => c.id === categoryId);
    if (!category) return;
    const now = new Date().toISOString();
    const duplicated = {
      id: 'id_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9),
      categoryId: generateId(category.parentId), name: category.name + ' (Copy)',
      description: category.description, parentId: category.parentId,
      fields: [...category.fields], fieldData: {...category.fieldData},
      tags: [...category.tags], priority: category.priority, status: category.status,
      createdAt: now, modifiedAt: now, createdBy: 'User',
      logs: [{ action: 'Duplicated', timestamp: now, details: `From "${category.name}"` }]
    };
    let updated = [...data.categories, duplicated];
    updated = regenerateCategoryIds(updated);
    setData(prev => ({ ...prev, categories: updated }));
    alert('Duplicated!');
  };

  const deleteCategory = (id) => {
    if (data.categories.some(cat => cat.parentId === id)) {
      alert('Delete children first');
      return;
    }
    if (window.confirm('Delete permanently?')) {
      let updated = data.categories.filter(cat => cat.id !== id);
      updated = regenerateCategoryIds(updated);
      setData(prev => ({ ...prev, categories: updated }));
      if (editingCategory?.id === id) setEditingCategory(null);
      alert('Deleted!');
    }
  };

  const addFieldToCategory = (categoryId) => {
    if (!newField.name.trim()) {
      alert('Enter field name');
      return;
    }
    const field = {
      id: 'field_' + Date.now().toString(36),
      name: newField.name.trim(), type: newField.type, required: newField.required,
      options: (newField.type === 'dropdown' || newField.type === 'radio') ? newField.options.filter(o => o.trim()) : []
    };
    if (editingCategory?.id === categoryId) {
      setEditingCategory(prev => ({ ...prev, fields: [...prev.fields, field] }));
    } else if (addingCategory.parentId !== null || addingCategory.name) {
      setAddingCategory(prev => ({ ...prev, fields: [...prev.fields, field] }));
    }
    setNewField({ name: '', type: 'text', required: false, options: [] });
    alert('Field added!');
  };

  const removeFieldFromCategory = (categoryId, fieldId) => {
    if (editingCategory?.id === categoryId) {
      setEditingCategory(prev => ({ ...prev, fields: prev.fields.filter(f => f.id !== fieldId) }));
    } else if (addingCategory.fields.length > 0) {
      setAddingCategory(prev => ({ ...prev, fields: prev.fields.filter(f => f.id !== fieldId) }));
    }
  };

  const renderFieldInput = (field, value, onChange) => {
    const cls = "w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-sm";
    switch (field.type) {
      case 'textarea': return <textarea value={value || ''} onChange={(e) => onChange(field.id, e.target.value)} className={cls} rows="3" />;
      case 'number': return <input type="number" value={value || ''} onChange={(e) => onChange(field.id, e.target.value)} className={cls} />;
      case 'email': return <input type="email" value={value || ''} onChange={(e) => onChange(field.id, e.target.value)} className={cls} />;
      case 'phone': return <input type="tel" value={value || ''} onChange={(e) => onChange(field.id, e.target.value)} className={cls} />;
      case 'url': return <input type="url" value={value || ''} onChange={(e) => onChange(field.id, e.target.value)} className={cls} placeholder="https://..." />;
      case 'date': return <input type="date" value={value || ''} onChange={(e) => onChange(field.id, e.target.value)} className={cls} />;
      case 'dropdown': return <select value={value || ''} onChange={(e) => onChange(field.id, e.target.value)} className={cls}><option>Select</option>{field.options.map((o, i) => <option key={i}>{o}</option>)}</select>;
      case 'checkbox': return <input type="checkbox" checked={value || false} onChange={(e) => onChange(field.id, e.target.checked)} />;
      case 'radio': return <div className="space-y-2">{field.options.map((o, i) => <label key={i}><input type="radio" name={field.id} value={o} checked={value === o} onChange={(e) => onChange(field.id, e.target.value)} /> {o}</label>)}</div>;
      case 'file': return <input type="text" value={value || ''} onChange={(e) => onChange(field.id, e.target.value)} className={cls} placeholder="File URL" />;
      default: return <input type="text" value={value || ''} onChange={(e) => onChange(field.id, e.target.value)} className={cls} />;
    }
  };

  const getChildrenByParentId = (parentId) => data.categories.filter(cat => cat.parentId === parentId);
  const getRootCategories = () => data.categories.filter(cat => cat.parentId === null);
  const getCategoryById = (id) => data.categories.find(cat => cat.id === id);
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
    setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getAllCategoriesFlat = () => {
    return data.categories.map(cat => ({
      ...cat,
      fullPath: getParentChain(cat.id).map(c => c.name).join(' > ')
    }));
  };

  const handleFieldDataChange = (fieldId, value, isEditing = false) => {
    if (isEditing) {
      setEditingCategory(prev => ({ ...prev, fieldData: { ...prev.fieldData, [fieldId]: value } }));
    } else {
      setAddingCategory(prev => ({ ...prev, fieldData: { ...prev.fieldData, [fieldId]: value } }));
    }
  };

  const CategoryTreeView = ({ parentId = null, level = 0 }) => {
    const categories = getChildrenByParentId(parentId);
    if (categories.length === 0) return null;

    return (
      <div className={level > 0 ? 'ml-6 border-l-2 border-gray-300 pl-4 mt-2' : ''}>
        {categories.map(category => {
          const children = getChildrenByParentId(category.id);
          const hasChildren = children.length > 0;

          return (
            <div key={category.id} className="mb-2">
              <div className="bg-white p-3 rounded-lg border-2 border-gray-200 hover:border-blue-400">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    {hasChildren && (
                      <button onClick={() => toggleCategoryExpand(category.id)} className="text-gray-600 hover:text-blue-600">
                        {expandedCategories[category.id] ? <MdExpandMore size={18} /> : <MdChevronRight size={18} />}
                      </button>
                    )}
                    {!hasChildren && <div className="w-[18px]"></div>}
                    <MdFolder size={16} className="text-blue-600" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">{category.name}</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{category.categoryId}</span>
                        <span className={`text-xs px-2 py-1 rounded ${category.priority === 'high' ? 'bg-red-100 text-red-700' : category.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{category.priority}</span>
                      </div>
                      {category.description && <div className="text-xs text-gray-500 mt-1">{category.description}</div>}
                    </div>
                    <div className="flex items-center gap-1 flex-wrap">
                      <button onClick={() => moveCategoryLevel(category.id, 'left')} className="text-orange-600 px-2 py-1 bg-orange-50 rounded text-sm" disabled={!category.parentId}><MdArrowBack size={14} /></button>
                      <button onClick={() => moveCategoryLevel(category.id, 'right')} className="text-orange-600 px-2 py-1 bg-orange-50 rounded text-sm"><MdArrowForward size={14} /></button>
                      <button onClick={() => setShowFieldEditor(category.id)} className="text-purple-600 px-2 py-1 bg-purple-50 rounded text-sm"><MdDescription size={14} /></button>
                      <button onClick={() => setEditingCategory({...category})} className="text-blue-600 px-2 py-1 bg-blue-50 rounded text-sm"><MdEdit size={14} /></button>
                      <button onClick={() => duplicateCategory(category.id)} className="text-teal-600 px-2 py-1 bg-teal-50 rounded text-sm"><MdContentCopy size={14} /></button>
                      <button onClick={() => setAddingCategory({name: '', parentId: category.id, description: '', fields: [], fieldData: {}, tags: [], priority: 'medium', status: 'active'})} className="text-green-600 px-2 py-1 bg-green-50 rounded text-sm"><MdAdd size={14} /></button>
                      <button onClick={() => deleteCategory(category.id)} className="text-red-600 px-2 py-1 bg-red-50 rounded text-sm"><MdDelete size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
              {hasChildren && expandedCategories[category.id] && <CategoryTreeView parentId={category.id} level={level + 1} />}
            </div>
          );
        })}
      </div>
    );
  };

  const addStage = () => {
    if (!newStage.title) {
      alert('Enter stage title');
      return;
    }
    const stage = { id: 'stage_' + Date.now().toString(36), ...newStage, createdAt: new Date().toISOString() };
    setData(prev => ({ ...prev, stages: [...prev.stages, stage] }));
    setNewStage({ title: '', jobPosting: '', guidelinesFile: '', worksheetFile: '', taskChecklistFile: '', worksheetFormat: '', supportiveDoc: '', selectedCategories: [] });
    setShowStageForm(false);
  };

  const toggleStageExpand = (id) => {
    setExpandedStages(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const exportData = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'stage-data-' + Date.now() + '.json';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Advanced Category & Stage Manager</h1>
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => setShowCategoryLogs(!showCategoryLogs)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"><MdDescription size={18} /> Logs</button>
              <button onClick={() => setShowCategoryManager(!showCategoryManager)} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"><MdEdit size={18} /> Categories</button>
              <button onClick={() => setShowStageForm(!showStageForm)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"><MdAdd size={20} /> Stage</button>
              <button onClick={exportData} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Export</button>
            </div>
          </div>

          {showCategoryLogs && (
            <div className="mb-6 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border-2 border-indigo-200">
              <h2 className="text-xl font-semibold mb-4 text-indigo-800 flex items-center gap-2"><MdDescription size={24} /> Category Activity Logs</h2>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {data.categories.flatMap(cat => (cat.logs || []).map((log, idx) => (
                  <div key={`${cat.id}-${idx}`} className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
                    <div className="flex justify-between"><div><div className="flex gap-2 mb-2"><span className="font-semibold">{cat.name}</span><span className="text-xs bg-indigo-100 text-indigo-700 px-2 rounded">{cat.categoryId}</span><span className={`text-xs px-2 py-1 rounded ${log.action === 'Created' ? 'bg-green-100 text-green-700' : log.action === 'Modified' ? 'bg-blue-100 text-blue-700' : log.action === 'Duplicated' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'}`}>{log.action}</span></div><p className="text-sm text-gray-600">{log.details}</p></div><span className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</span></div>
                  </div>
                ))).reverse()}
                {data.categories.length === 0 && <p className="text-center text-gray-500 py-8">No logs yet</p>}
              </div>
            </div>
          )}

          {showCategoryManager && (
            <div className="mb-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
              <h2 className="text-xl font-semibold mb-4 text-purple-800"><MdLabel size={24} /> Advanced Category Management</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-lg border-2 border-purple-300">
                  <h3 className="font-semibold mb-4 text-lg flex gap-2">{editingCategory ? <MdEdit className="text-blue-600" /> : <MdAdd className="text-purple-600" />} {editingCategory ? 'Edit' : 'Add New'} Category</h3>
                  <div className="space-y-4 max-h-[800px] overflow-y-auto">
                    <div><label className="block text-sm font-medium mb-2">Parent</label><select value={editingCategory ? editingCategory.parentId || '' : addingCategory.parentId || ''} onChange={(e) => { const id = e.target.value || null; if (editingCategory) setEditingCategory({...editingCategory, parentId: id}); else setAddingCategory({...addingCategory, parentId: id}); }} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm"><option value="">Root</option>{getAllCategoriesFlat().filter(c => !editingCategory || c.id !== editingCategory.id).map(c => <option key={c.id} value={c.id}>{c.categoryId} - {c.fullPath}</option>)}</select></div>
                    <div><label className="block text-sm font-medium mb-2">Name *</label><input type="text" value={editingCategory ? editingCategory.name : addingCategory.name} onChange={(e) => editingCategory ? setEditingCategory({...editingCategory, name: e.target.value}) : setAddingCategory({...addingCategory, name: e.target.value})} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm" /></div>
                    <div><label className="block text-sm font-medium mb-2">Description</label><textarea value={editingCategory ? editingCategory.description : addingCategory.description} onChange={(e) => editingCategory ? setEditingCategory({...editingCategory, description: e.target.value}) : setAddingCategory({...addingCategory, description: e.target.value})} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm" rows="2" /></div>
                    <div><label className="block text-sm font-medium mb-2">Priority</label><select value={editingCategory ? editingCategory.priority : addingCategory.priority} onChange={(e) => editingCategory ? setEditingCategory({...editingCategory, priority: e.target.value}) : setAddingCategory({...addingCategory, priority: e.target.value})} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm"><option>Low</option><option>Medium</option><option>High</option></select></div>
                    <div><label className="block text-sm font-medium mb-2">Status</label><select value={editingCategory ? editingCategory.status : addingCategory.status} onChange={(e) => editingCategory ? setEditingCategory({...editingCategory, status: e.target.value}) : setAddingCategory({...addingCategory, status: e.target.value})} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm"><option value="active">Active</option><option value="inactive">Inactive</option><option value="archived">Archived</option></select></div>
                    <div><label className="block text-sm font-medium mb-2">Tags</label><input type="text" value={editingCategory ? editingCategory.tags.join(', ') : addingCategory.tags.join(', ')} onChange={(e) => { const tags = e.target.value.split(',').map(t => t.trim()).filter(t => t); editingCategory ? setEditingCategory({...editingCategory, tags}) : setAddingCategory({...addingCategory, tags}); }} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm" placeholder="tag1, tag2" /></div>
                    <div className="flex gap-2 pt-4 border-t">{editingCategory ? <><button onClick={updateCategory} className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 text-sm"><MdSave /> Update</button><button onClick={() => setEditingCategory(null)} className="px-3 py-2 bg-gray-400 text-white rounded-lg"><MdClose /></button></> : <><button onClick={addCategory} className="flex-1 px-3 py-2 bg-purple-600 text-white rounded-lg flex items-center justify-center gap-2 text-sm"><MdAdd /> Add</button><button onClick={() => setAddingCategory({ name: '', parentId: null, description: '', fields: [], fieldData: {}, tags: [], priority: 'medium', status: 'active' })} className="px-3 py-2 bg-gray-400 text-white rounded-lg"><MdClose /></button></>}</div>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-white p-4 rounded-lg border-2 border-purple-300"><label className="block text-sm font-medium mb-2">Search</label><div className="relative"><MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /><input type="text" value={categorySearch} onChange={(e) => setCategorySearch(e.target.value)} placeholder="Search..." className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg text-sm" /></div></div>
                  <div className="bg-white p-4 rounded-lg border-2 border-purple-300"><h3 className="font-semibold mb-3 text-lg flex gap-2"><MdFolder className="text-purple-600" /> Hierarchy</h3><div className="max-h-[700px] overflow-y-auto">{data.categories.length === 0 ? <div className="text-center py-12 text-gray-500"><MdFolder size={40} className="mx-auto mb-3 text-gray-300" /><p className="text-sm">No categories</p></div> : <CategoryTreeView />}</div></div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="bg-white p-4 rounded-lg border-2 border-purple-200 text-center"><div className="text-2xl font-bold text-purple-600">{data.categories.length}</div><div className="text-xs text-gray-600 mt-1">Total</div></div>
                <div className="bg-white p-4 rounded-lg border-2 border-purple-200 text-center"><div className="text-2xl font-bold text-blue-600">{getRootCategories().length}</div><div className="text-xs text-gray-600 mt-1">Root</div></div>
                <div className="bg-white p-4 rounded-lg border-2 border-purple-200 text-center"><div className="text-2xl font-bold text-green-600">{data.categories.filter(c => c.parentId !== null).length}</div><div className="text-xs text-gray-600 mt-1">Children</div></div>
                <div className="bg-white p-4 rounded-lg border-2 border-purple-200 text-center"><div className="text-2xl font-bold text-orange-600">{data.categories.filter(c => c.fields.length > 0).length}</div><div className="text-xs text-gray-600 mt-1">With Fields</div></div>
                <div className="bg-white p-4 rounded-lg border-2 border-purple-200 text-center"><div className="text-2xl font-bold text-red-600">{data.stages.length}</div><div className="text-xs text-gray-600 mt-1">Stages</div></div>
              </div>
            </div>
          )}

          {showFieldEditor && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b sticky top-0 bg-white flex justify-between items-center">
                  <h3 className="text-xl font-bold flex gap-2"><MdDescription className="text-purple-600" /> Manage Fields</h3>
                  <button onClick={() => {setShowFieldEditor(null); setNewField({name: '', type: 'text', required: false, options: []});}} className="text-gray-500"><MdClose size={24} /></button>
                </div>
                <div className="p-6">
                  <div className="bg-purple-50 p-4 rounded-lg border mb-6">
                    <h4 className="font-semibold mb-3">Add New Field</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-sm font-medium">Name *</label><input type="text" value={newField.name} onChange={(e) => setNewField({...newField, name: e.target.value})} className="w-full px-3 py-2 border rounded text-sm" /></div>
                        <div><label className="text-sm font-medium">Type *</label><select value={newField.type} onChange={(e) => setNewField({...newField, type: e.target.value})} className="w-full px-3 py-2 border rounded text-sm">{fieldTypes.map(t => <option key={t.value}>{t.label}</option>)}</select></div>
                      </div>
                      {(newField.type === 'dropdown' || newField.type === 'radio') && <div><label className="text-sm font-medium">Options</label><input type="text" value={newField.options.join(', ')} onChange={(e) => setNewField({...newField, options: e.target.value.split(',').map(o => o.trim())})} className="w-full px-3 py-2 border rounded text-sm" /></div>}
                      <label className="flex gap-2"><input type="checkbox" checked={newField.required} onChange={(e) => setNewField({...newField, required: e.target.checked})} /> Required</label>
                      <button onClick={() => addFieldToCategory(showFieldEditor)} className="w-full px-4 py-2 bg-purple-600 text-white rounded flex items-center justify-center gap-2 text-sm"><MdAdd /> Add</button>
                    </div>
                  </div>
                  <div><h4 className="font-semibold mb-3">Existing</h4><div className="space-y-2">{(getCategoryById(showFieldEditor)?.fields || []).map(f => <div key={f.id} className="bg-white p-3 rounded border-2 flex justify-between"><div><span className="font-medium text-sm">{f.name}</span> <span className="text-xs bg-blue-100 text-blue-700 px-2 rounded ml-2">{fieldTypes.find(t => t.value === f.type)?.label}</span></div><button onClick={() => removeFieldFromCategory(showFieldEditor, f.id)} className="text-red-600"><MdDelete size={16} /></button></div>)}</div></div>
                </div>
              </div>
            </div>
          )}

          {viewFieldData && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between"><h3 className="text-xl font-bold"><MdVisibility /> Field Data</h3><button onClick={() => setViewFieldData(null)}><MdClose size={24} /></button></div>
                <div className="p-6 space-y-4">{getCategoryById(viewFieldData)?.fields.map(f => <div key={f.id} className="bg-gray-50 p-4 rounded"><div className="flex gap-2 mb-2"><span className="font-semibold text-sm">{f.name}</span><span className="text-xs bg-blue-100 text-blue-700 px-2 rounded">{fieldTypes.find(t => t.value === f.type)?.label}</span></div><div className="text-sm">{f.type === 'checkbox' ? (getCategoryById(viewFieldData)?.fieldData?.[f.id] ? 'Yes' : 'No') : getCategoryById(viewFieldData)?.fieldData?.[f.id] || 'No data'}</div></div>)}</div>
              </div>
            </div>
          )}

          {showStageForm && (
            <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
              <h2 className="text-xl font-semibold mb-4">Add New Stage</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2"><label className="text-sm font-medium">Title *</label><input type="text" value={newStage.title} onChange={(e) => setNewStage({...newStage, title: e.target.value})} className="w-full px-4 py-2 border rounded text-sm" /></div>
                <div><label className="text-sm font-medium">Job Posting</label><input type="text" value={newStage.jobPosting} onChange={(e) => setNewStage({...newStage, jobPosting: e.target.value})} className="w-full px-4 py-2 border rounded text-sm" /></div>
                <div><label className="text-sm font-medium">Worksheet Format</label><input type="text" value={newStage.worksheetFormat} onChange={(e) => setNewStage({...newStage, worksheetFormat: e.target.value})} className="w-full px-4 py-2 border rounded text-sm" /></div>
                <div><label className="text-sm font-medium">Guidelines URL</label><input type="text" value={newStage.guidelinesFile} onChange={(e) => setNewStage({...newStage, guidelinesFile: e.target.value})} className="w-full px-4 py-2 border rounded text-sm" placeholder="https://..." /></div>
                <div><label className="text-sm font-medium">Worksheet URL</label><input type="text" value={newStage.worksheetFile} onChange={(e) => setNewStage({...newStage, worksheetFile: e.target.value})} className="w-full px-4 py-2 border rounded text-sm" placeholder="https://..." /></div>
                <div><label className="text-sm font-medium">Checklist URL</label><input type="text" value={newStage.taskChecklistFile} onChange={(e) => setNewStage({...newStage, taskChecklistFile: e.target.value})} className="w-full px-4 py-2 border rounded text-sm" placeholder="https://..." /></div>
                <div><label className="text-sm font-medium">Doc URL</label><input type="text" value={newStage.supportiveDoc} onChange={(e) => setNewStage({...newStage, supportiveDoc: e.target.value})} className="w-full px-4 py-2 border rounded text-sm" placeholder="https://..." /></div>
              </div>
              <div className="flex gap-3 mt-6"><button onClick={addStage} className="px-6 py-2 bg-blue-600 text-white rounded flex items-center gap-2 text-sm"><MdSave /> Save</button><button onClick={() => setShowStageForm(false)} className="px-6 py-2 bg-gray-400 text-white rounded text-sm">Cancel</button></div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Stages ({data.stages.length})</h2>
          {data.stages.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No stages yet</p>
          ) : (
            <div className="space-y-4">
              {data.stages.map(stage => (
                <div key={stage.id} className="border rounded-lg">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 cursor-pointer hover:from-blue-200 hover:to-purple-200" onClick={() => toggleStageExpand(stage.id)}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">{expandedStages[stage.id] ? <MdExpandMore /> : <MdChevronRight />}<h3 className="font-bold">{stage.title}</h3></div>
                      <span className="text-sm text-gray-600">{new Date(stage.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {expandedStages[stage.id] && (
                    <div className="p-6 bg-white grid grid-cols-1 md:grid-cols-2 gap-4">
                      {stage.jobPosting && <div className="p-3 bg-gray-50 rounded"><span className="font-semibold block mb-1">Job Posting:</span><p className="text-sm">{stage.jobPosting}</p></div>}
                      {stage.worksheetFormat && <div className="p-3 bg-gray-50 rounded"><span className="font-semibold block mb-1">Format:</span><p className="text-sm">{stage.worksheetFormat}</p></div>}
                      {stage.guidelinesFile && <div className="p-3 bg-gray-50 rounded"><span className="font-semibold block mb-1">Guidelines:</span><a href={stage.guidelinesFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">{stage.guidelinesFile}</a></div>}
                      {stage.worksheetFile && <div className="p-3 bg-gray-50 rounded"><span className="font-semibold block mb-1">Worksheet:</span><a href={stage.worksheetFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">{stage.worksheetFile}</a></div>}
                      {stage.taskChecklistFile && <div className="p-3 bg-gray-50 rounded"><span className="font-semibold block mb-1">Checklist:</span><a href={stage.taskChecklistFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">{stage.taskChecklistFile}</a></div>}
                      {stage.supportiveDoc && <div className="p-3 bg-gray-50 rounded"><span className="font-semibold block mb-1">Doc:</span><a href={stage.supportiveDoc} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">{stage.supportiveDoc}</a></div>}
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