// projectDetailController.js

const projects = [
    {id:1, name: 'FirstProject', description: 'Description 1',issues:[
        {title: 'Issue 1',description:'Issue description 1', author: 'Hemant',labels :['Bug','Design'] }
    ], author: 'Author 1'},
    {id:2, name: 'SecondProject', description: 'Description 2',issues:[], author: 'Author 2'},
    {id:3, name: 'ThirdProject', description: 'Description 3',issues:[], author: 'Author 3'},
    {id:4, name: 'FourthProject', description: 'Description 4',issues:[], author: 'Author 4'}
];

// Function to show project details
const showDetails = (req, res) => {
  const projectId = parseInt(req.params.projectId);
    //P object in projects array will search for projectId which is specified and find() will return that object P
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    res.status(404).send('Project not found, Please check again or create new');
    return;
  }

  const issues = project.issues;

  res.render('projectDetails', { project, issues });
};

// Function to filter issues by labels, author, and search
const filter = (req, res) => {
  const projectId = parseInt(req.params.projectId);
  const { labels, author, searchTerm } = req.body;

  console.log('Labels:', labels);
  console.log('Author:', author);
  console.log('Search Term:', searchTerm);

  const issues = projects.find((p) => p.id === projectId).issues || [];

  // Ensure labels is an array
  const selectedLabels = Array.isArray(labels) ? labels : [labels];

  const filteredIssues = issues.filter((issue) => {
    // Check if at least one selected label is included in the issue's labels
    const hasLabels = selectedLabels.length === 0 || selectedLabels.some((label) => issue.labels.includes(label));

    // Check if the author matches the specified author (case-insensitive)
    const isAuthorMatch = !author || (() => {
      const lowerCaseIssueAuthor = issue.author.toLowerCase();
      const lowerCaseInputAuthor = author.toLowerCase();
      console.log('Comparing:', lowerCaseIssueAuthor, lowerCaseInputAuthor);
      return lowerCaseIssueAuthor === lowerCaseInputAuthor;
    })();
    
    

    // Check if the title or description contains the specified search term (case-insensitive)
    const isSearchMatch =
      !searchTerm ||
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Return true if at least one condition is satisfied
    return hasLabels && isAuthorMatch && isSearchMatch;
  });

  console.log('Filtered Issues:', filteredIssues);

  res.render('projectDetails', { project: projects.find((p) => p.id === projectId), issues: filteredIssues });
};



  
// Function to create a new issue
const createIssue = (req, res) => {
    console.log("We are in the create issue form");
    const {title, description, author,labels}= req.body;
    const newIssue = { title, description, author, labels: Array.isArray(labels) ? labels : [labels] };
    console.log(newIssue);
    const projectId = parseInt(req.params.projectId);
    const project = projects.find((p) => p.id === projectId);
    const issues = project.issues;
    issues.push(newIssue);
    console.log(issues); 
    
  res.render('projectDetails', {project,issues});
};

module.exports = {
  showDetails,
  filter,
  createIssue,
};
