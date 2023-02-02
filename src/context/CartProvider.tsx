import { useReducer, useMemo, createContext, ReactElement } from 'react'

export type CartItemType = {
    sku: string,
    name: string,
    price: number,
    qty: number,
}

// the type of cart is an array of cart items
type CartStateType = { cart: CartItemType[] }

// initialize an empty cart of the type created above
const initCartState: CartStateType = { cart: [] }

// the types of cart actions to handle
const REDUCER_ACTION_TYPE = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    QUANTITY: 'QUANTITY',
    SUBMIT: 'SUBMIT',
}

// create the type for the reducer actions
export type ReducerActionType = typeof REDUCER_ACTION_TYPE

// create the type to reduce an action
export type ReducerAction = {
    type: string,
    payload?: CartItemType,
}

// create the reducer itself
const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload) {
                throw new Error('action.payload missing in ADD action')
            }
            // from action unpack / destructure the item
            const { sku, name, price } = action.payload

            // create a filtered cart of the other items
            const filteredCart: CartItemType[] = state.cart.filtered(item => item.sku !== sku)

            // check if the new item is in the cart
            // note if the item isn't found, then it's undefined
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)

            // if the item was found, then increase its quantity
            // otherwise set quantity to one
            const qty: number = itemExists ? intemExists.qty + 1 : 1

            // spread state of the original cart
            // cart: is the new cart array with the added item
            return { ...state, cart: [ ...filteredCart, { sku, name, price, qty }]}
        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) {
                throw new Error('action.payload missing in REMOVE action')
            }
            // grab the screw of the item to remove
            const { sku } = action.payload

            // create a filtered cart of the remaining items
            const filteredCart: CartItemType[] = state.cart.filtered(item => item.sku !== sku)

            // spread state of the original cart
            // cart: is an array from the filtered cart items 
            return { ...state, cart: [ ...filteredCart ]}
        }
        case REDUCER_ACTION_TYPE.QUANTITY: {
            if (!action.payload) {
                throw new Error('action.payload missing in QUANTITY action')
            }
            // from action unpack / destructure the item
            const { sku, qty } = action.payload

            // check if the new item is in the cart
            // note if the item isn't found, then it's undefined
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)

            // if the item isn't in the cart
            if (!itemExists) {
                throw new Error('Item must exist to update quantity')
            }

            // spread in the item with the new quantity
            const updatedItem: CartItemType = { ...itemExists, qty }

            // create a filtered cart for the remaining items
            const filteredCart: CartItemType[] = state.cart.filtered(item => item.sku !== sku)

            // spread state of the original cart
            // cart: is an array from the filtered cart items and the updated item
            return { ...state, cart: [ ...filteredCart, updatedItem ]}
        }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            return { ...state, cart: [] }
            // TODO process payment
            // if(success):
                // create a ticket
                // update database 
        }
        default:
            throw new Error('Unidentified reducer action type');
            
    }
}

const useCartContext = (initCartState: CartStateType) => {
    const [state, dispatch] = useReducer(reducer, initCartState)

    // helps to prevent page refresh
    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, [])

    // get item count
    const totalItems = state.cart.reduce((previousValue, cartItem) => {
        return previousValue + cartItem.qty
    }, 0)

    // with total items calculate the new price
    const totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        state.cart.reduce((previousValue, cartItem) => {
            return previousValue + (cartItem.qty * cartItem.price)
        }, 0)
    )

    // to sort cart in order
    const cart = state.cart.sort((a, b) => {
        // item.sku: "item0001", ie slicing item to sort by 0001, etc.
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))
        return itemA - itemB
    })

    return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }
}

export type UseCartContextType = ReturnType<typeof useCartContext>

const initCartContextState: UseCartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: '',
    cart: [],
}

export const CartContext = createContext<UseCartContextType>(initCartContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext