import useFetch from '../hooks/useFetch';

export default function ProductList() {
    // One line of code to handle all fetching logic

    const { data: products, loading, error } = useFetch('https://fakestoreapi.com/products')

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            <h2>Products</h2>
            <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left' }}>
                {products?.map((product) => (
                    <li key={product.id}>{product.id}. {product.title}</li>
                ))}
            </ul>
        </div>
    );
}
