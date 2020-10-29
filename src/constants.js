export const TODO_TYPES = ["Quest", "Training"];
export const TODO_INDEXES = {
  Quest: 0,
  Training: 1,
};

export const TIME_TICK = 60000;

export const SAMPLE_TODO = {
  content: "Add some TODOs! :)",
  date: new Date(),
  type: 0, // 0 - quest, 1 - training
  skillReq: {
    skill: -1, // -1 daca n-are
    level: 0,
  },
  skillReward: {
    skill: -1,
    level: 0,
  },
  xpReward: 0,
  timeLimit: 0,
  completed: false, 
  expired: false,
  sentExpireWarning: false
};

export const SAMPLE_SKILL = {
  name: "Guitar",
  level: 0,
};

export const NO_FILTER = () => true;

export const SAMPLE_DISPLAY = {
  modalOpen: false,
  separateDisplay: false,
  viewCompleted: false,
  questsFirst: true,
  nightMode: false,
  searchString: ""
}