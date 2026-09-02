// Mock data for the frontend.
// The Spring Boot backend is not built yet, so the app shows this sample
// data to keep every page working. When the API is ready we will replace
// these with real axios calls.

export const departments = [
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Electrical',
  'Business Administration',
];

// sample alumni shown in the directory
export const alumni = [
  {
    id: 1,
    name: 'Kamleshwar Reddy',
    role: 'Software Engineer',
    company: 'Google',
    location: 'Hyderabad',
    batch: 2019,
    degree: 'B.Tech Computer Science',
    department: 'Computer Science',
    linkedin: '@kamleshwar',
    verified: true,
    skills: ['Java', 'React', 'Spring Boot', 'MySQL'],
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Data Scientist',
    company: 'Microsoft',
    location: 'Bangalore',
    batch: 2018,
    degree: 'M.Tech Data Science',
    department: 'Computer Science',
    linkedin: '@priyasharma',
    verified: true,
    skills: ['Python', 'Machine Learning', 'SQL'],
  },
  {
    id: 3,
    name: 'Arjun Nair',
    role: 'Mechanical Engineer',
    company: 'Tata Motors',
    location: 'Pune',
    batch: 2017,
    degree: 'B.Tech Mechanical',
    department: 'Mechanical',
    linkedin: '@arjunnair',
    verified: false,
    skills: ['CAD', 'SolidWorks', 'ANSYS'],
  },
  {
    id: 4,
    name: 'Sneha Kulkarni',
    role: 'Product Manager',
    company: 'Amazon',
    location: 'Chennai',
    batch: 2016,
    degree: 'MBA',
    department: 'Business Administration',
    linkedin: '@snehak',
    verified: true,
    skills: ['Product Strategy', 'Agile', 'Analytics'],
  },
  {
    id: 5,
    name: 'Rahul Verma',
    role: 'Frontend Developer',
    company: 'Flipkart',
    location: 'Bangalore',
    batch: 2020,
    degree: 'B.Tech Computer Science',
    department: 'Computer Science',
    linkedin: '@rahulverma',
    verified: true,
    skills: ['JavaScript', 'React', 'CSS'],
  },
  {
    id: 6,
    name: 'Divya Menon',
    role: 'Electrical Engineer',
    company: 'ABB',
    location: 'Delhi',
    batch: 2019,
    degree: 'B.Tech Electrical',
    department: 'Electrical',
    linkedin: '@divyamenon',
    verified: false,
    skills: ['PLC', 'SCADA', 'MATLAB'],
  },
];

// sample job / internship opportunities posted by alumni
export const opportunities = [
  {
    id: 1,
    title: 'Software Engineer Intern',
    type: 'Internship',
    company: 'Google',
    location: 'Hyderabad',
    postedBy: 'Kamleshwar Reddy',
    addedOn: '2026-08-20',
    description: 'Looking for a motivated intern who knows Java and basic web development.',
    skills: ['Java', 'React', 'MySQL'],
  },
  {
    id: 2,
    title: 'Junior Data Analyst',
    type: 'Full Time',
    company: 'Microsoft',
    location: 'Bangalore',
    postedBy: 'Priya Sharma',
    addedOn: '2026-08-25',
    description: 'Entry level role for graduates who enjoy working with data and reports.',
    skills: ['Python', 'Excel', 'SQL'],
  },
  {
    id: 3,
    title: 'Frontend Developer',
    type: 'Full Time',
    company: 'Flipkart',
    location: 'Bangalore',
    postedBy: 'Rahul Verma',
    addedOn: '2026-08-28',
    description: 'Good opportunity for someone who loves building clean user interfaces.',
    skills: ['JavaScript', 'React', 'CSS'],
  },
  {
    id: 4,
    title: 'Production Trainee',
    type: 'Internship',
    company: 'Tata Motors',
    location: 'Pune',
    postedBy: 'Arjun Nair',
    addedOn: '2026-08-18',
    description: 'For mechanical students who want hands on experience in a plant environment.',
    skills: ['CAD', 'Production'],
  },
];

// alumni events
export const events = [
  {
    id: 1,
    name: 'Alumni Meet 2026',
    date: '2026-10-15',
    time: '5:00 PM',
    venue: 'Main Auditorium',
    type: 'Offline',
    organizer: 'Alumni Association',
    about: 'Annual get together of old students and current students to network and share experiences.',
    registered: 120,
  },
  {
    id: 2,
    name: 'Resume Building Workshop',
    date: '2026-09-10',
    time: '11:00 AM',
    venue: 'Online (Google Meet)',
    type: 'Online',
    organizer: 'Sneha Kulkarni',
    about: 'Learn how to write a good resume that gets shortlisted by recruiters.',
    registered: 85,
  },
  {
    id: 3,
    name: 'Tech Talk: AI in Industry',
    date: '2026-11-05',
    time: '4:00 PM',
    venue: 'Seminar Hall',
    type: 'Offline',
    organizer: 'Priya Sharma',
    about: 'A talk on how artificial intelligence is being used in the industry today.',
    registered: 200,
  },
  {
    id: 4,
    name: 'Career Guidance Session',
    date: '2026-09-25',
    time: '10:00 AM',
    venue: 'Online (Zoom)',
    type: 'Online',
    organizer: 'Alumni Association',
    about: 'Seniors sharing tips on choosing the right career path after college.',
    registered: 150,
  },
];

// sample connections (already connected people)
export const connections = [
  { id: 1, name: 'Priya Sharma', role: 'Data Scientist', company: 'Microsoft' },
  { id: 2, name: 'Rahul Verma', role: 'Frontend Developer', company: 'Flipkart' },
  { id: 3, name: 'Sneha Kulkarni', role: 'Product Manager', company: 'Amazon' },
];

// incoming connection requests (for demo)
export const connectionRequests = [
  { id: 1, name: 'Divya Menon', role: 'Electrical Engineer', company: 'ABB', fromMe: false },
  { id: 2, name: 'Arjun Nair', role: 'Mechanical Engineer', company: 'Tata Motors', fromMe: false },
];

// mentorship requests
export const mentorshipRequests = [
  { id: 1, from: 'Ravi Kumar', fromRole: 'Student', status: 'Pending' },
  { id: 2, from: 'Meena Iyer', fromRole: 'Student', status: 'Accepted' },
];

// notifications
export const notifications = [
  { id: 1, text: 'Priya Sharma accepted your connection request.', date: '2026-09-01' },
  { id: 2, text: 'New job opportunity posted: Junior Data Analyst', date: '2026-08-25' },
  { id: 3, text: 'You are registered for Resume Building Workshop', date: '2026-08-22' },
  { id: 4, text: 'Ravi Kumar sent you a mentorship request.', date: '2026-08-18' },
];

// users for the admin panel
export const users = [
  { id: 1, name: 'Kamleshwar Reddy', role: 'Alumni', status: 'Verified' },
  { id: 2, name: 'Priya Sharma', role: 'Alumni', status: 'Verified' },
  { id: 3, name: 'Arjun Nair', role: 'Alumni', status: 'Pending' },
  { id: 4, name: 'Divya Menon', role: 'Alumni', status: 'Pending' },
  { id: 5, name: 'Ravi Kumar', role: 'Student', status: 'Active' },
  { id: 6, name: 'Meena Iyer', role: 'Student', status: 'Active' },
];
