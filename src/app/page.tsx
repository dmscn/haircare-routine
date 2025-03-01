'use client'

import { useState } from 'react';
import DownloadButton from './components/Form/DownloadButton';
import QuizQuestion from './components/Form/QuizQuestion';
import generateGoogleCalendarICS from './generateGoogleCalendarICS';
import generateSchedule from './generateSchedule';


const now = new Date();

export default function Home() {
  const [answers, setAnswers] = useState<AnswerState>({});
  const [schedule, setSchedule] = useState<Array<[Date, Procedure]>>([]);
  const [fileURL, setFileURL] = useState('');


  const handleRadioChange = (question: keyof AnswerState, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [question]: value
    }));
  };

  const handleCheckboxChange = (question: keyof AnswerState, value: string) => {
    setAnswers(prev => {
      const currentValues = prev[question] || [];
      const newValues = currentValues.includes(value)
        ? (currentValues as string[]).filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [question]: newValues };
    });
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers(prev => ({ ...prev, currentRoutine: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSchedule(generateSchedule(answers));
    const { error, value } = generateGoogleCalendarICS(schedule);

    if (error) {
      console.error('Error generating calendar:', error);
      return;
    } else {
      const file = new File([value || ''], 'schedule.ics', { type: 'text/calendar' });
      setFileURL(URL.createObjectURL(file));
    }
  };


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">
        Cronograma Capilar Personalizado
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        <QuizQuestion
          question="1. Qual seu tipo de cabelo?"
          name="hairType"
          options={['Liso', 'Ondulado', 'Cacheado', 'Crespo']}
          onChange={(option: string) => handleRadioChange('hairType', option)}
          isOptionChecked={(option: string) => answers.hairType === option}
        />

        <QuizQuestion
          question="2. Teve algum tratamento químico recente (últimos 3 meses)?"
          name="chemicalTreatment"
          options={['Coloração', 'Descoloração', 'Alisamento', 'Relaxamento', 'Perma', 'Nenhum']}
          onChange={(option: string) => handleRadioChange('chemicalTreatment', option)}
          isOptionChecked={(option: string) => answers.chemicalTreatment === option}
        />

        <QuizQuestion
          question="3. Como está a saúde do seu cabelo hoje?"
          name="hairHealth"
          options={['Seco', 'Oleoso', 'Quebradiço', 'Com frizz', 'Sem brilho', 'Liso e liso (sem vida)']}
          multiple
          onChange={(option: string) => handleCheckboxChange('hairHealth', option)}
          isOptionChecked={(option: string) => Boolean(answers.hairHealth?.includes(option))}
        />

        <QuizQuestion
          question="4. Qual a porosidade do seu cabelo?"
          name="porosity"
          options={['Baixa (o cabelo demora a absorver água/produtos)', 'Média (absorve bem, mas não muito rápido)', 'Alta (absorve água imediatamente)']}
          onChange={(option: string) => handleRadioChange('porosity', option)}
          isOptionChecked={(option: string) => answers.porosity === option}
        />

        <QuizQuestion
          question="5. Quantas vezes lava o cabelo por semana?"
          name="washFrequency"
          options={['1x', '2x', '3x ou mais']}
          onChange={(option: string) => handleRadioChange('washFrequency', option)}
          isOptionChecked={(option: string) => answers.washFrequency === option}
        />

        <QuizQuestion
          question="6. Como está seu couro cabeludo?"
          name="scalpCondition"
          options={['Normal', 'Oleoso', 'Seco', 'Com caspa']}
          onChange={(option: string) => handleRadioChange('scalpCondition', option)}
          isOptionChecked={(option: string) => answers.scalpCondition === option}
        />

        <button
          type="submit"
          className="btn btn-primary w-full py-2 text-lg hover:bg-blue-500 hover:text-white mt-4 hover:cursor-pointer"
        >
          Gerar Meu Cronograma
        </button>

        {
          fileURL &&
          <DownloadButton
            fileUrl={fileURL}
            fileName={`schedule_${new Date().toISOString()}.ics`}
          >
            Baixar Cronograma .ics
          </DownloadButton>
        }
      </form>
    </div>
  );
}
