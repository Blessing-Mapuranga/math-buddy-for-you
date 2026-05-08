import type { ChapterNotes } from "./types";
import { unit1Notes } from "./unit-1";

const all: ChapterNotes[] = [...unit1Notes];

export const getChapterNotes = (unitId: string, chapterIndex: number): ChapterNotes | undefined =>
  all.find((c) => c.unitId === unitId && c.chapterIndex === chapterIndex);

export const getUnitNotes = (unitId: string): ChapterNotes[] =>
  all.filter((c) => c.unitId === unitId);

export type { ChapterNotes } from "./types";