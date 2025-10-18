import React, { useState, useEffect } from 'react';
import { MdMenu, MdClose, MdDashboard, MdShoppingCart, MdPeople, MdTaskAlt, MdAssignment, MdExpandMore, MdChevronRight, MdSearch, MdNotifications, MdSettings, MdLogout, MdMenuOpen, MdFavoriteBorder, MdFavorite, MdAnalytics, MdHistory, MdHelp } from 'react-icons/md';
import CategoryManager from './CategoryManager';
import RecruitmentApp from './RecruitmentApp';
import { UserManagement, TaskManagement } from './UserTaskManagement';

// Advanced Sidebar Component
const AdminSidebar = ({ isOpen, onToggle, currentPage, onNavigate, sidebarCompressed, setSidebarCompressed }) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const [favorites, setFavorites] = useState(new Set(['dashboard', 'categories']));
  const [searchQuery, setSearchQuery] = useState('');
  const [recentPages, setRecentPages] = useState([]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MdDashboard, submenu: [] },
    { 
      id: 'management', 
      label: 'Management', 
      icon: MdAnalytics, 
      submenu: [
        { id: 'categories', label: 'Product Service Categories', icon: MdShoppingCart },
        { id: 'users', label: 'User Management', icon: MdPeople },
        { id: 'tasks', label: 'Task Management', icon: MdTaskAlt },
      ]
    },
    { 
      id: 'expansion', 
      label: 'Dependency', 
      icon: MdAssignment, 
      submenu: [
        { id: 'user-expandancy', label: 'User Dependency Management', icon: MdPeople },
        { id: 'task-expandancy', label: 'Task Dependency Management', icon: MdTaskAlt },
      ]
    },
  ];

  const toggleSubmenu = (id) => {
    setExpandedMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMenuClick = (id) => {
    onNavigate(id);
    setRecentPages(prev => {
      const updated = [id, ...prev.filter(p => p !== id)].slice(0, 5);
      return updated;
    });
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const filteredMenuItems = menuItems.map(item => ({
    ...item,
    submenu: item.submenu.filter(sub => 
      sub.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.submenu.length > 0
  );

  const getFlatMenuItems = () => {
    return menuItems.flatMap(item => [
      { ...item, submenu: [] },
      ...(item.submenu || [])
    ]);
  };

  const favoriteItems = getFlatMenuItems().filter(item => favorites.has(item.id));

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        ></div>
      )}

      <div
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 transform transition-all duration-300 z-50 lg:z-10 lg:translate-x-0 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${sidebarCompressed ? 'w-20' : 'w-64'}`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700 sticky top-0 bg-slate-900">
          <div className="flex justify-between items-start mb-4">
            {!sidebarCompressed && (
              <div>
                <h2 className="text-xl font-bold text-white">Admin</h2>
                <p className="text-sm text-slate-400 mt-1">Shiv</p>
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => setSidebarCompressed(!sidebarCompressed)}
                className="text-slate-400 hover:text-white hidden lg:block"
                title={sidebarCompressed ? 'Expand' : 'Collapse'}
              >
                {sidebarCompressed ? <MdMenuOpen size={20} /> : <MdMenu size={20} />}
              </button>
              <button
                onClick={onToggle}
                className="lg:hidden text-slate-400 hover:text-white"
              >
                <MdClose size={20} />
              </button>
            </div>
          </div>
          {!sidebarCompressed && <p className="text-sm text-slate-300 font-medium">Airr News</p>}
        </div>

        {/* Search */}
        {!sidebarCompressed && (
          <div className="p-4 border-b border-slate-700">
            <div className="relative">
              <MdSearch className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Favorites Section */}
        {!sidebarCompressed && favoriteItems.length > 0 && (
          <div className="p-4 border-b border-slate-700">
            <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">Favorites</h3>
            <div className="space-y-1">
              {favoriteItems.map(item => {
                const IconComponent = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <IconComponent size={16} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Menu */}
        <div className="p-4 space-y-2">
          {(searchQuery ? filteredMenuItems : menuItems).map(item => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.id;
            const hasSubmenu = item.submenu.length > 0;
            const isExpanded = expandedMenus[item.id];
            const isFavorite = favorites.has(item.id);

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
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 relative group ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  title={sidebarCompressed ? item.label : ''}
                >
                  <IconComponent size={20} />
                  {!sidebarCompressed && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                      <div className="flex items-center gap-1">
                        {!hasSubmenu && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(item.id);
                            }}
                            className="hover:text-yellow-400"
                          >
                            {isFavorite ? <MdFavorite size={16} /> : <MdFavoriteBorder size={16} />}
                          </button>
                        )}
                        {hasSubmenu && (
                          isExpanded ? <MdExpandMore size={18} /> : <MdChevronRight size={18} />
                        )}
                      </div>
                    </>
                  )}
                </button>

                {/* Submenu */}
                {hasSubmenu && isExpanded && !sidebarCompressed && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-slate-700 pl-3">
                    {item.submenu.map(subitem => {
                      const SubIcon = subitem.icon;
                      const isSubActive = currentPage === subitem.id;
                      const isSubFavorite = favorites.has(subitem.id);

                      return (
                        <button
                          key={subitem.id}
                          onClick={() => handleMenuClick(subitem.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-medium transition ${
                            isSubActive
                              ? 'bg-blue-500 text-white'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                          }`}
                        >
                          <SubIcon size={14} />
                          <span className="flex-1 text-left truncate">{subitem.label}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(subitem.id);
                            }}
                            className="hover:text-yellow-400"
                          >
                            {isSubFavorite ? <MdFavorite size={12} /> : <MdFavoriteBorder size={12} />}
                          </button>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Recent Pages */}
        {!sidebarCompressed && recentPages.length > 0 && (
          <div className="p-4 border-t border-slate-700">
            <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">Recent</h3>
            <div className="space-y-1">
              {recentPages.slice(0, 3).map(pageId => {
                const allItems = getFlatMenuItems();
                const page = allItems.find(p => p.id === pageId);
                if (!page) return null;
                const PageIcon = page.icon;
                return (
                  <button
                    key={pageId}
                    onClick={() => handleMenuClick(pageId)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition"
                  >
                    <MdHistory size={14} />
                    <span className="truncate">{page.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {!sidebarCompressed && (
          <div className="p-4 border-t border-slate-700 space-y-2 sticky bottom-0 bg-slate-900">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition text-sm">
              <MdSettings size={18} />
              <span>Settings</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition text-sm">
              <MdHelp size={18} />
              <span>Help</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-300 hover:text-red-400 hover:bg-slate-700 rounded-lg transition text-sm">
              <MdLogout size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// Enhanced Header Component
const AdminHeader = ({ onToggleSidebar }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);

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

  const notifications = [
    { id: 1, message: '3 new tasks assigned', time: '2 mins ago' },
    { id: 2, message: 'Category update approved', time: '1 hour ago' },
    { id: 3, message: 'User registration pending', time: '3 hours ago' },
  ];

  return (
    <div className="bg-white border-b border-slate-300 sticky top-0 z-30 shadow-sm">
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
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">{formatDate}</p>
            <p className="text-sm text-slate-600">{formatTime}</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-slate-600 hover:text-slate-900"
            >
              <MdNotifications size={24} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                <div className="p-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map(notif => (
                    <div key={notif.id} className="p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm font-medium text-slate-900">{notif.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Page Components
const Dashboard = () => (
  <RecruitmentApp />
);

const Categories = ({ onCategoriesChange }) => (
  <CategoryManager onCategoriesChange={onCategoriesChange} />
);

const UserExpandancy = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-900 mb-4">User Dependency Management</h2>
    <div className="bg-white p-6 rounded-lg border border-slate-300">
      <p className="text-slate-600">Manage user dependencies, relationships and interdependencies</p>
    </div>
  </div>
);

const TaskExpandancy = () => (
  <div className="p-6">
    <h2 className="text-3xl font-bold text-slate-900 mb-4">Task Dependency Management</h2>
    <div className="bg-white p-6 rounded-lg border border-slate-300">
      <p className="text-slate-600">Manage task dependencies, workflows and task relationships</p>
    </div>
  </div>
);

// Main App Component
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCompressed, setSidebarCompressed] = useState(false);
  const [sharedCategories, setSharedCategories] = useState([]);
  const [sharedUsers, setSharedUsers] = useState([]);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'categories':
        return <Categories onCategoriesChange={setSharedCategories} />;
      case 'users':
        return <UserManagement categories={sharedCategories} onUsersChange={setSharedUsers} />;
      case 'tasks':
        return <TaskManagement categories={sharedCategories} users={sharedUsers} />;
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
        sidebarCompressed={sidebarCompressed}
        setSidebarCompressed={setSidebarCompressed}
      />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarCompressed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;