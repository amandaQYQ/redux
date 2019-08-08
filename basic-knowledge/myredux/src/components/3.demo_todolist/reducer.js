
// 新增，展示，切换显示

function add(state = [], action) {
    switch (action.type) {
        case 'ADD':
            const { id, text, show } = action.add;
            // return Object.assign([], state, { id: id, text: text });
            return [...state, { id: id, text: text,show: show }];

        case 'SHOW':
            return Object.assign([], state, state.map(d => {
                if (d.id === action.id) {
                    return { ...d, show: !d.show }
                }else {
                    return d
                }
            }));
        case 'INVERSE':
            return state.map(d => {
                return {...d, show: !d.show}
            });
        case 'ALL':
            return state.map(d => {
                return {...d, show: true}
            });
        default:
            return state;
    }
}

export default add;
// function show(state = [], action) {
//     switch (action.type) {
//         case 'SHOW':
//             return Object.assign([], state, state.map(d => {
//                 if (d.id = action.id) {
//                     return { ...d, id: !d.id }
//                 }
//             }));
//         default:
//             return state;
//     }
// }

// function toggle(state = {}, action) {

// }