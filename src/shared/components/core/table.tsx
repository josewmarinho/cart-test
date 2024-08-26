import DataTable, { TableStyles } from 'react-data-table-component';
import { Loader2 } from 'lucide-react';

interface TableProps<T> {
  data: T[];
  columns: Column[];
  title?: React.ReactNode;
  isLoading?: boolean;
  page: number;
  perPage: number;
  totalRows: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

type Column = {};

function Table<T>({
  data,
  columns,
  title,
  isLoading,
  perPage,
  totalRows,
  onPageChange,
  onPerPageChange,
}: TableProps<T>) {
  const customStyles = {
    headCells: {
      style: {
        fontSize: '14px',
        color: '#717171',
        fontWeight: '600',
        paddingLeft: '4px',
        paddingRight: '16px',
      },
    },
    cells: {
      style: {
        fontSize: '12px',
        paddingLeft: '4px',
      },
    },
    headRow: {
      style: {
        borderBottomWidth: 'none',
      },
    },
    rows: {
      style: {
        backgroundColor: 'rgb(230, 61df, 244)',
        borderBottomColor: '#ffffff',
        outline: '1px solid #ffffff',
      },
    },
    pagination: {
      style: {
        fontSize: '11px',
        border: 'none',
      },
    },
  };

  const NoDataComponent = () => (
    <div className="text-gray-500 mb-12 text-center">
      Nenhum registro encontrado.
    </div>
  );

  const CustomLoader = () => (
    <div className="flex items-center justify-center p-6">
      <div className="relative flex flex-col">
        <Loader2
          color="#3d3d3d"
          className="h-30 w-30 animate-spin"
          strokeWidth={1}
        />
      </div>
      <div className="animate ml-4">Carregando...</div>
    </div>
  );

  return (
    <div className="relative w-full rounded-[10px]">
      {title && (
        <div className="mb-86 -ml-4 p-5 text-2xl font-semibold">{title}</div>
      )}
      <DataTable
        customStyles={customStyles as TableStyles}
        columns={columns}
        data={data}
        pagination
        paginationServer
        paginationPerPage={perPage}
        paginationRowsPerPageOptions={[12, 24, 36, 48]}
        paginationTotalRows={totalRows}
        onChangePage={onPageChange}
        onChangeRowsPerPage={(newPerPage) => {
          onPageChange(1);
          onPerPageChange(newPerPage);
        }}
        paginationComponentOptions={{
          rowsPerPageText: 'Itens por página',
          rangeSeparatorText: 'de',
        }}
        fixedHeader
        noDataComponent={<NoDataComponent />}
        progressPending={isLoading}
        progressComponent={<CustomLoader />}
      />
    </div>
  );
}

export default Table;
