export function obtainAcronym(nome?: string) {
  if (!nome) {
    return ``;
  }
  const words = nome?.split(' ');

  if (words?.length === 1) {
    return words[0][0].toUpperCase();
  }
  return words?.map((word) => word[0].toUpperCase()).join('');
}
