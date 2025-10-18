import React, { useState, useEffect } from 'react';
import { MdMenu, MdClose, MdDashboard, MdShoppingCart, MdPeople, MdTaskAlt, MdAssignment, MdExpandMore, MdChevronRight } from 'react-icons/md';

// Sidebar Component
const AdminSidebar = ({ isOpen, onToggle, currentPage, onNavigate }) => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MdDashboard, submenu: [] },
    { id: 'categories', label: 'Product Service Categories', icon: MdShoppingCart, submenu: [] },
    { id: 'users', label: 'User Management', icon: MdPeople, submenu: [] },
    { id: 'tasks', label: 'Task Management', icon: MdTaskAlt, submenu: [] },
    { id: 'user-expandancy', label: 'User Expandancy Management', icon: MdAssignment, submenu: [] },
    { id: 'task-expandancy', label: 'Task Expandancy Management', icon: MdAssignment, submenu: [] },
  ];

  const toggleSubmenu = (id) => {
    setExpandedMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMenuClick = (id) => {
    onNavigate(id);
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 to-slate-800 transform transition-transform duration-300 z-50 lg:z-10 lg:translate-x-0 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700 sticky top-0 bg-slate-900">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Admin</h2>
              <p className="text-sm text-slate-400 mt-1">Shiv</p>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <MdClose size={20} />
            </button>
          </div>
          <p className="text-sm text-slate-300 font-medium">Airr News</p>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2">
          {menuItems.map(item => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.id;
            const hasSubmenu = item.submenu.length > 0;
            const isExpanded = expandedMenus[item.id];

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (hasSubmenu) {
                      toggleSubmenu(item.id);
                    } else {
                      handleMenuClick(item.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <IconComponent size={20} />
                  <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                  {hasSubmenu && (
                    isExpanded ? <MdExpandMore size={18} /> : <MdChevronRight size={18} />
                  )}
                </button>

                {/* Submenu */}
                {hasSubmenu && isExpanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-slate-700 pl-3">
                    {item.submenu.map(subitem => (
                      <button
                        key={subitem.id}
                        onClick={() => handleMenuClick(subitem.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-medium transition ${
                          currentPage === subitem.id
                            ? 'bg-blue-500 text-white'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                        }`}
                      >
                        {subitem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

// Header Component
const AdminHeader = ({ onToggleSidebar }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formatTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="bg-white border-b border-slate-300 sticky top-0 z-30">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden text-slate-600 hover:text-slate-900"
          >
            <MdMenu size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-slate-900">{formatDate}</p>
          <p className="text-sm text-slate-600">{formatTime}</p>
        </div>
      </div>
    </div>
  );
};

// Page Components
const Dashboard = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-900 mb-6">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { title: 'Total Users', value: '1,234' },
        { title: 'Active Tasks', value: '56' },
        { title: 'Categories', value: '42' },
        { title: 'Pending Items', value: '18' },
      ].map((card, idx) => (
        <div key={idx} className="bg-white p-6 rounded-lg border border-slate-300 shadow-sm">
          <p className="text-sm text-slate-600">{card.title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  </div>
);

const Categories = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-900 mb-4">Product Service Categories</h2>
    <div className="bg-white p-6 rounded-lg border border-slate-300">
      <p className="text-slate-600">Category management interface will be displayed here</p>
    </div>
  </div>
);

const UserManagement = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-900 mb-4">User Management</h2>
    <div className="bg-white p-6 rounded-lg border border-slate-300">
      <p className="text-slate-600">User management interface will be displayed here</p>
    </div>
  </div>
);

const TaskManagement = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-900 mb-4">Task Management</h2>
    <div className="bg-white p-6 rounded-lg border border-slate-300">
      <p className="text-slate-600">Task management interface will be displayed here</p>
    </div>
  </div>
);

const UserExpandancy = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-900 mb-4">User Expandancy Management</h2>
    <div className="bg-white p-6 rounded-lg border border-slate-300">
      <p className="text-slate-600">User expandancy management interface will be displayed here</p>
    </div>
  </div>
);

const TaskExpandancy = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-900 mb-4">Task Expandancy Management</h2>
    <div className="bg-white p-6 rounded-lg border border-slate-300">
      <p className="text-slate-600">Task expandancy management interface will be displayed here</p>
    </div>
  </div>
);

// Main App Component
const AdminApp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'categories':
        return <Categories />;
      case 'users':
        return <UserManagement />;
      case 'tasks':
        return <TaskManagement />;
      case 'user-expandancy':
        return <UserExpandancy />;
      case 'task-expandancy':
        return <TaskExpandancy />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <div className="flex-1 flex flex-col lg:ml-64">
        <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default AdminApp;