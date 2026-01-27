import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

interface CommonTableProps<T> {
  title: string;
  columns: TableColumn<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onSelect?: (row: T) => void;
  onCreateVisit?: (row: T) => void;
  searchKey?: keyof T;
  showActions?: boolean;
  stickyHeader?: boolean;
}

interface TableRow {
  id: number | string;
  [key: string]: any;
}

const CommonTable = <T extends TableRow>({
  title,
  columns,
  data,
  onEdit,
  onDelete,
  onCreateVisit,
  onSelect,
  searchKey,
  showActions = true,
  stickyHeader = true,
}: CommonTableProps<T>) => {
  const [search, setSearch] = useState('');
  const [tableHeight, setTableHeight] = useState<number>(500); // Default fallback
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const portal = location.pathname.split('/')[1];
  const navigate = useNavigate();

  // Calculate dynamic table height
  useEffect(() => {
    const calculateHeight = () => {
      if (containerRef.current && headerRef.current && searchRef.current) {
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const headerHeight = headerRef.current.offsetHeight;
        const searchHeight = searchRef.current.offsetHeight;
        const footerHeight = 80; // Row count footer
        const padding = 48; // Container padding (p-6 = 24px top + 24px bottom)
        const bottomMargin = 10; // Space from bottom of viewport

        const availableHeight = window.innerHeight - containerTop - padding - bottomMargin;
        const tableBodyHeight = availableHeight - headerHeight - searchHeight - footerHeight;

        // Set minimum height to avoid too small tables
        const finalHeight = Math.max(tableBodyHeight, 300);
        setTableHeight(finalHeight);
      }
    };

    // Calculate on mount and resize
    calculateHeight();
    window.addEventListener('resize', calculateHeight);

    // Recalculate after a short delay to account for dynamic content
    const timeoutId = setTimeout(calculateHeight, 100);

    return () => {
      window.removeEventListener('resize', calculateHeight);
      clearTimeout(timeoutId);
    };
  }, [data.length]); // Recalculate when data changes

  // Dynamic filtering
  const filteredData = data.filter((row) => {
    if (!search) return true;

    if (searchKey) {
      const value = row[searchKey];
      return String(value).toLowerCase().includes(search.toLowerCase());
    }

    return columns.some((col) => {
      const value = row[col.key];
      return String(value).toLowerCase().includes(search.toLowerCase());
    });
  });

  // Default cell renderer
  const renderCell = (column: TableColumn<T>, row: T) => {
    const value = row[column.key];

    if (column.render) {
      return column.render(value, row);
    }

    if (value === null || value === undefined) {
      return <span className="text-gray-400">—</span>;
    }

    if (typeof value === 'boolean') {
      return (
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${
            value ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
          }`}
        >
          {value ? 'Yes' : 'No'}
        </span>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return <span className="text-gray-500">{JSON.stringify(value)}</span>;
    }

    return <span>{String(value)}</span>;
  };

  const shouldShowActions =
    showActions && portal !== 'doctor-portal' && (onEdit || onDelete || onCreateVisit);

  return (
    <div ref={containerRef} className="bg-white p-6 rounded-xl shadow-sm flex flex-col h-full">
      {/* Title / Header */}
      <div ref={headerRef} className="flex items-center gap-3 mb-4">
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
      <div ref={searchRef} className="mb-4 relative w-full max-w-md">
        <input
          type="text"
          placeholder={`Search${searchKey ? ` by ${String(searchKey)}` : ''}...`}
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

      {/* Table Container with Dynamic Height */}
      <div className="overflow-hidden border border-gray-200 rounded-lg flex flex-col flex-1">
        {/* Scrollable Table Body */}
        <div className="overflow-x-auto overflow-y-auto" style={{ height: `${tableHeight}px` }}>
          <table className="w-full border-collapse">
            {/* Sticky Header */}
            <thead className={stickyHeader ? 'sticky top-0 z-10' : ''}>
              <tr className="bg-gray-50 text-sm text-gray-600">
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className="px-4 py-3 text-left whitespace-nowrap font-semibold border-b-2 border-gray-200 bg-gray-50"
                    style={{ width: column.width }}
                  >
                    {column.label}
                  </th>
                ))}
                {shouldShowActions && (
                  <th className="px-4 py-3 text-right font-semibold border-b-2 border-gray-200 sticky right-0 bg-gray-50">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (shouldShowActions ? 1 : 0)}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    {search ? 'No matching results found' : 'No data available'}
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                      onSelect ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => onSelect && onSelect(row)}
                  >
                    {columns.map((column) => (
                      <td key={String(column.key)} className="px-4 py-3 text-gray-700">
                        {renderCell(column, row)}
                      </td>
                    ))}
                    {shouldShowActions && (
                      <td
                        className="px-4 py-3 sticky right-0 bg-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-end gap-3">
                          {onCreateVisit && (
                            <button
                              onClick={() => onCreateVisit(row)}
                              className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
                            >
                              + Create Visit
                            </button>
                          )}
                          {onEdit && (
                            <button
                              onClick={() => onEdit(row)}
                              className="text-blue-600 hover:underline whitespace-nowrap"
                            >
                              Edit
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(row)}
                              className="text-red-600 hover:underline whitespace-nowrap"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CommonTable;
