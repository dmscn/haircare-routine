interface AnswerState {
  hairType?: string;
  chemicalTreatment?: string;
  hairHealth?: string[];
  porosity?: string;
  washFrequency?: string;
  scalpCondition?: string;
}

type Procedure = 'hidratação' | 'nutrição' | 'restauração';
