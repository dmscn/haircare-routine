
interface QuizQuestionProps {
  question: string;
  name :string;
  options: string[];
  multiple?: boolean; // true para checkbox, false para radio
  onChange: (option: string) => void;
  isOptionChecked: (option: string) => boolean;
}

const QuizQuestion = ({ question, name, options, multiple = false, onChange, isOptionChecked }: QuizQuestionProps) => {
  return (
    <fieldset className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">{question}</h3>
      {options.map(option => (
        <label key={option} className="flex items-center space-x-3 cursor-pointer">
          {multiple ?
            <Checkbox {...{ option, name, isOptionChecked, onChange }} /> :
            <Radio {...{ option, name, isOptionChecked, onChange }} />
          }
          <span className="text-gray-600">{option}</span>
        </label>
      ))}
    </fieldset>
  );
};

interface InputProps {
  name: string,
  option: string,
  isOptionChecked: (option: string) => boolean,
  onChange: (option: string) => void,
}

const Radio = ({ name, option, isOptionChecked, onChange }: InputProps) => (
  <input
    type="radio"
    name={name}
    value={option}
    checked={isOptionChecked(option)}
    onChange={() => onChange(option)}
    className="radio radio-primary radio-sm"
  />
);

const Checkbox = ({ name, option, isOptionChecked, onChange }: InputProps) => (
  <input
    type="checkbox"
    value={option}
    checked={isOptionChecked(option)}
    onChange={() => onChange(option)}
    className="checkbox checkbox-primary checkbox-sm"
  />
)

export default QuizQuestion;
