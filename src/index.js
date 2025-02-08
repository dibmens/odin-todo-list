import _ from 'lodash';
import './style.css';
import loadLandingPage from './landingPage';
import loadProjectPage, { loadTasks, sortByTime } from './projectPage';

// loadLandingPage();
loadProjectPage();
loadTasks();
sortByTime();