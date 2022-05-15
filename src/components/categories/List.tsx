import { Link } from 'react-router-dom';
import { Delete, Download, Edit, ShoppingBag, Upload } from '@mui/icons-material';
import { DataGrid, GridActionsCellItem, GridColumns, GridRowParams } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';
import toast from 'react-hot-toast';
import { useRootState } from '../../providers';
import uploadFile from '../../services/upload';
import { Category } from '../../types';

interface Props { data: Category[]; }

export default function CategoryList({ data = [] }: Props) {

  const { actions } = useRootState();

  const columns: GridColumns<Category> = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 300 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 200,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem 
          icon={<Tooltip title="Delete this category"><Delete /></Tooltip>} 
          onClick={() => {
            actions?.category.remove(params.row.id)
              .then(() => toast.success('category removed!'))
              .catch(error => {
                console.error(error);
                toast.error('error to remove category!');
              });
          }}
          label="Delete"
        />,
        <Link to={`/categories/${params.row.id}/edit`}>
          <GridActionsCellItem 
            icon={<Tooltip title="Edit this category"><Edit /></Tooltip>}
            label="Edit"
          />
        </Link>,
        // <UploadProducts id={params.row.id} params={params} />,
        <GridActionsCellItem 
          icon={
            <Tooltip title={`Import products from this category ${params.row.id}`}>
              <Upload onClick={() => uploadFile(params.row.id)} />
            </Tooltip>
          } 
          label="Import"
        />,
        <Tooltip title="Export products in this category">
          <a href={`${process.env.REACT_APP_API_BASE_URL}/api/products/${params.row.id}/export`}>
            <GridActionsCellItem icon={<Download />} label="Export" />
          </a>
        </Tooltip>,
        <Tooltip title="See the products in this category">
          <Link to={`/categories/${params.row.id}/products`}>
            <GridActionsCellItem icon={<ShoppingBag />} label="Products" />
          </Link>
        </Tooltip>,
      ]
    }
  ];

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
