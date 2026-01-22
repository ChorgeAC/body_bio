import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TableColumn<T> {
  key: keyof T;
  label: string;
}

interface CommonTableProps<T> {
  title: string;
  columns: TableColumn<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onSelect?: (row: T) => void;
  onCreateVisit?: (row: T) => void;
}

interface TableRow {
  id: number | string;
  name: string;
  status?: string;
  [key: string]: any;
}

const CommonTable = <T extends TableRow>({
  title,
  columns,
  data,
  onEdit,
  onCreateVisit,
  onSelect,
}: CommonTableProps<T>) => {
  const [search, setSearch] = useState('');
  const portal = location.pathname.split('/')[1];
  const navigate = useNavigate();

  // Filtered data based on search input
  const filteredData = data.filter((row) => row.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      {/* Title / Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go Back"
          className="text-blue-600 hover:text-blue-700 transition cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold text-blue-600">{title}</h2>
      </div>

      {/* Search Input */}
      <div className="mb-4 relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-100 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 text-sm text-gray-600">
            {columns.map((c) => (
              <th key={c.key as string} className="px-4 py-3 text-left">
                {c.label}
              </th>
            ))}
            {portal !== 'doctor-portal' && <th className="px-4 py-3 text-right">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {filteredData.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelect && onSelect(row)}
            >
              {columns.map((c) => (
                <td key={c.key as string} className="px-4 py-3 text-gray-700">
                  {c.key === 'status' ? (
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        row[c.key] === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {row[c.key] === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  ) : (
                    row[c.key]
                  )}
                </td>
              ))}

              <td className="px-4 py-3 flex justify-end gap-3" onClick={(e) => e.stopPropagation()}>
                {onCreateVisit && (
                  <button
                    onClick={() => onCreateVisit(row)}
                    className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 cursor-pointer"
                  >
                    + Create Visit
                  </button>
                )}

                {portal !== 'doctor-portal' && onEdit && (
                  <button
                    onClick={() => onEdit(row)}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
