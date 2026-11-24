export type ThaiTable = { title: string; columns: string[]; rows: string[][] };
export type ThaiSection = { id: string; title: string; pages: number[]; intro: string; notes: string[]; tables: ThaiTable[] };
export type ListeningItem = { id: string; exercise: string; pages: number[]; task: string; focus: string };
