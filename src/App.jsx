// importing components and data
import Footer from "./Footer";
import Header from "./Header";
import menuItems from "./data";
import { useState } from "react";
 // This section imports required components (Footer and Header), menu item data (menuItems), and the useState hook from React.

// App component
function App() {

  // State for managing the current order and total price
  const [currentOrder, setCurrentOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  // Here, the App component is defined, and state variables (currentOrder and totalPrice) are initialized using the useState hook.



// Function to add an item to the current 
  const addToOrder = (item) => {
    setCurrentOrder([...currentOrder, item]);
    setTotalPrice(totalPrice + item.price);
  };
// This function (addToOrder) is responsible for adding an item to the current order. It uses the spread operator (...) to create a new array with the existing order items and adds the new item. The total price is also updated accordingly.



  // Fuction to remove an item to the current order
  const removeOrder = (index, price) => {
    const newOrder = [...currentOrder];
    newOrder.splice(index, 1);
    setCurrentOrder(newOrder);
    setTotalPrice(totalPrice - price);
  };
  //The removeOrder function removes an item from the current order based on its index. It creates a new array (newOrder) by copying the existing order, removes the specified item, and updates both the current order and total price.



  //  Function to close the order, clears the current order and resets the total price
  const closeOrder = () =>{
    setCurrentOrder([]);
    setTotalPrice(0);
  };
  //closeOrder clears the current order and resets the total price to zero, effectively closing the current order.




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
  //This code maps through menuItems to generate JSX for each menu item. It creates a table row (<tr>) for each item, displaying the image, name, spice level (with chili pepper emojis), and price. The onClick handler is set to add the corresponding item to the current order when clicked.




  // Mapping through current order items to generate jsx for teh current order
  const currentOrderItems = currentOrder.map((item, index) =>(
    <li key={index}>
      <span onClick={() => removeOrder(index, item.price)}>❌
      
      {item.name} - Quantity: {item.amount} - ${item.price.toFixed(2)}{" "}
      </span>
      
    </li>
  ));
  //This section maps through currentOrder items to generate JSX for the current order. It displays each item's name, quantity, price, and a button with an '❌' icon to remove the item when clicked.




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
const newTotal = newOrder.reduce((total, item) =>total + (item.price * item.amount), 0);
setTotalPrice(newTotal)
};
// tidyOrder function combines items with the same name, updates quantities, and adjusts the total cost accordingly. It counts the quantities of each item in the currentOrder, then builds a new order (newOrder) with combined items and adjusted quantities. Finally, it updates the state with the new order and sets the total price.




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
//The JSX structure for the main application is returned. It includes the header, menu, current order, total price, and buttons for tidying and closing the order.

// Exporting the app component 
export default App;
