const Project = require('../models/projectInfo');

//function for rendering list of projects ==> Beofre db is implemented
// const home = (req, res)=> {
//     res.render('home', {projects});
// };

//function for rendering list of projects ==> After db is implemented
const home = async function(req, res){
    try{
        const projects = await Project.find();
        res.render('home', {projects});
    }
    catch(error){
        console.error('Error fetching projects:', error);
        res.status(500).send('Internal Server Error');
    }
};


// function for create project
// const create  = (req, res)=>{
//     console.log("We are in the create project form");
//     const {name, description, author}= req.body;
//     console.log(req.body);   
//     const newProject = {id: projects.length+1, name,description,author};
//     projects.push(newProject);
//     res.redirect('/');

// };

const create = async (req, res) => {
    try {
      console.log('We are in the create project form');
      const { name, description, author } = req.body;
  
      // Create a new project instance
      const newProject = new Project({ name, description, author });
  
      // Save the project to the database
      await newProject.save();
  
      res.redirect('/');
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  
module.exports={
    home,
    create
};