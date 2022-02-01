import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { LoginContext } from '../../contexts/LoginContext';
import axios from 'axios';
import { API_URL } from '../../Constants';
import {useHistory} from 'react-router-dom';

function CartItems() {

    let history = useHistory();
    const { cartItems, removeItemFromCart, cartSummary, afterPurchase } = useContext(CartContext)
    const [items, setItems] = useState(cartItems);
    const { loggedInUser, refreshLoginDetails } = useContext(LoginContext);
    const { availableRedeemPoints } = loggedInUser

    const removeItem = (c) => {

        removeItemFromCart(c);
        setItems(cartItems);

    }

    const purchaseOrder = () => {
        /**
         * pass appropriate attributes of orderdata
         * quantity will be always 1.
         */
         let orderData = {
            quantity: 1
        }
        axios.post(API_URL+"history/",orderData )
            .then ( response => {

                 /**
                 * insert appropriate code after order-purchase.
                 * redirect to order confirm page
                 * refresh the login details
                 * call the appropriate method from the cart the context to update the cart details.
                 */
                

            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response);
                    
                } else if (error.request) {
                    console.log(error.request);
                    

                }
            })
    }

    return (

        <div className="">
            <div className="row">
                <div className="col-md-8">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Redeemption Points</th>
                            </tr>

                        </thead>

                        <tbody>
                            {
                                cartItems.map(c => (
                                    <tr key={c.id}>
                                        <td>{c.item}</td>
                                        <td>1</td>
                                        <td>{c.redeemptionPoint}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={() => removeItem(c)}>
                                                <i className="fas fa-trash"></i>&nbsp;Remove
                                    </button>
                                        </td>
                                    </tr>
                                ))

                            }
                        </tbody>

                    </table>
                </div>
                <div className="col-md-4">
                    <h5>Final Redeemption Summary</h5>
                    <hr></hr>
                    <div>
                        <h6>Total Redeemption Points - {cartSummary.totalRedeemPoints}</h6>
                    </div>
                    <div>
                        <h6>Total Amount - {cartSummary.totalAmount}</h6>
                    </div>
                    <br /> <br /><hr></hr>

                    {
                        (cartSummary.totalRedeemPoints - availableRedeemPoints > 0) ?
                            (
                                <div>
                                    <h6 style={{color: "red"}}>
                                        <i>Insufficient Reward Points. Remove items from cart.</i>
                                    </h6>
                                    <div style={{ float: "right" }}>
                                        <button className="btn btn-primary" disabled>
                                            Place Order
                                        </button>
                                    </div>
                                </div>
                            ) :
                            (
                                <div>
                                    
                                    <div style={{ float: "right" }}>
                                        <button className="btn btn-primary" onClick={purchaseOrder}>
                                            Place Order
                                        </button>
                                    </div>
                                </div>
                            )
                    }


                </div>
            </div>


        </div>

    );
}

export default CartItems;