import { withAuth } from '../auth/withAuth';

const ProductShow = () => <h1>Product Show</h1>;

const ProductShowWithAuth = withAuth(ProductShow);

export { ProductShow, ProductShowWithAuth };
