'use client'

import { useState } from 'react';

interface AnswerState {
  hairType?: string;
  chemicalTreatment?: string;
  hairHealth?: string[];
  porosity?: string;
  washFrequency?: string;
  scalpCondition?: string;
  hasCurrentRoutine?: string;
  currentRoutine?: string;
}

export default function Home() {
  const [answers, setAnswers] = useState<AnswerState>({});
  const [showResult, setShowResult] = useState(false);

  const handleRadioChange = (question: keyof AnswerState, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [question]: value
    }));
  };

  const handleCheckboxChange = (value: string) => {
    setAnswers(prev => {
      const currentValues = prev.hairHealth || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, hairHealth: newValues };
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers(prev => ({ ...prev, currentRoutine: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">
        Cronograma Capilar Personalizado
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Pergunta 1 */}
        <fieldset className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">1. Qual seu tipo de cabelo?</h3>
          {['Liso', 'Ondulado', 'Cacheado', 'Crespo'].map(option => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="hairType"
                value={option}
                checked={answers.hairType === option}
                onChange={() => handleRadioChange('hairType', option)}
                className="radio radio-primary radio-sm"
              />
              <span className="text-gray-600">{option}</span>
            </label>
          ))}
        </fieldset>

        {/* Pergunta 2 */}
        <fieldset className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">2. Teve algum tratamento químico recente (últimos 3 meses)?</h3>
          {['Coloração', 'Descoloração', 'Alisamento', 'Relaxamento', 'Perma', 'Nenhum'].map(option => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="chemicalTreatment"
                value={option}
                checked={answers.chemicalTreatment === option}
                onChange={() => handleRadioChange('chemicalTreatment', option)}
                className="radio radio-primary radio-sm"
              />
              <span className="text-gray-600">{option}</span>
            </label>
          ))}
        </fieldset>

        {/* Pergunta 3 */}
        <fieldset className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">3. Como está a saúde do seu cabelo hoje?</h3>
          {['Seco', 'Oleoso', 'Quebradiço', 'Com frizz', 'Sem brilho', 'Liso e liso (sem vida)'].map(option => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={answers.hairHealth?.includes(option) || false}
                onChange={() => handleCheckboxChange(option)}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="text-gray-600">{option}</span>
            </label>
          ))}
        </fieldset>

        {/* Pergunta 4 */}
        <fieldset className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">4. Qual a porosidade do seu cabelo?</h3>
          {['Baixa (o cabelo demora a absorver água/produtos)', 'Média (absorve bem, mas não muito rápido)', 'Alta (absorve água imediatamente)'].map(option => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="porosity"
                value={option}
                checked={answers.porosity === option}
                onChange={() => handleRadioChange('porosity', option)}
                className="radio radio-primary radio-sm"
              />
              <span className="text-gray-600">{option}</span>
            </label>
          ))}
        </fieldset>

        {/* Pergunta 5 */}
        <fieldset className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">5. Quantas vezes lava o cabelo por semana?</h3>
          {['1x', '2x', '3x ou mais'].map(option => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="washFrequency"
                value={option}
                checked={answers.washFrequency === option}
                onChange={() => handleRadioChange('washFrequency', option)}
                className="radio radio-primary radio-sm"
              />
              <span className="text-gray-600">{option}</span>
            </label>
          ))}
        </fieldset>

        {/* Pergunta 6 */}
        <fieldset className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">6. Como está seu couro cabeludo?</h3>
          {['Normal', 'Oleoso', 'Seco', 'Com caspa'].map(option => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="scalpCondition"
                value={option}
                checked={answers.scalpCondition === option}
                onChange={() => handleRadioChange('scalpCondition', option)}
                className="radio radio-primary radio-sm"
              />
              <span className="text-gray-600">{option}</span>
            </label>
          ))}
        </fieldset>

        {/* Pergunta 7 */}
        <fieldset className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">7. Tem alguma rotina atual?</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="hasCurrentRoutine"
                value="Sim"
                checked={answers.hasCurrentRoutine === 'Sim'}
                onChange={() => handleRadioChange('hasCurrentRoutine', 'Sim')}
                className="radio radio-primary radio-sm"
              />
              <span className="text-gray-600">Sim</span>
            </label>

            {answers.hasCurrentRoutine === 'Sim' && (
              <div className="ml-8">
                <input
                  type="text"
                  placeholder="Descreva sua rotina atual..."
                  value={answers.currentRoutine || ''}
                  onChange={handleInputChange}
                  className="input input-bordered input-primary w-full max-w-xs"
                />
              </div>
            )}

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="hasCurrentRoutine"
                value="Não"
                checked={answers.hasCurrentRoutine === 'Não'}
                onChange={() => handleRadioChange('hasCurrentRoutine', 'Não')}
                className="radio radio-primary radio-sm"
              />
              <span className="text-gray-600">Não</span>
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          className="btn btn-primary w-full py-2 text-lg"
        >
          Gerar Meu Cronograma
        </button>
      </form>

      {showResult && (
        <div className="mt-10 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Suas Respostas:</h2>
          <pre className="bg-white p-4 rounded overflow-x-auto">
            {JSON.stringify(answers, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
