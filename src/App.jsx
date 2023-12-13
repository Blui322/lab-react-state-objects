// importing components and data
import Footer from "./Footer";
import Header from "./Header";
import menuItems from "./data";
import { useState } from "react";


// App component
function App() {

  // State for managing the current order and total price
  const [currentOrder, setCurrentOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

// Function to add an item to the current 
  const addToOrder = (item) => {
    setCurrentOrder([...currentOrder, item]);
    setTotalPrice(totalPrice + item.price);
  };


  // Fuction to remove an item to the current order
  const removeOrder = (index, price) => {
    const newOrder = [...currentOrder];
    newOrder.splice(index, 1);
    setCurrentOrder(newOrder);
    setTotalPrice(totalPrice - price);
  };


  //  Function to close the order, clears the current order and resets the total price
  const closeOrder = () =>{
    setCurrentOrder([]);
    setTotalPrice(0);
  };


  // Mapping through menu items to generate jsx for teh menu
  const menuItemsList = menuItems.map((item) => (
    <tr key={item.id} onClick={() => addToOrder(item)}>
      <td>
        {item.image}
      </td>
      <td className="item-name">
        <span>{item.name}</span>
        <br />
        <span>{"🌶".repeat(item.spiceLevel)}</span>
      </td>
      <td>${item.price.toFixed(2)}</td>
    </tr>
  ));


  // Mapping through current order items to generate jsx for teh current order
  const currentOrderItems = currentOrder.map((item, index) =>(
    <li key={index}>
      <span>❌</span>
      
      {item.name} - Quantity: {item.amount}- ${item.price.toFixed(2)}{" "}
      
      <button onClick={() => removeOrder(index, item.price)}></button>
    </li>
  ));


  // Function to tidy the order, combine items, updqate quantities, and adjust total cost
const tidyOrder = ()=>{

const newOrder = [];
const extraItem = {};


// count quantities of each item in the current order
currentOrder.forEach((item) =>{
  const itemName = item.name;
  if(extraItem[itemName]){
    extraItem[itemName]++;
  } else {
    extraItem[itemName] = 1;
  }
});


// Clear the current order and reset the total price
setCurrentOrder([]);
setTotalPrice(0);


// Build the updated order in newOrder and adjust the total cost
Object.keys(extraItem).forEach((itemName) => {
  const amount = extraItem[itemName];
  const ogItem = currentOrder.find((item) => item.name === itemName);
  if (ogItem){
    const newItem = {...ogItem, amount};
    newOrder.push(newItem);
    

  }
});

// Update the state with the newOrder
setCurrentOrder(newOrder);

// Calculate and set the total cost based on the newOrder
const newTotal = newOrder.reduce((total, item) =>total + item.price * item.amount, 0);
setTotalPrice(newTotal)
};



 // JSX structure for the main application
  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <table>
            <>{menuItemsList}</>
          </table>
        </aside>
        <section>
          <div>
            <h2>Current Order</h2>
            <ul>{currentOrderItems}</ul>
            <h4>Total: ${totalPrice.toFixed(2)}</h4>
            <div>
              <button onClick={tidyOrder}>Tidy order</button>
              <button onClick={closeOrder}>Close order</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Exporting the app component 
export default App;
