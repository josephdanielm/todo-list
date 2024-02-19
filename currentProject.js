import { getAllProjects } from "./projectService";

let currentProject = null;

export function setCurrentProject(project) {
    const projects = getAllProjects();
    projects.filter(projectItem => projectItem.active === true).forEach(project => {
        project.active = false;
    });

    currentProject = project;
    project.active = true;
    console.log(`${project.name}`, `${project.active}`);
}

export function getCurrentProject() {
    return currentProject;
}
