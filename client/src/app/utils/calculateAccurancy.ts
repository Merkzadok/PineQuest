export function calculateAccuracy(expected: string, spoken: string) {
  const expectedWords = expected.toLowerCase().split(" ");
  const spokenWords = spoken.toLowerCase().split(" ");
  const correctWords = spokenWords.filter(w => expectedWords.includes(w)).length;
  const accuracy = Math.min(100, (correctWords / expectedWords.length) * 100);
  const stars = accuracy >= 90 ? 3 : accuracy >= 85 ? 2 : 1;
  return { accuracy, stars };
}
