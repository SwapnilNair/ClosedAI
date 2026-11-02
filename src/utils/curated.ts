/** Match every word against the title, link labels, and source URLs. */
export function matchesCuratedSearch(text: string, query: string): boolean {
  const normalize = (value: string) => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('en');
  const haystack = normalize(text);
  return normalize(query).trim().split(/\s+/).filter(Boolean).every((term) => haystack.includes(term));
}
