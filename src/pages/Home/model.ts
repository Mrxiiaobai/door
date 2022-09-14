export default {
  namespace: 'homeModel',

  state: {
	  visible:false,
    currentCard: {},

    formValue:{}
  },
  
  effects: {
		*setFormBox({ payload, callback }:any, { call, put }) {
      yield put({
        type: 'saveFormBox',
        payload,
      })
      yield callback && callback()
    },

    *setCards({ payload, callback }:any, { call, put }) {
      yield put({
        type: 'save',
        payload,
      })
      yield callback && callback()
    },
  },

	reducers: {
    saveFormBox(state, { payload }) {
      const { visible, currentCard } = payload
      return {
        ...state,
        visible,
        currentCard,
      }
    },
  }
};