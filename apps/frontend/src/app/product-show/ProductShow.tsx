const ProductShow = () => {
  console.log('ProductShow');
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return (
    <h1>Product Show</h1>
  );
};

export { ProductShow };
