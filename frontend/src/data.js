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

export const careerInterests = [
  'Software Development',
  'Data Science',
  'Product Management',
  'Mechanical Design',
  'Electrical Engineering',
  'Marketing',
  'Finance',
];

export const industries = [
  'IT Services',
  'Software Product',
  'Manufacturing',
  'Automotive',
  'Banking & Finance',
  'Healthcare',
  'Consulting',
];

// things alumni can help students with
export const helpOptions = [
  'Career Advice',
  'Resume Review',
  'Interview Preparation',
  'Job Shadowing',
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
    industry: 'IT Services',
    experience: 5,
    skills: ['Java', 'React', 'Spring Boot', 'MySQL'],
    about:
      'Backend developer who enjoys building clean APIs and mentoring juniors. Happy to help with your career in software.',
    helpWith: ['Career Advice', 'Resume Review', 'Interview Preparation', 'Job Shadowing'],
    mentorshipAvailable: true,
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
    industry: 'Software Product',
    experience: 6,
    skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
    about:
      'Data scientist working on machine learning products. I love talking about data careers and interviewing.',
    helpWith: ['Career Advice', 'Interview Preparation'],
    mentorshipAvailable: true,
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
    industry: 'Automotive',
    experience: 7,
    skills: ['CAD', 'SolidWorks', 'ANSYS'],
    about:
      'Mechanical design engineer in the automotive industry. Can guide you through mechanical careers.',
    helpWith: ['Career Advice', 'Job Shadowing'],
    mentorshipAvailable: true,
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
    industry: 'Software Product',
    experience: 8,
    skills: ['Product Strategy', 'Agile', 'Analytics', 'Communication'],
    about:
      'Product manager excited about mentoring people who want to move into tech product roles.',
    helpWith: ['Career Advice', 'Resume Review', 'Mock Interview'],
    mentorshipAvailable: true,
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
    industry: 'Software Product',
    experience: 4,
    skills: ['JavaScript', 'React', 'CSS', 'TypeScript'],
    about:
      'Frontend developer focused on user interfaces. Great with resume reviews and interview prep.',
    helpWith: ['Resume Review', 'Interview Preparation'],
    mentorshipAvailable: true,
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
    industry: 'Manufacturing',
    experience: 5,
    skills: ['PLC', 'SCADA', 'MATLAB'],
    about:
      'Electrical engineer working on industrial automation. Open to helping electrical students.',
    helpWith: ['Career Advice', 'Job Shadowing'],
    mentorshipAvailable: false,
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
    experience: 'Fresher',
    description:
      'Looking for a motivated intern who knows Java and basic web development. Great learning environment with a real project to own.',
    skills: ['Java', 'React', 'MySQL'],
    applications: 34,
  },
  {
    id: 2,
    title: 'Junior Data Analyst',
    type: 'Full Time',
    company: 'Microsoft',
    location: 'Bangalore',
    postedBy: 'Priya Sharma',
    addedOn: '2026-08-25',
    experience: '0-1 years',
    description:
      'Entry level role for graduates who enjoy working with data and building reports. Basic SQL and Python preferred.',
    skills: ['Python', 'Excel', 'SQL'],
    applications: 58,
  },
  {
    id: 3,
    title: 'Frontend Developer',
    type: 'Full Time',
    company: 'Flipkart',
    location: 'Bangalore',
    postedBy: 'Rahul Verma',
    addedOn: '2026-08-28',
    experience: '1-3 years',
    description:
      'Good opportunity for someone who loves building clean user interfaces with React. Work with a small friendly team.',
    skills: ['JavaScript', 'React', 'CSS'],
    applications: 41,
  },
  {
    id: 4,
    title: 'Production Trainee',
    type: 'Internship',
    company: 'Tata Motors',
    location: 'Pune',
    postedBy: 'Arjun Nair',
    addedOn: '2026-08-18',
    experience: 'Fresher',
    description:
      'For mechanical students who want hands on experience in a plant environment. Stipend and certification provided.',
    skills: ['CAD', 'Production'],
    applications: 22,
  },
];

// alumni events
export const events = [
  {
    id: 1,
    name: 'Alumni Networking Meetup',
    date: '2026-09-15',
    time: '10:00 AM',
    venue: 'College Auditorium',
    type: 'Offline',
    organizer: 'Alumni Association',
    about:
      'Annual get together of old students and current students to network, share experiences and grow your circle.',
    registered: 120,
    capacity: 250,
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
    capacity: 200,
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
    capacity: 300,
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
    capacity: 500,
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

// sample conversations for the messages page
export const conversations = [
  {
    id: 1,
    name: 'Rahul Kumar',
    role: 'Frontend Developer',
    last: 'Sure! Ask away.',
    messages: [
      { id: 1, sender: 'them', text: 'Hi! How can I help you?' },
      { id: 2, sender: 'me', text: 'Hello Rahul, I need career advice.' },
      { id: 3, sender: 'them', text: 'Sure! Ask away.' },
    ],
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Data Scientist',
    last: 'Send me your resume',
    messages: [
      { id: 1, sender: 'me', text: 'Can you review my resume?' },
      { id: 2, sender: 'them', text: 'Send me your resume' },
    ],
  },
  {
    id: 3,
    name: 'Arjun Nair',
    role: 'Mechanical Engineer',
    last: 'See you at the meetup!',
    messages: [
      { id: 1, sender: 'them', text: 'See you at the meetup!' },
    ],
  },
];

// notifications
export const notifications = [
  { id: 1, type: 'connection', text: 'Priya Sharma accepted your connection request.', date: '2026-09-01' },
  { id: 2, type: 'mentorship', text: 'Your mentorship request was accepted by Rahul Verma.', date: '2026-08-27' },
  { id: 3, type: 'job', text: 'New Java Developer opportunity posted.', date: '2026-08-25' },
  { id: 4, type: 'event', text: 'Alumni Networking Meetup starts in 2 days.', date: '2026-08-22' },
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

// admin activity + reports data
export const adminActivity = [
  { id: 1, text: 'New alumni registration: Divya Menon', time: '2 hours ago' },
  { id: 2, text: 'New event created: Tech Talk AI in Industry', time: '5 hours ago' },
  { id: 3, text: 'New job posted: Frontend Developer', time: '1 day ago' },
  { id: 4, text: 'Ravi Kumar applied for Software Engineer Intern', time: '2 days ago' },
];

export const reportData = {
  usersByRole: [
    { role: 'Students', value: 450, color: '#2563EB' },
    { role: 'Alumni', value: 280, color: '#7C3AED' },
    { role: 'Admins', value: 8, color: '#16A34A' },
  ],
  requestsByMonth: [
    { month: 'Mar', connections: 22, mentorship: 10 },
    { month: 'Apr', connections: 30, mentorship: 15 },
    { month: 'May', connections: 25, mentorship: 12 },
    { month: 'Jun', connections: 40, mentorship: 20 },
    { month: 'Jul', connections: 35, mentorship: 18 },
    { month: 'Aug', connections: 48, mentorship: 26 },
  ],
};
