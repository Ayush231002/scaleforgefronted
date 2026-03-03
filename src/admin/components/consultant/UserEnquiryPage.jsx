import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../../../config';
import { API_ENDPOINTS } from '../../../config/routes';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';

const UserEnquiryPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [filterType, setFilterType] = useState('all'); // all, booked, notBooked
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const response = await apiService.get(API_ENDPOINTS.CONSULTATION.GET_ALL);
      console.log('API Response:', response); // Debug log
      // Handle different response structures
      const enquiriesData = response.data?.data || response.data || response || [];
      setEnquiries(Array.isArray(enquiriesData) ? enquiriesData : []);
      setError('');
    } catch (err) {
      console.error('Error fetching enquiries:', err);
      setError(err.message || 'Failed to fetch enquiries');
      setEnquiries([]); // Ensure enquiries is always an array
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await apiService.patch(API_ENDPOINTS.CONSULTATION.UPDATE_STATUS.replace(':id', id), { status });
      await fetchEnquiries();
    } catch (err) {
      console.error('Error updating status:', err);
      setError(err.message || 'Failed to update status');
    }
  };

  const deleteEnquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    
    try {
      await apiService.delete(API_ENDPOINTS.CONSULTATION.DELETE.replace(':id', id));
      await fetchEnquiries();
    } catch (err) {
      console.error('Error deleting enquiry:', err);
      setError(err.message || 'Failed to delete enquiry');
    }
  };

  const getFilteredEnquiries = () => {
    // Ensure enquiries is always an array
    const enquiriesArray = Array.isArray(enquiries) ? enquiries : [];
    let filtered = enquiriesArray;
    
    // Filter by booking status
    if (filterType === 'booked') {
      filtered = filtered.filter(e => e.isBooked);
    } else if (filterType === 'notBooked') {
      filtered = filtered.filter(e => !e.isBooked);
    }
    
    // Filter by status
    if (activeTab !== 'all') {
      filtered = filtered.filter(e => e.status === activeTab);
    }
    
    // Sort by newest first (createdAt descending)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return filtered;
  };

  const getStatusCounts = () => {
    // Ensure enquiries is always an array
    const enquiriesArray = Array.isArray(enquiries) ? enquiries : [];
    
    const counts = {
      total: enquiriesArray.length,
      pending: enquiriesArray.filter(e => e.status === 'pending').length,
      inProgress: enquiriesArray.filter(e => e.status === 'inProgress').length,
      resolved: enquiriesArray.filter(e => e.status === 'resolved').length
    };
    return counts;
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': 
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'inProgress': 
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'resolved': 
        return <Badge variant="default" className="bg-green-100 text-green-800">Resolved</Badge>;
      default: 
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const toggleDescription = (enquiryId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [enquiryId]: !prev[enquiryId]
    }));
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatTextWithLineBreaks = (text, charsPerLine = 20) => {
    if (!text) return '';
    
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    words.forEach(word => {
      // If adding this word exceeds the line limit
      if ((currentLine + ' ' + word).length > charsPerLine) {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          // Word itself is longer than charsPerLine, break it
          for (let i = 0; i < word.length; i += charsPerLine) {
            lines.push(word.substring(i, i + charsPerLine));
          }
        }
      } else {
        currentLine = currentLine ? currentLine + ' ' + word : word;
      }
    });
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines.join('\n');
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617]">
      {/* Header */}
      <Card className="bg-gray-900/50 backdrop-blur-lg border-gray-700 mx-4 sticky top-16 z-20">
        <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link 
              to="/admin/dashboard"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-xs sm:text-sm">Back</span>
            </Link>
            <h1 className="text-lg sm:text-2xl font-bold text-white">User Enquiries</h1>
          </div>
          
          {/* Status Counts - Responsive */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-gray-400 text-xs">Total:</span>
              <button
                onClick={() => setActiveTab('all')}
                className={`bg-gray-700 text-white px-1 sm:px-2 py-1 rounded text-xs sm:text-sm font-medium hover:bg-gray-600 transition-colors ${activeTab === 'all' ? 'ring-2 ring-gray-400' : ''}`}
              >
                {getStatusCounts().total}
              </button>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab('pending')}
                className={`bg-yellow-100 text-yellow-800 px-1 sm:px-2 py-1 rounded text-xs sm:text-sm font-medium hover:bg-yellow-200 transition-colors ${activeTab === 'pending' ? 'ring-2 ring-yellow-400' : ''}`}
              >
                Pending: {getStatusCounts().pending}
              </button>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab('inProgress')}
                className={`bg-blue-100 text-blue-800 px-1 sm:px-2 py-1 rounded text-xs sm:text-sm font-medium hover:bg-blue-200 transition-colors ${activeTab === 'inProgress' ? 'ring-2 ring-blue-400' : ''}`}
              >
                InProgress: {getStatusCounts().inProgress}
              </button>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab('resolved')}
                className={`bg-green-100 text-green-800 px-1 sm:px-2 py-1 rounded text-xs sm:text-sm font-medium hover:bg-green-200 transition-colors ${activeTab === 'resolved' ? 'ring-2 ring-green-400' : ''}`}
              >
                Resolved: {getStatusCounts().resolved}
              </button>
            </div>
          </div>
          
          {/* Filter Buttons - Responsive */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm ${filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('booked')}
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm ${filterType === 'booked' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Booked
            </button>
            <button
              onClick={() => setFilterType('notBooked')}
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm ${filterType === 'notBooked' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Non-Booked
            </button>
          </div>
        </div>
      </CardContent>
    </Card>

      {/* Main Content */}
      <div className="w-full flex-1 p-2">
        <h1 className="text-xl sm:text-3xl font-bold text-white mb-4 sm:mb-8">User Enquiry Management</h1>
        
        {/* Desktop Table View */}
        <div className="hidden sm:block p-4">
          <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-700">
                    <TableHead className="px-3 py-2 text-left text-xs font-medium">Name</TableHead>
                    <TableHead className="px-3 py-2 text-left text-xs font-medium">Email</TableHead>
                    <TableHead className="px-3 py-2 text-left text-xs font-medium">Phone</TableHead>
                    <TableHead className="px-3 py-2 text-center text-xs font-medium">Booked</TableHead>
                    <TableHead className="px-3 py-2 text-center text-xs font-medium">Status</TableHead>
                    <TableHead className="px-3 py-2 text-left text-xs font-medium">Subject</TableHead>
                    <TableHead className="px-3 py-2 text-left text-xs font-medium">Description</TableHead>
                    <TableHead className="px-3 py-2 text-center text-xs font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredEnquiries().map(enquiry => (
                    <TableRow key={enquiry._id} className="border-b border-gray-700 hover:bg-gray-700/50 align-top">
                      <TableCell className="px-3 py-2 text-xs text-white">{enquiry.name}</TableCell>
                      <TableCell className="px-3 py-2 text-xs text-white">{enquiry.email}</TableCell>
                      <TableCell className="px-3 py-2 text-xs text-white">{enquiry.phoneNumber}</TableCell>
                      <TableCell className="px-3 py-2 text-center">
                        <span className={`px-1 py-0.5 rounded text-xs ${enquiry.isBooked ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {enquiry.isBooked ? 'Yes' : 'No'}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 py-2 text-center">
                        {getStatusBadge(enquiry.status)}
                      </TableCell>
                      <TableCell className="px-3 py-2 text-xs max-w-xs">
                        <div className="min-h-[40px]">
                          <div className="flex flex-col">
                            <p className="whitespace-pre-wrap text-white text-xs leading-tight">
                              {formatTextWithLineBreaks(enquiry.subject, 25)}
                            </p>
                            {enquiry.subject && enquiry.subject.length > 75 && (
                              <button
                                onClick={() => toggleDescription(enquiry._id)}
                                className="text-blue-400 hover:text-blue-300 text-xs mt-1 self-start"
                              >
                                {expandedDescriptions[enquiry._id] ? 'Show Less' : 'Show More'}
                              </button>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2 text-xs max-w-sm">
                        <div className="min-h-[60px]">
                          <div className="flex flex-col">
                            <p className="whitespace-pre-wrap text-white text-xs leading-tight">
                              {expandedDescriptions[enquiry._id] 
                                ? formatTextWithLineBreaks(enquiry.description, 25)
                                : formatTextWithLineBreaks(truncateText(enquiry.description, 75), 25)
                              }
                            </p>
                            {enquiry.description && enquiry.description.length > 75 && (
                              <button
                                onClick={() => toggleDescription(enquiry._id)}
                                className="text-blue-400 hover:text-blue-300 text-xs mt-1 self-start"
                              >
                                {expandedDescriptions[enquiry._id] ? 'Show Less' : 'Show More'}
                              </button>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-2">
                        <div className="flex flex-col space-y-1 min-h-[80px]">
                          <Link to={`/admin/enquiries/${enquiry._id}`}>
                            <Button variant="outline" size="sm" className="w-full text-xs">
                              View Details
                            </Button>
                          </Link>
                          <select
                            value={enquiry.status}
                            onChange={(e) => updateStatus(enquiry._id, e.target.value)}
                            className="bg-gray-700 text-white px-1 py-0.5 rounded text-xs w-full text-xs"
                          >
                            <option value="pending">Pending</option>
                            <option value="inProgress">In Progress</option>
                            <option value="resolved">Resolved</option>
                          </select>
                          <button
                            onClick={() => deleteEnquiry(enquiry._id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-1 py-0.5 rounded text-xs w-full"
                          >
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden space-y-4 p-4">
              {getFilteredEnquiries().map(enquiry => (
                <div key={enquiry._id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  {/* Header with name and status */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-sm">{enquiry.name}</h3>
                      <p className="text-gray-400 text-xs">{enquiry.email}</p>
                      <p className="text-gray-400 text-xs">{enquiry.phoneNumber}</p>
                    </div>
                    <div className="flex flex-col gap-1 ml-2">
                      <span className={`px-2 py-1 rounded text-xs ${enquiry.isBooked ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {enquiry.isBooked ? 'Booked' : 'General'}
                      </span>
                      {getStatusBadge(enquiry.status)}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="mb-3">
                    <h4 className="text-gray-300 text-xs font-medium mb-1">Subject:</h4>
                    <p className="text-white text-xs">{enquiry.subject}</p>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <h4 className="text-gray-300 text-xs font-medium mb-1">Description:</h4>
                    <p className="text-white text-xs whitespace-pre-wrap">
                      {expandedDescriptions[enquiry._id] 
                        ? enquiry.description 
                        : truncateText(enquiry.description, 100)
                      }
                    </p>
                    {enquiry.description && enquiry.description.length > 100 && (
                      <button
                        onClick={() => toggleDescription(enquiry._id)}
                        className="text-blue-400 hover:text-blue-300 text-xs mt-2"
                      >
                        {expandedDescriptions[enquiry._id] ? 'Show Less' : 'Show More'}
                      </button>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Link to={`/admin/enquiries/${enquiry._id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                    <div className="flex gap-2">
                      <select
                        value={enquiry.status}
                        onChange={(e) => updateStatus(enquiry._id, e.target.value)}
                        className="flex-1 bg-gray-600 text-white px-2 py-1 rounded text-xs"
                      >
                        <option value="pending">Pending</option>
                        <option value="inProgress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <button
                        onClick={() => deleteEnquiry(enquiry._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default UserEnquiryPage;
