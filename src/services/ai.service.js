import axios from "axios";
import CustomError from "../utils/customErrors.js";
import { findProfileWithDetailsByUserId } from "../repository/profile.repository.js";

const calculateExperienceYears = (experiences) => {
  if (!experiences?.length) return 0;

  let totalMonths = 0;

  experiences.forEach((exp) => {
    const start = new Date(exp.startDate);
    const end = exp.isCurrentlyWorking ? new Date() : new Date(exp.endDate);

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    totalMonths += months;
  });

  return Math.max(0, Math.floor(totalMonths / 12));
};

const getRoleInstruction = (role) => {
  switch (role) {
    case "STUDENT":
      return "Emphasize learning mindset, academic projects, skill development, and growth potential.";
    case "FRESHER":
      return "Emphasize entry-level readiness, adaptability, and strong foundational skills.";
    case "GRADUATE":
      return "Emphasize academic background and transition into professional industry roles.";
    case "PROFESSIONAL":
      return "Emphasize professional impact, measurable achievements, and domain expertise.";
    default:
      return "Write a balanced professional summary.";
  }
};

const countCharacters = (text) => {
  return text.length;
};

const enforceCharacterLimit = (text, maxChars = 500) => {
  if (text.length <= maxChars) return text;

  // Truncate to max characters (ensuring we don't cut in the middle of a word)
  return text.substring(0, maxChars).replace(/\s+\S*$/, "");
};

export const generateBioService = async (userId) => {
  const profile = await findProfileWithDetailsByUserId(userId);

  if (!profile) {
    throw CustomError.notFound("Profile not found");
  }

  const skills = profile.skills?.map((s) => s.name).join(", ") || "";
  const experienceYears = calculateExperienceYears(profile.experiences);
  const roleInstruction = getRoleInstruction(profile.role);

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are a professional corporate resume writer. Always write biographies strictly in FIRST PERSON using 'I' statements. Never refer to the person by name. You MUST keep responses under 500 CHARACTERS - this is critical.",
          },
          {
            role: "user",
            content: `
Write a professional LinkedIn bio in FIRST PERSON.

CRITICAL LENGTH REQUIREMENT:
- The bio MUST be under 500 CHARACTERS (not words)
- This is approximately 80-100 words
- Be extremely concise and impactful
- Single paragraph only
- No emojis, bullet points, or headings
- Plain professional tone

${roleInstruction}

Role: ${profile.role}
Experience: ${experienceYears} years
Skills: ${skills}

Remember: 500 CHARACTERS maximum! Count your characters carefully.
`,
          },
        ],
        temperature: 0.5,
        max_tokens: 70, // 70 tokens ≈ 50-60 words ≈ 300-400 characters
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    let bio = response.data.choices[0].message.content.trim();

    // Enforce strict character limit
    const charCount = countCharacters(bio);
    console.log(`Generated bio character count: ${charCount}`);

    if (charCount > 500) {
      console.warn(
        `Bio exceeded 500 characters (${charCount} chars). Truncating...`,
      );
      bio = enforceCharacterLimit(bio, 500);
    }

    return bio;
  } catch (error) {
    console.log("HF ERROR:", error.response?.data || error.message);
    throw CustomError.internal("AI Bio generation failed");
  }
};
