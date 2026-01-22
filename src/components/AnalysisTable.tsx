import { analysisData } from '../tests/mockData/SampleDataRecords.json';
 
type Status = 'LOW' | 'NORMAL' | 'HIGH';
type TwoWayBarResult = {
  percent: number;
  status: Status;
  inRange: boolean;
};
const AnalysisTable = () => {
  const getTwoWayBarData = (value: number, low: number, high: number): TwoWayBarResult => {
    if (Number.isNaN(value) || Number.isNaN(low) || Number.isNaN(high) || high <= low) {
      return {
        percent: 0,
        status: 'NORMAL',
        inRange: false,
      };
    }
 
    let status: Status;
    if (value < low) status = 'LOW';
    else if (value > high) status = 'HIGH';
    else status = 'NORMAL';
 
    const mid = (low + high) / 2;
    const halfRange = (high - low) / 2;
 
    let percent = ((value - mid) / halfRange) * 100;
 
    percent = Math.max(-100, Math.min(100, percent));
 
    return {
      percent,
      status,
      inRange: status === 'NORMAL',
    };
  };
 
  return (
    <table className="w-full table-fixed">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          <th className="pb-2">Test</th>
          <th className="pb-2">Value</th>
          <th className="pb-2">Low</th>
          <th className="pb-2">High</th>
          <th className="pb-2">Unit</th>
          <th className="pb-2">Graph</th>
        </tr>
      </thead>
 
      <tbody>
        {analysisData.map((row, i) => {
          const { percent, status, inRange } = getTwoWayBarData(row.value, row.low, row.high);
          return (
            <tr key={i} className="border-t">
              <td className="py-3">{row.test}</td>
              <td>
                <input defaultValue={row.value} className="w-20 border rounded px-2 py-1" />
              </td>
              <td>{row.low}</td>
              <td>{row.high}</td>
              <td>{row.unit}</td>
              <td className="w-60">
                <div className="relative h-2 bg-gray-200 rounded">
                  <div className="absolute left-1/2 top-0 h-2 w-px bg-gray-400" />
 
                  <div
                    className={`absolute top-0 h-2 rounded ${
                      inRange ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{
                      left: percent >= 0 ? '50%' : `${50 + percent / 2}%`,
                      width: `${Math.abs(percent) / 2}%`,
                    }}
                  />
                </div>
 
                <div
                  className={`mt-1 text-xs font-semibold ${
                    status === 'NORMAL' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {status}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
 
export default AnalysisTable;
 