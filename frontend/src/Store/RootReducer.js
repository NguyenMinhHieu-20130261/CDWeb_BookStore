const initState = {
    newsCates: [],
    indexList: [],
    currentListOfCate: [],
    currentNewsDetails: null,
    viewed: []
}
export const root = (state = initState, action) => {
    switch (action.type) {
        case "product/load": {
            return {
                ...state,
                products: action.payload
            }
        }
        case "cart/add": {
            return {
                ...state,
                cart: [
                ]
            }
        }
        default:
            return state;
    }
}