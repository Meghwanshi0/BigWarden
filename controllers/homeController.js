const projects = [
    {id:1, name: 'FirstProject', description: 'Description 1',issues:[], author: 'Author 1'},
    {id:2, name: 'SecondProject', description: 'Description 2',issues:[], author: 'Author 2'},
    {id:3, name: 'ThirdProject', description: 'Description 3',issues:[], author: 'Author 3'},
    {id:4, name: 'FourthProject', description: 'Description 4',issues:[], author: 'Author 4'}
];

//function for rendering list of projects
const home = (req, res)=> {
    res.render('home', {projects});
};

// function for create project
const create  = (req, res)=>{
    console.log("We are in the create project form");
    const {name, description, author}= req.body;
    console.log(req.body);   
    const newProject = {id: projects.length+1, name,description,author};
    projects.push(newProject);
    res.redirect('/');

};
module.exports={
    home,
    create
};