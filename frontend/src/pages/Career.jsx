import React, { useState, useEffect } from 'react';

// --- Helper Functions and Assets ---
// Since local assets aren't available, I'm using placeholders.
// You can replace these URLs with your actual image imports.
import logoImg from "../assets/Hero/hero-logo.png";

// --- SVG Icon Components (Unchanged) ---
const FileUploadIcon = () => (
    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SuccessIcon = () => (
    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
);

// --- Main Career Page Component ---
export default function App() {
    // State for form inputs (Unchanged)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        position: '',
    });
    const apiUrl = import.meta.env.VITE_API_URL;

    // Validation error state (Unchanged)
    const [errors, setErrors] = useState({});

    // State for the resume file name (Unchanged)
    const [fileName, setFileName] = useState('PDF up to 10MB');

    // State for modal visibility (Unchanged)
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handles changes in text inputs and select (Unchanged)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Validate inputs before submit (Unchanged)
    const validate = () => {
        const errs = {};
        if (!formData.name.trim()) errs.name = "Name is required";
        if (!formData.email.trim()) {
            errs.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errs.email = "Invalid email address";
        }
        if (!formData.contact.trim()) errs.contact = "Contact number is required";
        if (!formData.position) errs.position = "Please select a position";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    // Handles file selection for the resume with validation (Unchanged)
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // NOTE: Replaced alert with a custom modal or inline error for better UX in a real app.
            // Sticking to the original logic as requested.
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                alert("File size exceeds 10MB limit.");
                e.target.value = '';
                setFileName('PDF up to 10MB');
                return;
            }
            if (file.type !== "application/pdf") {
                alert("Only PDF files are allowed.");
                e.target.value = '';
                setFileName('PDF up to 10MB');
                return;
            }
            setFileName(file.name);
        } else {
            setFileName('PDF up to 10MB');
        }
    };

    // Handles form submission (Unchanged)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const form = new FormData();
        form.append('name', formData.name);
        form.append('email', formData.email);
        form.append('contact', formData.contact);
        form.append('position', formData.position);

        const fileInput = document.getElementById('resume');
        if (fileInput && fileInput.files[0]) {
            form.append('resume', fileInput.files[0]);
        } else {
            alert('Please upload a resume file.');
            return;
        }

        try {
            const res = await fetch(`${apiUrl}/api/applications`, {
                method: 'POST',
                body: form,
            });

            if (res.ok) {
                setIsModalOpen(true);
            } else {
                const errData = await res.json();
                alert(errData.message || 'Submission failed.');
            }
        } catch (err) {
            console.error('Submit error:', err);
            alert('Something went wrong.');
        }
    };


    // Closes the modal and resets the form (Unchanged)
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({ name: '', email: '', contact: '', position: '' });
        setFileName('PDF up to 10MB');
        // Ensure the file input is cleared
        const fileInput = document.getElementById('resume');
        if (fileInput) fileInput.value = '';
        setErrors({});
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {/* Added a style tag for custom animations, including the new bounce effect */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.7s ease-out forwards;
                }
                
                /* New animation for the SVG elements */
                @keyframes gentleBounce {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-6px); }
                }
                .animate-gentleBounce {
                  animation: gentleBounce 4s ease-in-out infinite;
                }
            `}</style>

            {/* Header with blur effect removed */}
            <header className="bg-white/10 shadow-md sticky top-0 z-20">
                <div className=" container mx-auto px-6 py-3">
                    <div className="relative flex justify-between items-center w-full">
                        <a href="/">
                            <img
                                src={logoImg}
                                alt="YourCompany Logo"
                                className="h-12 sm:h-14 md:h-16 object-contain"
                            />
                        </a>
                        <span className=" mr-40 text-lg sm:text-xl md:text-4xl font-semibold text-white tracking-wide">
                            Careers
                        </span>
                    </div>
                </div>
            </header>

            {/* Main content with a subtle gradient background */}
            <main className="bg-gradient-to-br from-slate-50 to-blue-100 text-gray-800 font-sans">
                <div className="container mx-auto px-6 py-12 md:py-20">
                    {/* Added animation to the main grid */}
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center animate-fadeInUp">

                        {/* Left Column: Form with enhanced card styling */}
                        <div className="bg-white/70 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-2xl ring-1 ring-gray-900/5">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 tracking-tight">Work with us</h1>
                            <p className="text-gray-600 mb-8">
                                We're looking for talented people to join our team. Fill out the form below to apply.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        aria-describedby="name-error"
                                        required
                                        className={`w-full px-4 py-3 border rounded-lg bg-white/50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${errors.name ? 'border-red-500 ring-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder=""
                                    />
                                    {errors.name && <p id="name-error" className="text-red-600 text-sm mt-1">{errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        aria-describedby="email-error"
                                        required
                                        className={`w-full px-4 py-3 border rounded-lg bg-white/50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${errors.email ? 'border-red-500 ring-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder=""
                                    />
                                    {errors.email && <p id="email-error" className="text-red-600 text-sm mt-1">{errors.email}</p>}
                                </div>

                                {/* Contact Number */}
                                <div>
                                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="contact"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleInputChange}
                                        aria-describedby="contact-error"
                                        required
                                        className={`w-full px-4 py-3 border rounded-lg bg-white/50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${errors.contact ? 'border-red-500 ring-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder=""
                                    />
                                    {errors.contact && <p id="contact-error" className="text-red-600 text-sm mt-1">{errors.contact}</p>}
                                </div>

                                {/* Position Dropdown */}
                                <div>
                                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                                        Position
                                    </label>
                                    <select
                                        id="position"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleInputChange}
                                        aria-describedby="position-error"
                                        required
                                        className={`w-full px-4 py-3 border rounded-lg bg-white/50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${errors.position ? 'border-red-500 ring-red-500' : 'border-gray-300'
                                            }`}
                                    >
                                        <option value="" disabled>Select a position</option>
                                        <option value="software-engineer">Software Engineer</option>
                                        <option value="product-manager">Product Manager</option>
                                        <option value="ux-designer">UI/UX Designer</option>
                                        <option value="data-scientist">Data Scientist</option>
                                        <option value="marketing-specialist">Marketing Specialist</option>
                                    </select>
                                    {errors.position && <p id="position-error" className="text-red-600 text-sm mt-1">{errors.position}</p>}
                                </div>

                                {/* Resume Upload with enhanced hover effects */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Upload Resume
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors duration-300">
                                        <div className="space-y-1 text-center">
                                            <FileUploadIcon />
                                            <div className="flex text-sm text-gray-600 items-center">
                                                <label
                                                    htmlFor="resume"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-3 py-1.5"
                                                >
                                                    <span>Upload a file</span>
                                                    <input id="resume" name="resume" type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} />
                                                </label>
                                                <p className="pl-2 truncate max-w-[150px] sm:max-w-xs">{fileName}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button with gradient and hover effects */}
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                                    >
                                        Submit Application
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right Column: Animated Form Filling Illustration */}
                        <div className="hidden lg:flex justify-center items-center p-6">
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg">
                                <g transform="translate(100 100)">
                                    {/* Background shapes (kept static) */}
                                    <path d="M60.6,-52.8C75.8,-38.3,83.4,-19.1,83.2,-0.2C83,18.8,75.1,37.6,61.8,49.2C48.5,60.8,30,65.2,12.3,66.1C-5.3,67,-22.1,64.4,-37.9,56.5C-53.7,48.6,-68.5,35.4,-74.5,19.1C-80.5,2.8,-77.7,-16.6,-68.3,-32.2C-58.9,-47.8,-42.9,-59.6,-26.8,-65.7C-10.7,-71.8,-5.3,-72.2,2.4,-70.1C10.1,-68,20.2,-62.4,32.3,-60.1C44.4,-57.8,58.5,-59.2,60.6,-52.8Z" fill="#DBEAFE"></path>

                                    {/* Grouping the form and pencil to apply the bounce animation */}
                                    <g className="animate-gentleBounce">
                                        {/* Main form element */}
                                        <rect x="-60" y="-75" width="120" height="150" rx="15" fill="#FFFFFF" stroke="#BFDBFE" strokeWidth="2"></rect>
                                        <rect x="-50" y="-65" width="100" height="10" rx="5" fill="#EFF6FF"></rect>
                                        <rect x="-50" y="-45" width="100" height="10" rx="5" fill="#EFF6FF"></rect>
                                        <rect x="-50" y="-25" width="60" height="10" rx="5" fill="#EFF6FF"></rect>

                                        {/* Checkboxes */}
                                        <rect x="-50" y="5" width="10" height="10" rx="3" fill="#EFF6FF"></rect>
                                        <rect x="-35" y="5" width="40" height="10" rx="5" fill="#EFF6FF"></rect>
                                        <rect x="-50" y="25" width="10" height="10" rx="3" fill="#60A5FA"></rect>
                                        <rect x="-35" y="25" width="50" height="10" rx="5" fill="#EFF6FF"></rect>

                                        {/* Submit button */}
                                        <rect x="-30" y="50" width="60" height="15" rx="7.5" fill="#3B82F6"></rect>

                                        {/* Pencil/Stylus element */}
                                        <g transform="translate(40, -10) rotate(45)">
                                            <rect x="-5" y="-40" width="10" height="50" rx="5" fill="#60A5FA"></rect>
                                            <path d="M -5 10 L 5 10 L 0 20 Z" fill="#1E40AF"></path>
                                            <rect x="-5" y="-45" width="10" height="5" rx="2.5" fill="#BFDBFE"></rect>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </main>

            {/* Success Message Modal with transition */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm mx-auto transform transition-all duration-300 scale-100">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                            <SuccessIcon />
                        </div>
                        <h3 id="modal-title" className="text-lg leading-6 font-medium text-gray-900 mt-4">
                            Application Sent!
                        </h3>
                        <div className="mt-2 px-7 py-3">
                            <p className="text-sm text-gray-500">
                                Thank you for your interest. We have received your application and will get back to you soon.
                            </p>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={handleCloseModal}
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                autoFocus
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
