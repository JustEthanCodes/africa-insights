import { Leaf, GraduationCap, HeartPulse, Landmark, Wifi } from "lucide-react";
import type { Challenge } from "./types";

export const challenges: Challenge[] = [
  {
    topic: "sustainable agriculture in the Sahel region",
    icon: Leaf,
    question:
      "What is a key strategy for promoting sustainable agriculture and combating desertification in the Sahel?",
    options: [
      "Large-scale monoculture farming",
      "Increased use of chemical fertilizers",
      "Agroforestry and farmer-managed natural regeneration",
      "Switching entirely to livestock grazing",
    ],
    correctOptionIndex: 2,
  },
  {
    topic: "improving access to quality education in rural Africa",
    icon: GraduationCap,
    question:
      "Which innovation has shown great promise for improving educational access in remote African communities?",
    options: [
      "Building more traditional, large-scale universities in capital cities",
      "Mobile learning (m-learning) platforms on basic-feature phones",
      "Mandating all instruction be in a single international language",
      "Focusing education solely on vocational skills, ignoring academics",
    ],
    correctOptionIndex: 1,
  },
  {
    topic: "the rise of mobile banking and financial inclusion in East Africa",
    icon: Wifi,
    question:
      "What was the primary driver behind the success of mobile money services like M-Pesa in East Africa?",
    options: [
      "High levels of pre-existing bank account ownership",
      "Widespread access to high-speed internet",
      "Government-mandated adoption of the technology",
      "The ability to transfer small amounts of money securely using SMS on feature phones",
    ],
    correctOptionIndex: 3,
  },
  {
    topic: "tackling malaria with modern healthcare solutions",
    icon: HeartPulse,
    question:
      "Besides insecticide-treated nets, what is a groundbreaking recent development in the fight against malaria in Africa?",
    options: [
      "A universally effective vaccine with a single dose",
      "Genetically modified mosquitoes that are sterile",
      "The world's first effective malaria vaccine (RTS,S/AS01) being rolled out",
      "A complete eradication of the Anopheles mosquito",
    ],
    correctOptionIndex: 2,
  },
  {
    topic: "urbanization and infrastructure development in Africa's megacities",
    icon: Landmark,
    question:
      "What is a major opportunity presented by the rapid urbanization in African cities like Lagos, Kinshasa, and Cairo?",
    options: [
      "Increased pressure on existing, outdated infrastructure",
      "The potential to create dense, efficient economic hubs with smart, sustainable infrastructure",
      "A decrease in the need for public transportation systems",
      "A guaranteed reduction in urban poverty and inequality",
    ],
    correctOptionIndex: 1,
  },
];
