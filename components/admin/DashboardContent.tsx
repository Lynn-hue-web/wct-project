'use client';

import { useEffect, useState } from 'react';
import { Users, Calendar, Briefcase, Layers } from 'lucide-react'; // Import the "Layers" icon
import { useRouter } from 'next/navigation'; // For navigating to a new page

interface StatsData {
  totalUsers: number;
  activeUsers: number;
  lastDaySignups: number;
}

export default function DashboardContent() {
  const [route, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalDoctors, setTotalDoctors] = useState<number>(0);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [totalRejected, setTotalRejected] = useState<number>(0);
  const [totalServices, setTotalServices] = useState<number>(0); // New state for total services

  const router = useRouter(); // Use router for navigation

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    const calculateBookingStats = () => {
      const storedBookings = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
      const acceptedBookings = storedBookings.filter((booking: any) => booking.status === 'Accepted');
      const rejectedBookings = storedBookings.filter((booking: any) => booking.status === 'Rejected'); // Count rejected bookings
      setTotalBookings(acceptedBookings.length);
      setTotalRejected(rejectedBookings.length); // Set the total rejected bookings
    };

    // Fetch total doctors from localStorage dynamically
    const storedDoctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    setTotalDoctors(storedDoctors.length);

    // Fetch total services from localStorage dynamically
    const storedServices = JSON.parse(localStorage.getItem('services') || '[]');
    setTotalServices(storedServices.length); // Set the total services count

    fetchStats();
    calculateBookingStats();

    // Listen for booking updates
    const handleBookingUpdate = () => calculateBookingStats();
    window.addEventListener('bookingUpdated', handleBookingUpdate);

    // Cleanup event listener
    return () => {
      window.removeEventListener('bookingUpdated', handleBookingUpdate);
    };
  }, []);

  // Navigate to users page
  const handleTotalUsersClick = () => {
    router.push('/admin/total-user'); // Navigate to the users page
  };

  return (
    <div className="p-6 space-y-4">
      {/* Total Users Card */}
      <div className="bg-white rounded-lg shadow p-6 cursor-pointer" onClick={handleTotalUsersClick}>
        <div className="flex items-center gap-4">
          <Users className="w-8 h-8 text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-24"></div>
              </div>
            ) : (
              <p className="text-2xl font-bold text-gray-900">{route?.totalUsers || 0}</p>
            )}
          </div>
        </div>
      </div>

      {/* Total Doctors Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <Briefcase className="w-8 h-8 text-green-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Doctors</h3>
            <p className="text-2xl font-bold text-gray-900">{totalDoctors}</p>
          </div>
        </div>
      </div>

      {/* Total Bookings Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <Calendar className="w-8 h-8 text-orange-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Bookings</h3>
            <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
          </div>
        </div>
      </div>

      {/* Total Rejected Bookings Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <Calendar className="w-8 h-8 text-red-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Rejected Bookings</h3>
            <p className="text-2xl font-bold text-gray-900">{totalRejected}</p>
          </div>
        </div>
      </div>

      {/* Total Services Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <Layers className="w-8 h-8 text-purple-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Services</h3>
            <p className="text-2xl font-bold text-gray-900">{totalServices}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
