import React, { useState, useEffect } from 'react';
import { MdAdd, MdEdit, MdDelete, MdClose, MdSave, MdSearch, MdExpandMore, MdChevronRight, MdCheckCircle, MdFileUpload, MdComment, MdPerson, MdCategory, MdAssignment, MdSchedule } from 'react-icons/md';

// Build category hierarchy for dropdowns
const buildCategoryHierarchy = (categories) => {
  const hierarchy = [];
  const mainCategories = categories.filter(c => !c.parentId);
  
  mainCategories.forEach(main => {
    hierarchy.push({
      id: main.id,
      name: main.name,
      categoryId: main.categoryId,
      level: 0,
      displayName: main.name
    });
    
    const subCategories = categories.filter(c => c.parentId === main.id);
    subCategories.forEach(sub => {
      hierarchy.push({
        id: sub.id,
        name: sub.name,
        categoryId: sub.categoryId,
        level: 1,
        displayName: `  → ${sub.name}`,
        parentId: main.id
      });
      
      const subSubCategories = categories.filter(c => c.parentId === sub.id);
      subSubCategories.forEach(subsub => {
        hierarchy.push({
          id: subsub.id,
          name: subsub.name,
          categoryId: subsub.categoryId,
          level: 2,
          displayName: `      → ${subsub.name}`,
          parentId: sub.id
        });
      });
    });
  });
  
  return hierarchy;
};

// Get checklists based on main category
const getChecklistForCategory = (categoryId, allCategories) => {
  const category = allCategories.find(c => c.id === categoryId);
  if (!category) return [];
  
  // Get main category
  let mainCat = category;
  while (mainCat.parentId) {
    mainCat = allCategories.find(c => c.id === mainCat.parentId);
  }
  
  // Create checklist based on category
  const checklist = [
    { id: 'check1', name: 'Assessment & Planning', required: true },
    { id: 'check2', name: 'Client Meeting', required: true },
    { id: 'check3', name: 'Proposal Creation', required: true },
    { id: 'check4', name: 'Budget Approval', required: true },
    { id: 'check5', name: 'Material Selection', required: true },
    { id: 'check6', name: 'Implementation', required: true },
    { id: 'check7', name: 'Quality Check', required: true },
    { id: 'check8', name: 'Client Approval', required: true }
  ];
  
  return checklist;
};

