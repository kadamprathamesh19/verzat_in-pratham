import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useApplications } from '../context/ApplicationContext'; // adjust path as needed
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";

export default function ApplicationList() {
    const { applications, loading, error, deleteApplication } = useApplications();

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    const filteredApplicants = useMemo(() => {
        return applications.filter(applicant =>
            applicant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.position?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, applications]);

    const paginatedApplicants = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredApplicants.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, filteredApplicants]);

    const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);

    const handleDelete = (applicantId) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            deleteApplication(applicantId);
            toast.success("Applicant deleted successfully!")
        }
    };


    const handleViewDetails = (applicantId) => {
        navigate(`/admin/applicants/${applicantId}`);
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-blue-700">Job Applications</h1>
                    <p className="text-lg text-gray-900 mt-1">Manage and review all incoming applications.</p>
                </header>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Search */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or position..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Loading/Error States */}
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading applications...</div>
                    ) : error ? (
                        <div className="p-8 text-center text-red-500">{error}</div>
                    ) : (
                        <>
                            {/* Applicants Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
                                            <th className="p-4 text-sm font-semibold text-gray-600">Applied For</th>
                                            <th className="p-4 text-sm font-semibold text-gray-600">Contact</th>
                                            <th className="p-4 text-sm font-semibold text-gray-600">Date Applied</th>
                                            <th className="p-4 text-sm font-semibold text-gray-600">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedApplicants.length > 0 ? (
                                            paginatedApplicants.map(applicant => (
                                                <tr key={applicant._id} className="border-b border-gray-200 hover:bg-gray-50">
                                                    <td className="p-4">
                                                        <div className="font-medium text-gray-900">{applicant.name}</div>
                                                        <div className="text-sm text-gray-500">{applicant.email}</div>
                                                    </td>
                                                    <td className="p-4 text-gray-800">{applicant.position}</td>
                                                    <td className="p-4 text-gray-800">{applicant.contact}</td>
                                                    <td className="p-4 text-gray-800">{new Date(applicant.createdAt).toLocaleDateString()}</td>
                                                    <td className="p-4">
                                                        <div className='flex gap-5'>
                                                            <button
                                                                onClick={() => handleViewDetails(applicant._id)}
                                                                className="px-3 py-1.5 bg-indigo-100 text-indigo-700 font-semibold rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                                                            >
                                                                View Details
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(applicant._id)}
                                                                className="px-3 py-1.5 bg-red-100 text-red-700 font-semibold rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center p-8 text-gray-500">
                                                    No applications found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="p-4 flex items-center justify-between border-t border-gray-200">
                                    <span className="text-sm text-gray-600">
                                        Showing page {currentPage} of {totalPages}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
