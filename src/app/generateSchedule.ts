function generateSchedule(answer: AnswerState): Array<[Date, Procedure]> {
  const procedures = determineProcedures(answer);
  const frequency = parseFrequency(answer.washFrequency);
  return createSchedule(procedures, frequency);
}

function determineProcedures(answer: AnswerState): Procedure[] {
  const procedures = new Set<Procedure>();

  // Tratamentos químicos requerem restauração e nutrição
  if (answer.chemicalTreatment && answer.chemicalTreatment !== 'Nenhum') {
    procedures.add('restauração');
    procedures.add('nutrição');
  }

  // Condição do couro cabeludo
  if (answer.scalpCondition === 'Oleoso') {
    procedures.delete('hidratação');
    procedures.add('nutrição');
  }

  // Saúde do cabelo
  if (answer.hairHealth) {
    if (answer.hairHealth.some(h => ['Seco', 'Com frizz', 'Liso e liso (sem vida)'].includes(h))) {
      procedures.add('hidratação');
    }
    if (answer.hairHealth.some(h => ['Quebradiço', 'Sem brilho'].includes(h))) {
      procedures.add('restauração');
      procedures.add('nutrição');
    }
  }

  // Porosidade
  if (answer.porosity?.includes('Alta')) {
    procedures.add('nutrição');
  } else if (answer.porosity?.includes('Baixa')) {
    procedures.add('hidratação');
  }

  // Tipo de cabelo
  if (answer.hairType === 'Crespo' || answer.hairType === 'Cacheado') {
    procedures.add('hidratação');
    procedures.add('nutrição');
  }

  // Fallback padrão
  if (procedures.size === 0) {
    return ['hidratação', 'nutrição'];
  }

  return Array.from(procedures);
}

function parseFrequency(frequency?: string): number {
  const mapping: { [key: string]: number } = {
    '1x': 7,
    '2x': 3,
    '3x ou mais': 2
  };
  return mapping[frequency || '1x'];
}

function createSchedule(procedures: Procedure[], daysBetween: number): Array<[Date, Procedure]> {
  const schedule: Array<[Date, Procedure]> = [];
  const startDate = new Date();
  startDate.setHours(10, 0, 0, 0); // Define horário padrão (10:00 AM)

  for (let i = 0; i < 8; i++) { // 4 semanas de procedimentos
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + (i * daysBetween));
    const procedure = procedures[i % procedures.length];
    schedule.push([currentDate, procedure]);
  }

  return schedule;
}

export default generateSchedule
