import moment from "moment";

export const projectData = {
  loading: false,
  data: {
    projectTitle: "first Project",
    projectLength: 20,
    resources: ["JG", "DJ", "CG"],
    startDate: "Feb 2021",
    dates: [],
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
    // console.log(dateStart); // WTF
    years.push(dateStart.format("MMM YYYY"));
    dateStart.add(1, "month");
   }
  return years;
};

const dateList = dateArray();
projectData.data.dates = dateList;
// console.log(dateList);
