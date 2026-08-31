const ProductList = ({ data, title }: { data: undefined; title?: string }) => {
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4"> {title}</h2>
    </div>
  );
};

export default ProductList;
