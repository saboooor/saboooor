import type { Component } from '@qwik.dev/core';

export interface JournalEntry {
  id: string;
  title: string;
  date?: string;
}

interface JournalModule {
  default: Component;
  frontmatter: { title: string; date?: string; draft?: boolean };
}

// Qwik's Markdown compiler handles frontmatter and rich content at build time.
const files = import.meta.glob<JournalModule>('./journal/*.md', {
  eager: true,
});
const published = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b))
  .filter(([, entry]) => entry.frontmatter.draft !== true);

export const journalEntries: JournalEntry[] = published.map(([path, entry]) => {
  if (
    typeof entry.frontmatter.title !== 'string' ||
    !entry.frontmatter.title.trim()
  ) {
    throw new Error(`Journal entry ${path} needs a title in its frontmatter`);
  }
  return {
    id: path,
    title: entry.frontmatter.title,
    date: entry.frontmatter.date,
  };
});

export function journalContent(id: string) {
  return files[id]?.default;
}

export function dailyJournalEntry(now = new Date()): JournalEntry | null {
  if (!journalEntries.length) return null;
  const day = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
  // Seed the selection with the date so reloads and server renders agree.
  let seed = 2166136261;
  for (const character of day) {
    seed = Math.imul(seed ^ character.charCodeAt(0), 16777619);
  }
  return journalEntries[(seed >>> 0) % journalEntries.length];
}
