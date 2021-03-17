import { v4 as uuidv4 } from "uuid";

export const emptyBlock = {
  status: false,
  start: false,
  end: false,
  value: 0,
  blockId: uuidv4(),
  scheduleIndex: 0,
};

export const dMDummyData = {
  loading: false,
  data: [
    {
      rowId: "mil1",
      sortPosition: 0,
      type: 'milestone',
      description: "Description of milestone 1",
      scheduled: 5,
    },
    {
      rowId: "mil2",
      sortPosition: 1,
      type: 'milestone',
      description: "Description of milestone 2",
      scheduled: 8,
    },
    {
      rowId: "del3",
      sortPosition: 2,
      type: 'deliverable',
      description: "Description of deliverable 3",
      scheduled: 6,
    },
    {
      rowId: "del4",
      sortPosition: 3,
      type: 'deliverable',
      description: "Description of deliverable 4",
      scheduled: 2,
    },
  ],
  error: "",
};

export const singleMilOne = {
  rowId: "mil3",
  sortPosition: 0,
  type: 'milestone',
  description: "Description of milestone 3",
  scheduled: 5,
}

export const singleMilTwo = {
  rowId: "mil4",
  sortPosition: 0,
  type: 'milestone',
  description: "Description of milestone 4",
  scheduled: 5,
}