import moment from "moment";

export const projectData = {
  loading: false,
  data: {
    productPlatformName: 'productPlatformName',
    applicationNumber: '123445',
    nature: 'nature',
    protection: 'protection',
    projectName: "first Project",
    projectLength: 20,
    ProjectStart: "Feb 2021",
    projectManager: 'projectManager',
    software: 'software',
    funding: 'funding',
    ganttRef: 'ganttRef',
    competitor:'competitor',
    dates: [], // array of sequential months
  },
  error: "",
};
// console.log(projectData.data.dates);

const month = "Feb";
const year = 2021;

const projectStart = moment(`${month} ${year}`, "MMM YYYY");
const dateArray = () => {
  const years = [];
  const dateStart = projectStart;
  for (let i = 0; i < projectData.data.projectLength; i++) {
    years.push(dateStart.format("MMM YYYY"));
    dateStart.add(1, "month");
   }
  return years;
};

const dateList = dateArray();
projectData.data.dates = dateList;
// console.log(dateList);
