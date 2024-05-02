import type { CartProduct } from '@/interfaces'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';



interface State {
    cart: CartProduct[];

    getTotalItems: () => number;

    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    };

    addProductToCart: (product: CartProduct) => void;

    updatedProductQuantity: (product: CartProduct, quantity: number) => void;

    deletedProduct: (product: CartProduct) => void;
}


export const useCartStore = create<State>()(

    persist(
        (set, get) => ({

            cart: [],
        
            //Methods

            getTotalItems: () => {
                const {cart} = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },

            getSummaryInformation: () => {
                const {cart} = get();

                const subTotal = cart.reduce(
                    (subtotal, product) => (product.quantity * product.price) + subtotal, 
                    0
                    );
                const tax = subTotal * 0.15;
                const total = subTotal + tax;
                const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

                return {
                    subTotal, tax, total, itemsInCart
                }
            },
        
            addProductToCart: (product: CartProduct) => {
                const {cart} = get();
                // 1.Revisar si el producto existe en el carrito con la talla seleccionada.
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                );
        
                if (!productInCart) {
                    set({cart: [...cart, product]});
                    return;
                }
        
                // 2.Se que el producto existe por talla, tengo que incrementarlo
                const updatedCartProducts = cart.map((item) => {
                    if(item.id === product.id && item.size === product.size) {
                        return {...item, quantity: item.quantity + product.quantity}
                    }
        
                    return item;
                });
        
                set({cart: updatedCartProducts});
            },

            updatedProductQuantity: (product: CartProduct, quantity: number) => {
                const {cart} = get();

                const updatedCartProducts = cart.map(item => {
                    if(item.id === product.id && item.size === product.size) {
                        return {...item, quantity: quantity};
                    }

                    return item;
                });

                set({cart: updatedCartProducts});
            },

            deletedProduct: (product: CartProduct) => {
                const {cart} = get();

                const updatedCartProducts = cart.filter( 
                    (item) => item.id !== product.id || item.size !== product.size); 
        
                set({cart: updatedCartProducts});
            },
        }),
        {
            name: 'shopping-cart',
        }
    )
    
    
)