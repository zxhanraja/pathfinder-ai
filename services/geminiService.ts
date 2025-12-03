
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserProfile, AIResponse } from "../types";

const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A professional summary of the user's profile, strengths, and potential.",
    },
    resumeFeedback: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-5 critical, actionable tips to improve the user's resume (e.g., formatting, missing keywords, lack of metrics).",
    },
    careerPaths: {
      type: Type.ARRAY,
      description: "Top 3 recommended career paths.",
      items: {
        type: Type.OBJECT,
        properties: {
          roleTitle: { type: Type.STRING },
          matchPercentage: { type: Type.NUMBER, description: "A number between 0 and 100 representing fit." },
          matchReason: { type: Type.STRING, description: "Why this role fits the user's profile." },
          salaryRange: { type: Type.STRING, description: "Estimated annual salary range. MUST be low and realistic for freshers (e.g. $5k-$12k in Asia, $50k-$70k in US)." },
          futureScope: { type: Type.STRING, description: "Market demand and future outlook." },
          mustHaveSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          goodToHaveSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          missingSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Critical skills the user currently lacks." },
          roadmap: {
            type: Type.ARRAY,
            description: "A 3-6 month learning roadmap.",
            items: {
              type: Type.OBJECT,
              properties: {
                phaseName: { type: Type.STRING, description: "e.g., Month 1-2: Foundations" },
                duration: { type: Type.STRING },
                topics: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
          },
          projects: {
            type: Type.ARRAY,
            description: "Suggested projects to build portfolio.",
            items: {
              type: Type.OBJECT,
              properties: {
                level: { type: Type.STRING, description: "Beginner, Intermediate, or Advanced" },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
          },
          recommendedCourses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific course titles or platforms." },
          searchKeywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Keywords for LinkedIn/Job boards." },
        },
      },
    },
    finalActionPlan: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A concrete, step-by-step action plan to get started immediately.",
    },
  },
  required: ["summary", "resumeFeedback", "careerPaths", "finalActionPlan"],
};

export const generateCareerAdvice = async (profile: UserProfile): Promise<AIResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const promptText = `
    You are a strict, data-driven Career Coach and HR Specialist.
    Analyze the following user profile and provide career path recommendations.
    
    User Profile:
    - Name: ${profile.name}
    - Current Role: ${profile.currentRole}
    - Experience Level: ${profile.experienceLevel}
    - Location: ${profile.location || "Global/Remote"}
    - Stated Skills: ${profile.skills}
    - Interests: ${profile.interests}
    - Career Goals: ${profile.careerGoals}
    - Resume/Bio Content: ${profile.resumeText}

    **CRITICAL RULES FOR ACCURACY:**

    1. **SALARY REALISM (STRICT)**: 
       - Do NOT hallucinate inflated salaries.
       - **If Location is India/Asia**: Entry Level (0-2y) salaries are typically **$4,000 - $10,000 USD/year** (3-8 LPA). ONLY top 1% get more. 
       - **If Location is US/EU**: Entry Level is **$45,000 - $75,000**. NOT $150k+.
       - Provide ranges appropriate for a "Recession/Employer Market" context.
       - Format: "$X - $Y" or "₹X LPA - ₹Y LPA" if India is detected.

    2. **RESUME FEEDBACK**: 
       - Analyze the 'Resume/Bio Content' provided.
       - List 3-5 harsh, constructive improvements (e.g., "Remove generic objectives", "Add quantifiable metrics to project X", "Fix formatting").

    3. **ROLE SELECTION**:
       - If user is "Student" or "Entry Level", DO NOT suggest "Senior", "Lead", or "Architect" roles.
       - Suggest "Junior", "Associate", "Intern", or "Analyst" roles.

    Task:
    1. Analyze the profile depth.
    2. Provide 3 specific career paths.
    3. Generate a Resume Audit (Feedback).
    4. Create a 3-6 month skill roadmap.
  `;

  // Prepare contents array
  const contents: any = { parts: [{ text: promptText }] };

  // If a file is attached, add it to the parts
  if (profile.resumeFile && profile.resumeFile.data) {
    contents.parts.push({
      inlineData: {
        mimeType: profile.resumeFile.type,
        data: profile.resumeFile.data,
      },
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.3, // Low temperature for factual output
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(text) as AIResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
