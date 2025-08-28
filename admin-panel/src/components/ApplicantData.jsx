import React, { useState, useEffect } from 'react';
import { Mail, Phone, User, Download, Briefcase, ArrowLeft } from 'lucide-react';

// In a real application, you would likely have a shared file for this data
// or fetch it from an API. For this example, we'll keep it here to simulate
// a database of all applicants.
const allApplicants = [
  { _id: '64e8a1', name: 'Alice Johnson', email: 'alice.j@example.com', contact: '111-222-3333', position: 'UX/UI Designer', resumeUrl: '/resumes/alice.pdf', createdAt: '2024-08-26T10:00:00Z' },
  { _id: '64e8a2', name: 'Bob Williams', email: 'bob.w@example.com', contact: '222-333-4444', position: 'Backend Developer', resumeUrl: '/resumes/bob.pdf', createdAt: '2024-08-26T11:30:00Z' },
  { _id: '64e8a3', name: 'Charlie Brown', email: 'charlie.b@example.com', contact: '333-444-5555', position: 'Project Manager', resumeUrl: '/resumes/charlie.pdf', createdAt: '2024-08-25T09:15:00Z' },
  { _id: '64e8a9b4f3d1b2c3d4e5f6a7', name: 'John Smith', email: 'john.smith@example.com', contact: '+1 (555) 987-6543', position: 'Senior Frontend Developer', resumeUrl: '/path/to/john_smith_resume.pdf', createdAt: '2024-08-27T09:00:00Z' },
];


// --- Helper Components ---

const InfoCard = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden w-full transition-shadow duration-300 hover:shadow-lg">
    <div className="p-6">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-gray-800 ml-3">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 text-indigo-500">{icon}</div>
    <div className="ml-4">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-md text-gray-900">{value}</p>
    </div>
  </div>
);


// --- Main Applicant Data Component ---

export default function ApplicantData() {
  // In a real application with React Router, you would get the ID from the URL like this:
  // import { useParams } from 'react-router-dom';
  // const { applicantId } = useParams();
  // For this example, we'll hardcode an ID to simulate this.
  const applicantId = '64e8a9b4f3d1b2c3d4e5f6a7';

  const [applicantData, setApplicantData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This simulates fetching data from an API.
    setIsLoading(true);
    const fetchData = () => {
      const data = allApplicants.find(app => app._id === applicantId);
      setApplicantData(data);
      setIsLoading(false);
    };

    // Simulate network delay
    const timer = setTimeout(fetchData, 500);
    return () => clearTimeout(timer);
  }, [applicantId]);

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading applicant data...</div>;
  }

  if (!applicantData) {
    return <div className="p-8 text-center text-red-500">Applicant not found.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <main className="p-4 sm:p-6 lg:p-8">
        {/* Back Button */}
        <div className="mb-6">
            <button 
                onClick={() => alert('Navigate back to the application list')}
                className="flex items-center text-sm font-semibold text-gray-600 hover:text-gray-900"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Applications
            </button>
        </div>

        {/* Header Section */}
        <header className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{applicantData.name}</h1>
              <p className="text-lg text-indigo-600 font-semibold mt-1">
                Applied for: {applicantData.position}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Application Submitted: {new Date(applicantData.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
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

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto">
            <InfoCard title="Applicant Details" icon={<User className="h-6 w-6 text-indigo-500" />}>
              <InfoItem icon={<Mail size={20} />} label="Email Address" value={<a href={`mailto:${applicantData.email}`} className="text-indigo-600 hover:underline">{applicantData.email}</a>} />
              <InfoItem icon={<Phone size={20} />} label="Contact Number" value={applicantData.contact} />
            </InfoCard>
        </div>
      </main>
    </div>
  );
}
