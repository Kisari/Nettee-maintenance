const initialState = {
    status: "success",
    results: 0,
    data: {
        threadData: {},
    },
    newThread: null
}
export default function threadReducer(thread = initialState, action) {
    switch (action.type) {
        case 'FETCH_ALL':
            return [{ ...thread.data }, action.payload];
        case 'CREATE':
            return { ...thread.newThread, newThread: action.payload };
        default:
            return thread;
    }
}
