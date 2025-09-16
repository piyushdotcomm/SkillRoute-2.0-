// Heuristic mock reply generator (respects optional maxWords)
const topicHints = [
  { match: /exam|neet|jee|gate/i, reply: 'Focus on core concepts daily, practice past papers, and track weak areas.' },
  { match: /engineering|btech/i, reply: 'Strengthen math, build small projects, explore branches via internships.' },
  { match: /medical|mbbs/i, reply: 'Master NCERT basics, spaced revision, timed practice tests.' },
  { match: /commerce|bcom/i, reply: 'Learn fundamentals of accounts, basics of taxation, and Excel skills early.' },
  { match: /ai|ml|data/i, reply: 'Build Python + math foundations; start mini projects to showcase learning.' },
  { match: /scholarship/i, reply: 'List deadlines, prepare documents early, and craft a clear motivation note.' }
];

export function generateShortMockReply(userMsg = '', maxWords = 45) {
  const trimmed = userMsg.trim();
  const hit = topicHints.find(h => h.match.test(trimmed));
  let base;
  if (hit) base = hit.reply;
  else if (trimmed.length < 3) base = 'Could you clarify your question?';
  else if (/hello|hi|hey/i.test(trimmed)) base = 'Hi! Ask me about degrees, skills, exam prep, motivation, or planning.';
  else if (/career|future|path/i.test(trimmed)) base = 'Share strengths + interests; I can outline matching streams, skills, and next steps.';
  else if (/motivat|burnout|focus/i.test(trimmed)) base = 'Short focused study blocks, clear weekly targets, and reflection improve consistency.';
  else base = 'I can guide on courses, skills, study strategy, scholarships, and planning. Ask anything in that space.';

  const words = base.split(/\s+/);
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '…' : base;
}