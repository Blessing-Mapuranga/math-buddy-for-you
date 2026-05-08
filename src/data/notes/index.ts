import type { ChapterNotes } from "./types";
import { unit1Notes } from "./unit-1";
import { unit2Notes } from "./unit-2";
import { unit3Notes } from "./unit-3";
import { unit4Notes } from "./unit-4";
import { unit5Notes } from "./unit-5";
import { unit6Notes } from "./unit-6";

const all: ChapterNotes[] = [
  ...unit1Notes,
  ...unit2Notes,
  ...unit3Notes,
  ...unit4Notes,
  ...unit5Notes,
  ...unit6Notes,
];

export const getChapterNotes = (unitId: string, chapterIndex: number): ChapterNotes | undefined =>
  all.find((c) => c.unitId === unitId && c.chapterIndex === chapterIndex);

export const getUnitNotes = (unitId: string): ChapterNotes[] =>
  all.filter((c) => c.unitId === unitId);

export type { ChapterNotes } from "./types";