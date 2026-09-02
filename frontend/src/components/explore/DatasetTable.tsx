'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  FileSpreadsheet,
  Layers
} from 'lucide-react';
import { DatasetItem } from '@/data/explorerDatasets';

interface DatasetTableProps {
  dataset: DatasetItem;
  onDownloadCsv: () => void;
}

export default function DatasetTable({ dataset, onDownloadCsv }: DatasetTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string>(dataset.columns[0]?.name || '');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle sort toggle
  const handleSort = (colName: string) => {
    if (sortColumn === colName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(colName);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  // Filter & Sort Data
  const processedData = useMemo(() => {
    let list = [...dataset.sampleData];

    // Filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(q)
        )
      );
    }

    // Sort
    if (sortColumn) {
      list.sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];

        if (valA === undefined || valA === null) return 1;
        if (valB === undefined || valB === null) return -1;

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortDirection === 'asc' ? valA - valB : valB - valA;
        }

        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();
        if (strA < strB) return sortDirection === 'asc' ? -1 : 1;
        if (strA > strB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return list;
  }, [dataset.sampleData, searchTerm, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(processedData.length / rowsPerPage));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return processedData.slice(start, start + rowsPerPage);
  }, [processedData, currentPage, rowsPerPage]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
      
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search rows by date, value, station..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-200 focus:border-[#0F5167] focus:bg-white outline-none transition-all"
          />
        </div>

        {/* Right Actions: Rows per page & Download */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono">
            <span>Rows:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-slate-50 text-slate-800 border border-slate-200 rounded-lg px-2 py-1 outline-none text-xs cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <button
            onClick={onDownloadCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0F5167] hover:bg-[#093443] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>

      </div>

      {/* Tabular Grid */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 no-scrollbar">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-mono text-[11px]">
              <th className="py-3 px-4 font-bold text-slate-400 w-12">#</th>
              {dataset.columns.map((col) => {
                const isSorted = sortColumn === col.name;
                return (
                  <th
                    key={col.name}
                    onClick={() => handleSort(col.name)}
                    className="py-3 px-4 font-bold whitespace-nowrap cursor-pointer hover:text-[#0F5167] transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.label}</span>
                      {col.unit && <span className="text-[10px] text-slate-400 font-normal">({col.unit})</span>}
                      {isSorted ? (
                        sortDirection === 'asc' ? (
                          <ArrowUp className="w-3 h-3 text-[#0F5167]" />
                        ) : (
                          <ArrowDown className="w-3 h-3 text-[#0F5167]" />
                        )
                      ) : (
                        <ArrowUpDown className="w-3 h-3 text-slate-400 hover:text-slate-600" />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 font-mono">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => {
                const rowNum = (currentPage - 1) * rowsPerPage + idx + 1;
                return (
                  <tr
                    key={idx}
                    className="hover:bg-blue-50/40 transition-colors odd:bg-white even:bg-slate-50/60"
                  >
                    <td className="py-2.5 px-4 text-slate-400 text-[10px]">{rowNum}</td>
                    {dataset.columns.map((col) => {
                      const val = row[col.name];
                      const isNumeric = col.type === 'float64' || col.type === 'integer';
                      return (
                        <td key={col.name} className="py-2.5 px-4 whitespace-nowrap text-slate-800">
                          {isNumeric && typeof val === 'number'
                            ? val.toLocaleString(undefined, { maximumFractionDigits: 3 })
                            : val ?? '—'}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={dataset.columns.length + 1}
                  className="py-8 text-center text-slate-500 text-xs font-sans"
                >
                  No matching records found for "{searchTerm}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-xs text-slate-600">
        <div>
          Showing{' '}
          <span className="text-slate-900 font-mono font-bold">
            {processedData.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0}
          </span>{' '}
          to{' '}
          <span className="text-slate-900 font-mono font-bold">
            {Math.min(currentPage * rowsPerPage, processedData.length)}
          </span>{' '}
          of <span className="text-[#0F5167] font-mono font-bold">{processedData.length}</span> records
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs text-slate-600 px-2">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none text-slate-700 border border-slate-200 transition-colors cursor-pointer"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
