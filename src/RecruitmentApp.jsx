import React, { useState } from 'react';
import { RefreshCw, AlertCircle, BarChart3, TrendingUp, Users } from 'lucide-react';
import { useRecruitmentData } from './apiService';
import CombinedDashboard from './CombinedDashboard';
import RecruitmentFunnel from './RecruitmentFunnel';
import StageWiseAnalysis from './StageWiseAnalysis';

const App = () => {
  const { data, loading, error, refetch } = useRecruitmentData();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading recruitment data...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the latest data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-center mb-2 text-gray-900">Error Loading Data</h2>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button
            onClick={refetch}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2 text-gray-900">No Data Available</h2>
          <p className="text-gray-600 mb-4">No recruitment data found. Please check your data source.</p>
          <button
            onClick={refetch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Recruitment Analytics Platform</h1>
                <p className="text-blue-100 text-sm">Comprehensive dashboard, funnel analysis & stage-wise insights</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-blue-100">Total Candidates</p>
                <p className="text-2xl font-bold">{data.length}</p>
              </div>
              <button
                onClick={refetch}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard & Analytics
            </button>
            <button
              onClick={() => setActiveTab('funnel')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                activeTab === 'funnel'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              Recruitment Funnel
            </button>
            <button
              onClick={() => setActiveTab('stagewise')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                activeTab === 'stagewise'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="h-4 w-4" />
              Stage-wise Analysis
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && <CombinedDashboard data={data} />}
        {activeTab === 'funnel' && <RecruitmentFunnel data={data} />}
        {activeTab === 'stagewise' && <StageWiseAnalysis data={data} />}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              <p>Recruitment Analytics Platform v2.0</p>
              <p className="text-xs text-gray-500 mt-1">Real-time data synchronization • Stage-wise deep analysis enabled</p>
            </div>
            <div className="text-right">
              <p>Last updated: {new Date().toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">
                {data.length} candidates • {new Set(data.map(d => d.platform).filter(Boolean)).size} platforms • 16 funnel stages
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;