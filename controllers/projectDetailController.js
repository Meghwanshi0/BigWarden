const Project = require('../models/projectInfo');
const Issue = require('../models/issueInfo');

// Function to show project details==> without db
// const showDetails = (req, res) => {
//   const projectId = parseInt(req.params.projectId);
//     //P object in projects array will search for projectId which is specified and find() will return that object P
//   const project = projects.find((p) => p.id === projectId);

//   if (!project) {
//     res.status(404).send('Project not found, Please check again or create new');
//     return;
//   }

//   const issues = project.issues;

//   res.render('projectDetails', { project, issues });
// };


// Function to show project details==> with db
const showDetails = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    // Find project by ID in the database
    const project = await Project.findById(projectId);

    if (!project) {
      res.status(404).send('Project not found, Please check again or create new');
      return;
    }

    const issues = project.issues || [];

    res.render('projectDetails', { project, issues });
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to filter issues by labels, author, and search
const filter = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const { labels, author, searchTerm } = req.body;

    // console.log('Labels:', labels);
    // console.log('Author:', author);
    // console.log('Search Term:', searchTerm);

    // Find project by ID in the database
    const project = await Project.findById(projectId);

    if (!project) {
      res.status(404).send('Project not found, Please check again or create new');
      return;
    }

    const issues = project.issues || [];

    // Ensure labels is an array
    const selectedLabels = Array.isArray(labels) ? labels : [labels];

    // Filter issues based on labels
    const filteredIssues = issues.filter((issue) => {
      return selectedLabels.length === 0 || selectedLabels.some((label) => issue.labels.includes(label));
    });

    // Filter issues based on author (case-insensitive)
    const authorFilteredIssues = filteredIssues.filter((issue) => {
      return !author || issue.author.toLowerCase().includes(author.toLowerCase());
    });

    // Filter issues based on search term (case-insensitive)
    const searchTermFilteredIssues = authorFilteredIssues.filter((issue) => {
      return !searchTerm ||
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // console.log('Filtered Issues:', searchTermFilteredIssues);

    res.render('projectDetails', { project, issues: searchTermFilteredIssues });
  } catch (error) {
    console.error('Error filtering issues:', error);
    res.status(500).send('Internal Server Error');
  }
};


// Function to create a new issue
const createIssue = async (req, res) => {
  try {
    // console.log('We are in the create issue form');
    const { title, description, author, labels } = req.body;

    // Convert labels to an array if it's not already
    const labelsArray = Array.isArray(labels) ? labels : [labels];

    const newIssue = new Issue({ title, description, author, labels: labelsArray });

    const projectId = req.params.projectId;

    // Save the issue to the Issue schema
    await newIssue.save();

    // Find the project by ID and update its issues array
    const project = await Project.findByIdAndUpdate(projectId, { $push: { issues: newIssue } }, { new: true });

    res.render('projectDetails', { project, issues: project.issues });
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  showDetails,
  filter,
  createIssue
};
