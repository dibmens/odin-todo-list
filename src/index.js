import _ from 'lodash';
import './style.css';
import loadLandingPage from './landingPage';
import Project, { activeProjects, fetchProjects, getActiveProjects, storeProjects } from './userProjects';
import loadProjectPage from './projectPage';

 
loadProjectPage();

// window.store = storeProjects();
// window.fetch = fetchProjects();
// window.ass = "OY";

// window.proj = getActiveProjects();
// window.store = storeProjects();

