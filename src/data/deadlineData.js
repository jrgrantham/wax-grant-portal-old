import { v4 as uuidv4 } from "uuid";

export const emptyBlock = {
  status: false,
  start: false,
  end: false,
  value: 0,
  blockId: uuidv4(),
  scheduleIndex: 0,
};

export const deadlineData = {
  loading: false,
  data: [
    {
      deadlineId: "del3",
      sortPosition: 2,
      type: "deliverable",
      description: "Description of deliverable 3",
      scheduled: 6,
    },
    {
      deadlineId: "del4",
      sortPosition: 3,
      type: "deliverable",
      description: "Description of deliverable 4",
      scheduled: 2,
    },
    {
      deadlineId: "mil1",
      sortPosition: 0,
      type: "milestone",
      description: "Description of milestone 1",
      scheduled: 5,
    },
    {
      deadlineId: "mil2",
      sortPosition: 1,
      type: "milestone",
      description: "Description of milestone 2",
      scheduled: 8,
    },
  ],
  error: "",
};

export const singleMilOne = {
  deadlineId: "mil3",
  sortPosition: 0,
  type: "milestone",
  description: "Description of milestone 3",
  scheduled: 5,
};

export const singleMilTwo = {
  deadlineId: "mil4",
  sortPosition: 0,
  type: "milestone",
  description: "Description of milestone 4",
  scheduled: 5,
};
