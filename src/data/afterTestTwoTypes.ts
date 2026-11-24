export type ThaiTable = { title: string; columns: string[]; rows: string[][] };
export type ThaiSection = { id: string; title: string; pages: number[]; intro: string; notes: string[]; tables: ThaiTable[] };
export type AudioClip = { label: string; src: string; transcript?: string; transcriptTh?: string };
export type ListeningItem = { id: string; exercise: string; pages: number[]; task: string; focus: string; audio?: AudioClip[] };
