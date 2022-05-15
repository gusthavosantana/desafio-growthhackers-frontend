import toast from 'react-hot-toast';
import ProductsService from '../Products';

const productsService = new ProductsService();

function uploadFile(category: string) {
  const fileElement = window.document.createElement('input', );
  fileElement.type = 'file';
  fileElement.accept = 'application/json';

  fileElement.addEventListener('change', async (e) => {
    const formData = new FormData();
    const files = fileElement.files as FileList;
    formData.append('file', files.item(0) as File);

    await productsService.import(category, formData);

    toast.success('file imported!');
  });

  fileElement.click();
}

export default uploadFile;