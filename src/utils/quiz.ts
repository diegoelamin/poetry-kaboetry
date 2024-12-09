export function calculateScore(answers: Record<string, string>, correctAnswers: Record<string, string>) {
  const totalQuestions = Object.keys(correctAnswers).length;
  if (totalQuestions === 0) return 0;
  
  const correctCount = Object.entries(answers).reduce((count, [questionId, answer]) => {
    return answer === correctAnswers[questionId] ? count + 1 : count;
  }, 0);

  // Ensure we're getting exact percentages
  return Math.floor((correctCount / totalQuestions) * 100);
}

export function isPassingScore(score: number, threshold = 80) {
  return score >= threshold;
}