import { useState } from 'react'
import './App.css'

function App() {
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];
  const [addedProducts, setAddedProducts] = useState([]);
  console.log(addedProducts);

  const addToCart = product => { 
    const isProductAlreadyAdded = addedProducts.some(p => p.name === product.name);
    if(isProductAlreadyAdded){
        updateProductQuantity(product.name, 1);
        return;
    }
    setAddedProducts(curr => [
        ...curr,
        {
            ...product,
            quantity: 1
        }
    ]);
  };

  const updateProductQuantity = (productName, quantity) => {
    setAddedProducts(curr => curr.map(p => 
      p.name === productName ? { ...p, quantity: p.quantity + quantity } : p
    ));
  };

  const removeFromCart = productName => {
    setAddedProducts(curr => curr.filter(p => p.name !== productName));
  };

  const calculateTotal = () => {
    return addedProducts.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
  };

  return (
    <>
      <h1> prodotti tra cui scegliere</h1>
      <ul>
        {products.map((p, i ) => (		
            <li key={i}>
                <p>{p.name}({p.price.toFixed(2)}$)</p>
                <button onClick={()=>addToCart(p)}>Aggiungi al carrello</button>
            </li>
        ))}
      </ul>
      {addedProducts.length > 0 && (<>
        <h2>Carrello</h2>
        <ul>{addedProducts.map((p,i)=>(
            <li key={i}>
                <p>{p.name}({p.price.toFixed(2)}$) x {p.quantity}</p>
                <button onClick={() => updateProductQuantity(p.name, -1)} disabled={p.quantity === 1}>-</button>
                <button onClick={() => updateProductQuantity(p.name, 1)}>+</button>
                <button onClick={() => removeFromCart(p.name)}>Rimuovi dal carrello</button>
            </li>
        ))}</ul>
        <h3>Totale: {calculateTotal()}$</h3>
      </>)}
    </>
  )
}

export default App