// ========== USER MANAGEMENT ==========
const UserManagement = ({ categories = [], onUsersChange }) => {
  const [users, setUsers] = useState([]);
  const [formFields, setFormFields] = useState([
    { id: 'name', label: 'Name', type: 'text', required: true },
    { id: 'email', label: 'Email', type: 'email', required: true },
    { id: 'contact', label: 'Contact', type: 'text', required: true },
    { id: 'role', label: 'Role', type: 'select', options: ['Admin', 'Manager', 'Team Lead', 'User'], required: true },
    { id: 'serviceCategory', label: 'Service Category', type: 'select', options: [], required: true }
  ]);
  const [editingUser, setEditingUser] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showFieldBuilder, setShowFieldBuilder] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState('text');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({});

  // Update service category options from categories
  useEffect(() => {
    const mainCategories = categories.filter(c => !c.parentId).map(c => c.name);
    setFormFields(prev => prev.map(f => 
      f.id === 'serviceCategory' 
        ? { ...f, options: mainCategories }
        : f
    ));
  }, [categories]);

  // Share users with parent
  useEffect(() => {
    if (onUsersChange) {
      onUsersChange(users);
    }
  }, [users, onUsersChange]);

  const addCustomField = () => {
    if (!newFieldName.trim()) {
      alert('Please enter a field name');
      return;
    }
    const newField = {
      id: 'field_' + Date.now(),
      label: newFieldName,
      type: newFieldType,
      required: false
    };
    setFormFields([...formFields, newField]);
    setNewFieldName('');
    setNewFieldType('text');
    alert('Field added successfully!');
  };

  const removeField = (fieldId) => {
    if (['name', 'email', 'contact', 'role', 'serviceCategory'].includes(fieldId)) {
      alert('Cannot remove default fields');
      return;
    }
    setFormFields(formFields.filter(f => f.id !== fieldId));
  };

  const handleSaveUser = () => {
    if (!formData.name || !formData.email || !formData.contact) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...editingUser, ...formData } : u));
      setEditingUser(null);
    } else {
      const newUser = { id: 'user_' + Date.now(), ...formData };
      setUsers([...users, newUser]);
    }
    setFormData({});
    setShowUserForm(false);
    alert(editingUser ? 'User updated!' : 'User created!');
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData(user);
    setShowUserForm(true);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const filteredUsers = users.filter(u => 
    Object.values(u).some(v => v && v.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">User Management</h2>
        <p className="text-slate-600">Create and manage users with dynamic form fields</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="lg:col-span-1 space-y-6">
          <button
            onClick={() => {
              setEditingUser(null);
              setFormData({});
              setShowUserForm(!showUserForm);
            }}
            className="w-full flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            <MdAdd size={18} /> {showUserForm ? 'Cancel' : 'Add New User'}
          </button>

          {showUserForm && (
            <div className="bg-white p-6 rounded-lg border border-slate-300 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MdPerson size={18} /> {editingUser ? 'Edit User' : 'Create User'}
              </h3>
              <div className="space-y-4">
                {formFields.map(field => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === 'select' ? (
                      <select
                        value={formData[field.id] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((opt, idx) => (
                          <option key={idx} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.id] || ''}
                        onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                        placeholder={`Enter ${field.label}`}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>
                ))}
                <button
                  onClick={handleSaveUser}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  <MdSave size={16} /> {editingUser ? 'Update' : 'Create'} User
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowFieldBuilder(!showFieldBuilder)}
            className="w-full flex items-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
          >
            <MdAdd size={18} /> {showFieldBuilder ? 'Hide' : 'Add Custom Field'}
          </button>

          {showFieldBuilder && (
            <div className="bg-white p-6 rounded-lg border border-slate-300 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Form Builder</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Field Name</label>
                  <input
                    type="text"
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    placeholder="e.g., Blood Group"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Field Type</label>
                  <select
                    value={newFieldType}
                    onChange={(e) => setNewFieldType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    <option value="textarea">Text Area</option>
                  </select>
                </div>
                <button
                  onClick={addCustomField}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                >
                  Add Field
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-300">
                <h4 className="font-medium text-slate-900 mb-2">Current Fields:</h4>
                <div className="space-y-2">
                  {formFields.map(field => (
                    <div key={field.id} className="flex items-center justify-between text-sm bg-slate-100 p-2 rounded">
                      <span className="text-slate-700">{field.label} ({field.type})</span>
                      {!['name', 'email', 'contact', 'role', 'serviceCategory'].includes(field.id) && (
                        <button
                          onClick={() => removeField(field.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <MdDelete size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-slate-300 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <MdSearch size={18} /> Users ({users.length})
          </h3>
          
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-slate-600">
              <MdPerson size={32} className="mx-auto mb-2 opacity-50" />
              <p>No users created yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredUsers.map(user => (
                <div key={user.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-300 transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-slate-900">{user.name || 'N/A'}</h4>
                      <p className="text-sm text-slate-600">{user.email || 'N/A'}</p>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {user.role && <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">{user.role}</span>}
                        {user.serviceCategory && <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">{user.serviceCategory}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                      >
                        <MdEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded"
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ========== TASK MANAGEMENT ==========
const TaskManagement = ({ categories = [], users = [] }) => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskData, setTaskData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [expandedTasks, setExpandedTasks] = useState({});

  const handleCreateTask = () => {
    if (!selectedTask || !taskData.assignedTo) {
      alert('Please select task and assign user');
      return;
    }

    const selectedCategoryObj = categories.find(c => c.id === selectedTask);
    const checklistItems = getChecklistForCategory(selectedTask, categories);

    const newTask = {
      id: 'task_' + Date.now(),
      title: selectedCategoryObj?.name || selectedTask,
      categoryId: selectedCategory,
      taskCategoryId: selectedTask,
      assignedTo: taskData.assignedTo,
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || '',
      checklist: checklistItems.map(item => ({
        ...item,
        completed: false,
        comments: [],
        attachments: []
      })),
      status: 'pending',
      createdAt: new Date().toISOString(),
      isCheckingTask: false
    };

    const checkingTask = {
      id: 'task_' + (Date.now() + 1),
      title: (selectedCategoryObj?.name || selectedTask) + ' - Checking',
      categoryId: selectedCategory,
      taskCategoryId: selectedTask,
      assignedTo: taskData.checkingAssignedTo || taskData.assignedTo,
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || '',
      checklist: [],
      status: 'pending',
      isCheckingTask: true,
      linkedTaskId: newTask.id,
      createdAt: new Date().toISOString()
    };

    setTasks([...tasks, newTask, checkingTask]);
    resetTaskForm();
    alert('Task created with auto-generated checking task!');
  };

  const resetTaskForm = () => {
    setTaskData({});
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSelectedTask('');
    setShowTaskForm(false);
  };

  const toggleTaskExpand = (id) => {
    setExpandedTasks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChecklistToggle = (taskId, checklistId) => {
    setTasks(tasks.map(t => 
      t.id === taskId 
        ? { ...t, checklist: t.checklist.map(c => c.id === checklistId ? { ...c, completed: !c.completed } : c) }
        : t
    ));
  };

  const getSubcategoriesForMain = () => {
    if (!selectedCategory) return [];
    return categories.filter(c => c.parentId === selectedCategory);
  };

  const getTasksForSubcategory = () => {
    if (!selectedSubcategory) return [];
    return categories.filter(c => c.parentId === selectedSubcategory);
  };

  const eligibleUsers = users.filter(u => {
    const mainCat = categories.find(c => c.id === selectedCategory);
    return !mainCat || u.serviceCategory === mainCat.name;
  });

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Task Management</h2>
        <p className="text-slate-600">Create and assign tasks with automatic checking workflow</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="lg:col-span-1">
          <button
            onClick={() => setShowTaskForm(!showTaskForm)}
            className="w-full flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium mb-6"
          >
            <MdAdd size={18} /> {showTaskForm ? 'Cancel' : 'Create Task'}
          </button>

          {showTaskForm && (
            <div className="bg-white p-6 rounded-lg border border-slate-300 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MdAssignment size={18} /> New Task
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Service Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubcategory('');
                    setSelectedTask('');
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.filter(c => !c.parentId).map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {selectedCategory && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Sub Category</label>
                  <select
                    value={selectedSubcategory}
                    onChange={(e) => {
                      setSelectedSubcategory(e.target.value);
                      setSelectedTask('');
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Sub Category</option>
                    {getSubcategoriesForMain().map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {selectedSubcategory && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Task</label>
                  <select
                    value={selectedTask}
                    onChange={(e) => setSelectedTask(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Task</option>
                    {getTasksForSubcategory().map(task => (
                      <option key={task.id} value={task.id}>{task.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Assign To User</label>
                <select
                  value={taskData.assignedTo || ''}
                  onChange={(e) => setTaskData({ ...taskData, assignedTo: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select User</option>
                  {eligibleUsers.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Assign Checking To</label>
                <select
                  value={taskData.checkingAssignedTo || ''}
                  onChange={(e) => setTaskData({ ...taskData, checkingAssignedTo: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Same as above</option>
                  {eligibleUsers.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                <select
                  value={taskData.priority || 'medium'}
                  onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={taskData.dueDate || ''}
                  onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <button
                onClick={handleCreateTask}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                Create Task
              </button>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-slate-300 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <MdCategory size={18} /> Tasks ({tasks.length})
          </h3>

          {tasks.length === 0 ? (
            <div className="text-center py-8 text-slate-600">
              <MdAssignment size={32} className="mx-auto mb-2 opacity-50" />
              <p>No tasks created yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map(task => (
                <div key={task.id} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleTaskExpand(task.id)}
                    className="w-full p-4 bg-slate-50 hover:bg-slate-100 transition flex items-center justify-between text-left"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900">{task.title}</h4>
                        {task.isCheckingTask && <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">Checking</span>}
                        <span className={`text-xs px-2 py-1 rounded ${
                          task.priority === 'high' ? 'bg-red-100 text-red-700' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>{task.priority}</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        Assigned to: {users.find(u => u.id === task.assignedTo)?.name || 'Unassigned'}
                      </p>
                    </div>
                    {expandedTasks[task.id] ? <MdExpandMore size={20} /> : <MdChevronRight size={20} />}
                  </button>

                  {expandedTasks[task.id] && (
                    <div className="p-4 border-t border-slate-200 bg-white">
                      {task.dueDate && (
                        <div className="flex items-center gap-2 mb-3 text-sm text-slate-600">
                          <MdSchedule size={16} /> Due: {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      )}

                      {task.checklist.length > 0 && (
                        <div className="mb-4">
                          <h5 className="font-medium text-slate-900 mb-2">Checklist:</h5>
                          <div className="space-y-2">
                            {task.checklist.map(item => (
                              <label key={item.id} className="flex items-start gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={item.completed}
                                  onChange={() => handleChecklistToggle(task.id, item.id)}
                                  className="mt-1"
                                />
                                <span className={`text-sm ${item.completed ? 'line-through text-slate-500' : 'text-slate-700'}`}>
                                  {item.name} {item.required && <span className="text-red-500">*</span>}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2 pt-3 border-t border-slate-200">
                        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                          <MdFileUpload size={14} /> Upload
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-purple-50 text-purple-600 rounded hover:bg-purple-100">
                          <MdComment size={14} /> Comment
                        </button>
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

export { UserManagement, TaskManagement };