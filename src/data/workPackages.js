import { v4 as uuidv4 } from "uuid";

export const emptyBlock = {
  status: false,
  start: false,
  end: false,
  barNumber: 0,
  value: 0,
  blockId: uuidv4(),
  scheduleIndex: 0,
};

export const workPackages = {
  loading: false,
  data: [
    {
      rowId: "ganttRow1",
      workPackageTitle: "Project Management",
      description: "Description of task 1",
      days: 30,
      dayLoading: "front",
      sortPosition: 1,
      resources: [
        { name: "JG", workLoad: 0.1 },
        { name: "DJ", workLoad: 0.2 },
        { name: "CG", workLoad: 0.2 },
      ],
      schedule: [
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: true,
          start: true,
          end: false,
          barNumber: 1,
          value: 5,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: true,
          start: false,
          end: false,
          barNumber: 1,
          value: 5,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: true,
          start: false,
          end: false,
          barNumber: 1,
          value: 4,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: true,
          start: false,
          end: true,
          barNumber: 1,
          value: 4,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: true,
          start: true,
          end: false,
          barNumber: 2,
          value: 4,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: true,
          start: false,
          end: true,
          barNumber: 2,
          value: 4,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: true,
          start: true,
          end: true,
          barNumber: 3,
          value: 4,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
      ],
    },
    {
      rowId: "ganttRow2",
      workPackageTitle: "Project Management",
      description: "Description of task 2",
      days: 10,
      dayLoading: "front",
      sortPosition: 2,
      resources: [
        { name: "JG", workLoad: 0.1 },
        { name: "DJ", workLoad: 0.2 },
        { name: "CG", workLoad: 0.2 },
      ],
      schedule: [
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: true,
          start: true,
          end: false,
          barNumber: 1,
          value: 4,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: true,
          start: false,
          end: false,
          barNumber: 1,
          value: 3,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: true,
          start: false,
          end: true,
          barNumber: 1,
          value: 3,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
      ],
    },
    {
      rowId: "ganttRow3",
      workPackageTitle: "Different WP",
      description: "Description of task 3",
      days: 6,
      dayLoading: "front",
      sortPosition: 3,
      resources: [
        { name: "JG", workLoad: 0.1 },
        { name: "DJ", workLoad: 0.2 },
        { name: "CG", workLoad: 0.2 },
      ],
      schedule: [
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: true,
          start: true,
          end: false,
          barNumber: 1,
          value: 2,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: true,
          start: false,
          end: false,
          barNumber: 1,
          value: 2,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: true,
          start: false,
          end: true,
          barNumber: 1,
          value: 2,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
        {
          status: false,
          start: false,
          end: false,
          barNumber: 0,
          value: 0,
          blockId: uuidv4(),
          scheduleIndex: 0,
        },
      ],
    },
  ],
  error: "",
};
