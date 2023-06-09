
const { v4: uuidv4 } = require('uuid');
const { getAllProjects, getOneProject, addProject, updateProject, deleteProject } = require('../controllers/projects.controllers');


const multer = require('multer');
const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});






  module.exports = (app) => {
    app.get('/api/projects', getAllProjects);
    app.get('/api/projects/:id', getOneProject);
    app.post('/api/projects',upload.single('picturePath'), addProject);
    app.put('/api/projects/:id', upload.single('picturePath'), updateProject);
    app.delete('/api/projects/:id', deleteProject);
    
  };
  