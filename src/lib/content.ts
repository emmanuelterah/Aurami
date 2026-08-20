export type Capability = {
  id: string;
  title: string;
  desc: string;
  x: string;
  y: string;
};

export const capabilities: Capability[] = [
  {
    id: "vision",
    title: "Vision",
    desc: "See and understand the world around it.",
    x: "50%",
    y: "13%",
  },
  {
    id: "intelligence",
    title: "Intelligence",
    desc: "Understand instructions, context, and routines.",
    x: "63%",
    y: "24%",
  },
  {
    id: "hands",
    title: "Hands",
    desc: "Designed to manipulate objects with precision.",
    x: "34%",
    y: "50%",
  },
  {
    id: "learning",
    title: "Learning",
    desc: "Adapt to the way you live.",
    x: "52%",
    y: "46%",
  },
  {
    id: "movement",
    title: "Movement",
    desc: "Navigate real environments naturally.",
    x: "50%",
    y: "82%",
  },
];

export type Layer = {
  id: string;
  title: string;
  desc: string;
  cap: string;
};

export const layers: Layer[] = [
  {
    id: "exterior",
    title: "Exterior",
    desc: "A matte composite shell with soft integrated lighting. Nothing mechanical is exposed — the design is made to live alongside people.",
    cap: "[ full-body render ]\nOuter shell · matte composite",
  },
  {
    id: "skeleton",
    title: "Skeleton",
    desc: "A lightweight structural frame tuned for balance, reach, and a natural, grounded gait that communicates real mass.",
    cap: "[ overlay reveal ]\nStructural frame · balance mapping",
  },
  {
    id: "actuators",
    title: "Actuators",
    desc: "Precision actuators deliver strength with gentle, controlled force — powerful enough to help, calibrated to be safe.",
    cap: "[ overlay reveal ]\nActuator network · torque map",
  },
  {
    id: "sensors",
    title: "Sensors",
    desc: "Depth, vision, and touch fuse into one continuous, real-time picture of the room and the people in it.",
    cap: "[ overlay reveal ]\nSensor fusion · depth + vision + touch",
  },
  {
    id: "intelligence",
    title: "Intelligence",
    desc: "On-device planning turns intent into safe, deliberate motion — reasoning that runs locally, privately, in real time.",
    cap: "[ overlay reveal ]\nEdge AI · autonomous planning",
  },
];

export type Application = {
  tag: string;
  title: string;
  desc: string;
  /** optional card background, path under /public */
  image?: string;
};

export const applications: Application[] = [
  {
    tag: "HOME",
    title: "Your household assistant",
    desc: "An intelligent presence that helps around the house — carrying, tidying, preparing, retrieving.",
    image: "/assets/assistant-housemanager.jfif",
  },
  {
    tag: "CARE",
    title: "More independence",
    desc: "Helping people live more independently and with dignity, at home and in assisted settings.",
    image: "/assets/assisted-living-support.jpg",
  },
  {
    tag: "WORK",
    title: "Repetitive tasks, handled",
    desc: "Taking on the repetitive physical work so people can focus on what only people can do.",
    image: "/assets/assistant-repetitivetasks.jfif",
  },
  {
    tag: "HOSPITALITY",
    title: "Service, elevated",
    desc: "Supporting people in hotels, restaurants, and service environments with a calm, helpful presence.",
    image: "/assets/assistant-service.jfif",
  },
  {
    tag: "INDUSTRY",
    title: "Alongside people",
    desc: "Working beside people in physically demanding environments — safely and reliably.",
    image: "/assets/assistant-hardcore.jfif",
  },
  {
    tag: "EVERYDAY LIFE",
    title: "Wherever help is needed",
    desc: "One robot that adapts to the moment, helping wherever help is needed.",
    image: "/assets/assisted-living-companion.jpg",
  },
];

export const awarenessTags = [
  "Vision",
  "Spatial understanding",
  "Object recognition",
  "Human interaction",
  "Navigation",
  "Voice understanding",
];

export const engineeringSpecs = [
  "Precision hands",
  "Sensor fusion",
  "Real-time navigation",
  "Edge AI",
  "Autonomous planning",
  "Human-aware movement",
];

export const safetyFeatures = [
  "Collision detection",
  "Force limitation",
  "Human-aware navigation",
  "Emergency stopping",
  "Secure software",
  "User-defined permissions",
];

export const learnedHabits = [
  "Your morning routine.",
  "Your preferred coffee.",
  "Where you keep your keys.",
  "When you usually leave home.",
  "How you like things organized.",
];

export const peopleScenes = [
  "Parent + Aria",
  "Elderly + Aria",
  "Professional + Aria",
  "Limited mobility + Aria",
];

export type LifeScene = {
  title: string;
  caption: string;
  wide: boolean;
  image?: string;
};

export const lifeScenes: LifeScene[] = [
  {
    title: "In a modern home",
    caption: "Coffee poured, meds on time — mornings that start themselves.",
    wide: true,
    image: "/assets/assisted-living-companion.jpg",
  },
  {
    title: "Carrying laundry",
    caption: "The basket makes it upstairs before you notice it was full.",
    wide: false,
    image: "/assets/assistant-housemanager.jfif",
  },
  {
    title: "Helping an elderly parent",
    caption: "A patient arm to lean on, for every walk down the hall.",
    wide: false,
    image: "/assets/assisted-living-support.jpg",
  },
  {
    title: "Organizing a space",
    caption: "Every item back where it belongs, without being asked twice.",
    wide: true,
    image: "/assets/assistant-repetitivetasks.jfif",
  },
];

export const navLinks = [
  { href: "#engineering", label: "Technology" },
  { href: "#showcase", label: "Robot" },
  { href: "#applications", label: "Applications" },
  { href: "#people", label: "Company" },
];
