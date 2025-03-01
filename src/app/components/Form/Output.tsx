interface OutputProps {
  schedule: any,
}

export default function Output({ schedule }: OutputProps) {
  return (<div className="mt-10 p-6 bg-gray-50 rounded-lg">
    <pre className="bg-white p-4 rounded text-black-600 overflow-x-auto">
      {JSON.stringify(schedule, null, 2)}
    </pre>
  </div>)
}
