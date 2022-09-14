export default {
  namespace: 'box',

  state: {
		positionDirection:null,
  },
  
  effects: {
		*changePosition({ payload }:any, { callback, put }:any){
      // positionDirection
      // const response = yield call(queryAppList, payload);
      // if (response && response.code === 0) {
      yield put({
        type: 'savePosition',
        payload,
      })
      // }
    }
  },

	reducers: {
    savePosition(state:any, { payload }: any) {
      return {
        ...state,
        positionDirection: payload,
      };
    },
  }
};