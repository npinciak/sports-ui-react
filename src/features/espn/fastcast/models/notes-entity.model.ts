export interface INotesEntity {
  type: string;
  text: string;
  headline?: string | null;
  date?: string | null;
  source?: string | null;
}
