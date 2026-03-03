import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../../../config';
import { API_ENDPOINTS } from '../../../config/routes';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Separator } from '../../../components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';

const UserEnquiryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (id) {
      fetchEnquiryDetail();
    }
  }, [id]);

  const fetchEnquiryDetail = async () => {
    try {
      setLoading(true);
      const response = await apiService.get(API_ENDPOINTS.CONSULTATION.GET_BY_ID.replace(':id', id));
      const enquiryData = response.data?.data || response.data || response;
      setEnquiry(enquiryData);
      setError('');
    } catch (err) {
      console.error('Error fetching enquiry detail:', err);
      setError(err.message || 'Failed to fetch enquiry details');
      setEnquiry(null);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status) => {
    if (!enquiry) return;
    
    try {
      setIsUpdating(true);
      await apiService.patch(API_ENDPOINTS.CONSULTATION.UPDATE_STATUS.replace(':id', enquiry._id), { status });
      setEnquiry(prev => ({ ...prev, status }));
    } catch (err) {
      console.error('Error updating status:', err);
      setError(err.message || 'Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteEnquiry = async () => {
    if (!enquiry) return;
    
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    
    try {
      await apiService.delete(API_ENDPOINTS.CONSULTATION.DELETE.replace(':id', enquiry._id));
      navigate('/admin/enquiries');
    } catch (err) {
      console.error('Error deleting enquiry:', err);
      setError(err.message || 'Failed to delete enquiry');
    }
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617] flex justify-center items-center">
        <div className="text-white">Loading enquiry details...</div>
      </div>
    );
  }

  if (error || !enquiry) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617] flex flex-col justify-center items-center p-4">
        <div className="text-red-500 text-center mb-4">{error || 'Enquiry not found'}</div>
        <Link to="/admin/enquiries">
          <Button variant="outline">Back to Enquiries</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#050b1e] via-[#0b1d3a] to-[#020617]">
      {/* Header */}
      <Card className="bg-gray-900/50 backdrop-blur-lg border-gray-700 mx-4 sticky top-16 z-20">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <Link 
                to="/admin/enquiries"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-xs sm:text-sm">Back to Enquiries</span>
              </Link>
              <h1 className="text-lg sm:text-2xl font-bold text-white">Enquiry Details</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Select
                value={enquiry.status}
                onValueChange={updateStatus}
                disabled={isUpdating}
              >
                <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="pending" className="text-white">Pending</SelectItem>
                  <SelectItem value="inProgress" className="text-white">In Progress</SelectItem>
                  <SelectItem value="resolved" className="text-white">Resolved</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                onClick={deleteEnquiry}
                variant="destructive"
                size="sm"
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="w-full flex-1 p-4">
        <div className="space-y-6">
          {/* Customer Information and Enquiry Details - Horizontal Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Information Card */}
            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 w-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Name</label>
                    <p className="text-white font-medium text-lg">{enquiry.name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Email</label>
                    <p className="text-white font-medium">{enquiry.email || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Phone Number</label>
                    <p className="text-white font-medium">{enquiry.phoneNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Booking Status</label>
                    <div className="mt-1">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        enquiry.isBooked 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {enquiry.isBooked ? 'Booked' : 'General Enquiry'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-gray-700" />
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-gray-400 text-sm">Enquiry Status</label>
                    <div className="mt-1">
                      {getStatusBadge(enquiry.status)}
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Created Date</label>
                    <p className="text-white font-medium">{formatDate(enquiry.createdAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enquiry Details Card */}
            <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 w-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Enquiry Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Subject</label>
                  <div className="mt-1 p-4 bg-gray-700/50 rounded-lg">
                    <p className="text-white whitespace-pre-wrap text-base">{enquiry.subject || 'No subject provided'}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-gray-400 text-sm">Description</label>
                  <div className="mt-1 p-4 bg-gray-700/50 rounded-lg min-h-[200px]">
                    <p className="text-white whitespace-pre-wrap text-base leading-relaxed">{enquiry.description || 'No description provided'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information Card - Full Width */}
          <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 w-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-gray-400 text-sm">Enquiry ID</label>
                  <p className="text-white font-mono text-sm bg-gray-700/50 p-2 rounded">{enquiry._id}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Created Date</label>
                  <p className="text-white font-medium">{formatDate(enquiry.createdAt)}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Last Updated</label>
                  <p className="text-white font-medium">{formatDate(enquiry.updatedAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link to="/admin/enquiries">
              <Button variant="outline" className="w-full sm:w-auto bg-white text-black border-gray-300 hover:bg-gray-100">
                Back to List
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEnquiryDetailPage;
