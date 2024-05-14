export const crudActions = (update, currentData) => {
    console.log("Current data:", currentData);
    if (!update || !update.payload) {
        console.error('Invalid update format:', update);
        return currentData;
    }

    const { type, payload } = update;
    if (!payload || typeof payload !== 'object' || !payload.id) {
        console.error('Invalid data format or missing id in update:', update);
        return currentData;
    }

    switch (type) {
        case 'add':
            return currentData.some(item => item.id === payload.id) ? currentData : [...currentData, payload];
        case 'remove':
            return currentData.filter(item => item.id !== payload.id);
        case 'update':
            return currentData.map(item => item.id === payload.id ? { ...item, ...payload } : item);
        default:
            console.error('Unhandled update type:', type);
            return currentData;
    }
};
