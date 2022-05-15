import { Delete, Edit } from '@mui/icons-material';
import { DataGrid, GridActionsCellItem, GridColumns, GridRowParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useRootState } from '../../providers';
import { Product } from '../../types';

interface Props {
  data: Product[];
  category?: string;
}

export default function ProductList({ category, data = [] }: Props) {
  const { actions } = useRootState();

  const columns: GridColumns<Product> = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name',  width: 200 },
    { field: 'price', headerName: 'Price', type: 'number', width: 130 },
    { field: 'category', headerName: 'Category', width: 130 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem icon={<Delete />} onClick={() => handleDelete(params.row.id)} label="Delete" />,
        <Link to={`/categories/${category}/products/${params.row.id}/edit`}>
          <GridActionsCellItem icon={<Edit />} label="Edit" />,
        </Link>
      ]
    }
  ];

  async function handleDelete(id: string) {
    try {
      await actions?.product.remove(id);
      toast.success('product removed!');
    } catch(error) {
      console.error(error);
      toast.success('error to remove product!');
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
        isRowSelectable={() => false}
      />
    </div>
  );
}
