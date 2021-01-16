 import cloneDeep from 'lodash/cloneDeep';

 const applyChanges = (stateTo) => {
     const ret = stateTo.list.filter(c => {
             return stateTo.filter == 0 ? true : stateTo.filter == 1 ? !c.closed : stateTo.filter == 2 ? c.closed : true
         }).filter(c => c.symbol && (c.symbol.toLowerCase().indexOf(stateTo.search.toLowerCase()) != -1 || stateTo.search == '' || stateTo.search == undefined))
         .sort((a, b) => {
             if (a[stateTo.sort_column] > b[stateTo.sort_column])
                 return stateTo.sort_dir == 0 ? 1 : -1;
             if (a[stateTo.sort_column] < b[stateTo.sort_column])
                 return stateTo.sort_dir == 0 ? -1 : 1;
             return 0;
         });
     stateTo.listLength = ret.length;
     stateTo.list_page = ret.slice(stateTo.page_cur * stateTo.page_rows, (stateTo.page_cur + 1) * stateTo.page_rows);
     return ret;

 }


 export default (stateBAK, action) => {

     const state = cloneDeep(stateBAK);
     state.call = false;
     switch (action.type) {
         case 'stopcall':

             return state;
         case 'recall':
             state.call = true;
             return state;
         case 'search':
             state.page_cur = 0;
             state.search = action.value;

             applyChanges(state);;
             return state;
         case 'filter':
             state.page_cur = 0;
             state.filter = action.value;

             applyChanges(state);;
             return state;
         case 'sort':
             state.sort_column = action.value.sort_column;
             state.sort_dir = action.value.sort_dir;

             applyChanges(state);
             return state;
         case 'page':

             if (state.page_cur + action.value >= 0 && (state.page_cur + action.value) <= Math.floor(state.listLength / state.page_rows)) {
                 state.page_cur = state.page_cur + action.value;
                 applyChanges(state);

             }

             return state;
         case 'lists':



             state.list = action.value.list.map(d => {

                 if (!d.closed && state.list.find(s => s.order == d.order)) {
                     const lastprofit = state.list.find(s => s.order == d.order).profit;
                     const lastprofit_dir = state.list.find(s => s.order == d.order).profit_dir;
                     if (lastprofit < d.profit)
                         d.profit_dir = 1;
                     else if (lastprofit > d.profit) d.profit_dir = -1
                     else d.profit_dir = lastprofit_dir ? lastprofit_dir + lastprofit_dir : 0;


                 }
                 return d;
             });
             applyChanges(state);
             const sums = state.list.reduce(function(accum, value, index) {
                 if (value.closed)
                     accum.consolidated += value.profit;
                 else accum.current += value.profit;
                 return accum;
             }, {
                 consolidated: 0,
                 current: 0
             });
             state.profitSum_dir = sums.current > parseFloat(state.profitSum) ? 1 : sums.current < parseFloat(state.profitSum) ? -1 : state.profitSum_dir ? state.profitSum_dir + state.profitSum_dir : 0;
             state.profitSum = sums.current.toFixed(2);

             state.profitSumConsolidated = sums.consolidated.toFixed(2);
             return state;
         case 'list':
             state.list = action.value.list;
             return state;
         default:
             throw new Error();
     }
 }