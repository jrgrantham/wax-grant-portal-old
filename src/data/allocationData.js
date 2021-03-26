import { v4 as uuidv4 } from "uuid";

export const allocationData = {
  loading: false,
  data: [
    {
      allocationId: 1,
      taskId: "task1",
      personId: 1,
      percent: 40,
    },
    {
      allocationId: 2,
      taskId: "task1",
      personId: 2,
      percent: 50,
    },
    {
      allocationId: 3,
      taskId: "task1",
      personId: 3,
      percent: 10,
    },
    {
      allocationId: 4,
      taskId: "task2",
      personId: 1,
      percent: 40,
    },
    {
      allocationId: 5,
      taskId: "task2",
      personId: 2,
      percent: 40,
    },
    {
      allocationId: 6,
      taskId: "task2",
      personId: 3,
      percent: 40,
    },
    {
      allocationId: 7,
      taskId: "task3",
      personId: 1,
      percent: 40,
    },
    {
      allocationId: 8,
      taskId: "task3",
      personId: 3,
      percent: 90,
    },
  ],
  error: "",
};
