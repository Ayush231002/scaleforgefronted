import React, { useState, useEffect } from 'react';

const ConsultantSchedulePage = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchSchedule();
  }, [selectedDate]);

  const fetchSchedule = async () => {
    // Mock data for now - replace with actual API call
    const mockSchedule = [
      {
        id: 1,
        time: '09:00',
        client: 'John Doe',
        service: 'Web Development Consultation',
        status: 'confirmed',
        duration: '1 hour'
      },
      {
        id: 2,
        time: '10:30',
        client: 'Jane Smith',
        service: 'Mobile App Consultation',
        status: 'pending',
        duration: '1 hour'
      },
      {
        id: 3,
        time: '14:00',
        client: 'Bob Johnson',
        service: 'UI/UX Design',
        status: 'confirmed',
        duration: '2 hours'
      }
    ];
    
    setSchedule(mockSchedule);
    setLoading(false);
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-gray-600 ml-2">Loading schedule...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Consultant Schedule</h1>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add Appointment
          </button>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Time Slots */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">Time Slots</h3>
            <div className="space-y-2">
              {timeSlots.map((time) => {
                const appointment = schedule.find(apt => apt.time === time);
                return (
                  <div
                    key={time}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      appointment 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-gray-900 border-gray-700 border-dashed'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-white w-16">{time}</span>
                      {appointment ? (
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{appointment.client}</p>
                          <p className="text-xs text-gray-400">{appointment.service}</p>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Available</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {appointment && (
                        <>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                          <button className="text-blue-400 hover:text-blue-300 text-sm">
                            Edit
                          </button>
                        </>
                      )}
                      {!appointment && (
                        <button className="text-green-400 hover:text-green-300 text-sm">
                          Book
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Daily Summary</h3>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Total Appointments</h4>
                <p className="text-2xl font-bold text-white">{schedule.length}</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Confirmed</h4>
                <p className="text-2xl font-bold text-green-400">
                  {schedule.filter(apt => apt.status === 'confirmed').length}
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Pending</h4>
                <p className="text-2xl font-bold text-yellow-400">
                  {schedule.filter(apt => apt.status === 'pending').length}
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Available Slots</h4>
                <p className="text-2xl font-bold text-blue-400">
                  {timeSlots.length - schedule.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantSchedulePage;
