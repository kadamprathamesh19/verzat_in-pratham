// Add at the top with other imports (optional local state for notes)
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail, Phone, User, Download, ArrowLeft, CalendarDays, ClipboardList, FileText, CheckCircle2, BadgeInfo, Building2 } from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';

// ... keep all original code above unchanged

export default function ApplicantData() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, loading, error } = useApplications();

  const [applicantData, setApplicantData] = useState(null);
  const [adminNotes, setAdminNotes] = useState(''); // new, optional
  const [status, setStatus] = useState('New'); // new, optional: New | In Review | Shortlisted | Rejected

  useEffect(() => {
    if (!loading && applications.length > 0) {
      const found = applications.find(app => app._id === id);
      setApplicantData(found);
    }
  }, [applications, id, loading]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading applicant data...</div>;
  }

  if (!applicantData) {
    return <div className="p-8 text-center text-red-500">Applicant not found.</div>;
  }

  const prettyDate = applicantData.createdAt ? new Date(applicantData.createdAt).toLocaleString() : '-';

  // Status badge styling (purely presentational, does not change data)
  const statusClasses = {
    'New': 'bg-blue-100 text-blue-700 ring-blue-200',
    'In Review': 'bg-amber-100 text-amber-700 ring-amber-200',
    'Shortlisted': 'bg-emerald-100 text-emerald-700 ring-emerald-200',
    'Rejected': 'bg-rose-100 text-rose-700 ring-rose-200',
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Applications
          </button>
        </div>

        {/* Header Section (original preserved + status + quick actions) */}
        <header className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{applicantData.name}</h1>
              <p className="text-lg text-indigo-600 font-semibold mt-1">Applied for: {applicantData.position}</p>
              <p className="text-sm text-gray-500 mt-2 flex items-center">
                <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
                Application Submitted: {prettyDate}
              </p>
              {/* Lightweight status badge */}
              <div className="mt-3 flex items-center gap-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold ring-1 ${statusClasses[status] || statusClasses['New']}`}>
                  <BadgeInfo className="h-3 w-3 mr-1" />
                  {status}
                </span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="text-xs border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-indigo-500"
                >
                  <option>New</option>
                  <option>In Review</option>
                  <option>Shortlisted</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${applicantData.email}`}
                className="flex items-center justify-center px-5 py-3 bg-white text-gray-700 border border-gray-300 font-semibold rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-colors duration-300"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email Applicant
              </a>
              <a
                href={applicantData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-colors duration-300"
              >
                <Download className="h-5 w-5 mr-2" />
                View Resume
              </a>
            </div>
          </div>
        </header>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Applicant core details (original preserved and enhanced) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary Cards */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="text-xs text-gray-500 mb-1">Applicant</div>
                <div className="flex items-center">
                  <User className="h-5 w-5 text-indigo-500 mr-2" />
                  <span className="font-semibold text-gray-900">{applicantData.name}</span>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="text-xs text-gray-500 mb-1">Role</div>
                <div className="flex items-center">
                  <ClipboardList className="h-5 w-5 text-indigo-500 mr-2" />
                  <span className="font-semibold text-gray-900">{applicantData.position}</span>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="text-xs text-gray-500 mb-1">Applied On</div>
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 text-indigo-500 mr-2" />
                  <span className="font-semibold text-gray-900">{applicantData.createdAt ? new Date(applicantData.createdAt).toLocaleDateString() : '-'}</span>
                </div>
              </div>
            </section>

            {/* Original details section (kept intact inside a styled card) */}
            <section className="bg-white rounded-xl shadow-md overflow-hidden w-full">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <User className="h-6 w-6 text-indigo-500" />
                  <h3 className="text-xl font-semibold text-gray-800 ml-3">Applicant Details</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="text-indigo-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Email Address</p>
                      <p className="text-md text-indigo-600">{applicantData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="text-indigo-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Contact Number</p>
                      <p className="text-md text-gray-900">{applicantData.contact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Activity Timeline (static placeholders, non-breaking) */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <Building2 className="h-6 w-6 text-indigo-500" />
                <h3 className="text-xl font-semibold text-gray-800 ml-3">Activity Timeline</h3>
              </div>
              <ol className="relative border-s border-gray-200 ml-3">
                <li className="mb-6 ms-6">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 ring-8 ring-white">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                  </span>
                  <h4 className="text-sm font-semibold text-gray-900">Application received</h4>
                  <p className="text-sm text-gray-500">{prettyDate}</p>
                </li>
                <li className="mb-6 ms-6">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                    <FileText className="h-4 w-4 text-gray-600" />
                  </span>
                  <h4 className="text-sm font-semibold text-gray-900">Resume reviewed</h4>
                  <p className="text-sm text-gray-500">Awaiting decision</p>
                </li>
              </ol>
            </section>
          </div>

          {/* Right: Notes and metadata */}
          <aside className="space-y-8">
            {/* Quick Actions card */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h3>
              <div className="flex flex-col gap-2">
                <a
                  href={`mailto:${applicantData.email}`}
                  className="inline-flex items-center justify-center px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </a>
                <a
                  href={applicantData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Open Resume (PDF)
                </a>
              </div>
            </section>

            {/* Admin Notes (local-only, does not touch data) */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Admin Notes</h3>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add private notes for the review process..."
                rows={6}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => window.alert('Notes saved locally (demo).')}
                  className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-black"
                >
                  Save Notes
                </button>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
