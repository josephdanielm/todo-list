import Project from './project.js';

const projects = [];

export function createProject(name) {
    const newProject = new Project(name);
    projects.push(newProject);
    console.log(`Project "${name}" created.`);
    return newProject;
}

export function deleteProject(project) {
    const index = projects.indexOf(project);
    if (index !== -1) {
        projects.splice(index, 1);
    }
    console.log(`Project "${project.name}" deleted.`);
}

export function getAllProjects() {
    return projects;
}

export function getProjectByName(name) {
    return projects.find(project => project.name === name);
}