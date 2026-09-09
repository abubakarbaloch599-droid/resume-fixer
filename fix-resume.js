export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { resume, jobDesc } = req.body || {};

  if (!resume || !jobDesc || resume.length < 30 || jobDesc.length < 30) {
    return res.status(400).json({ error: "Paste your full resume and the job description first." });
  }

  const prompt = `You are an expert resume writer specializing in beating Applicant Tracking Systems (ATS).

RESUME:
"""
${resume}
"""

JOB DESCRIPTION:
"""
${jobDesc}
"""

Do the following:
1. Identify 8-15 important keywords/phrases from the job description that are missing or underrepresented in the resume.
2. Rewrite the resume so it naturally includes the missing keywords, keeps every fact truthful (never invent experience, employers, titles, or numbers), uses strong action verbs, and stays ATS-friendly (no tables, no columns, plain formatting with clear section headers).
3. Return ONLY valid JSON, no markdown fences, no preamble, in this exact shape:
{
  "missing_keywords": ["keyword1", "keyword2"],
  "rewritten_resume": "full rewritten resume as plain text with \\n line breaks",
  "summary_of_changes": "2-3 sentence plain-English summary of what changed and why"
}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", response.status, errText);
      return res.status(500).json({ error: "Claude API error", detail: errText });
    }

    const data = await response.json();
    const textBlock = data.content.find((c) => c.type === "text");
    const raw = textBlock ? textBlock.text : "";
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong.", detail: String(err) });
  }
}
