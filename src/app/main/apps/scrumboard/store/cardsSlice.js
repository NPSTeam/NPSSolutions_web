import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import _ from '@lodash';
import http from 'src/axios/ClassAxios';
import { removeList } from './listsSlice';
import { removeCard, updateCard } from './cardSlice';
import CardModel from '../model/CardModel';

export const getCards = createAsyncThunk('scrumboardApp/cards/getCards', async (boardId) => {
  const response = await http.get(`/api/v1/scrumboards/boards/${boardId}/cards`);
  const data = await response.data;

  return data;
});

export const newCard = createAsyncThunk(
  'scrumboardApp/cards/newCard',
  async ({ listId, newData }, { dispatch, getState }) => {
    const { board } = getState().scrumboardApp;

    // const response = await http.post(
    //   `/api/v1/scrumboards/boards/${board.id}/lists/${listId}/cards`,
    //   CardModel(newData)
    // );

    const newDataUpdated = { ...newData, boardId: board.id, listId };
    const response = await http.post(
      `/api/v1/scrumboards/boards/${board.id}/cards`,
      CardModel(newDataUpdated)
    );
    const data = await response.data;

    return data;
  }
);

const cardsAdapter = createEntityAdapter({});

export const { selectAll: selectCards, selectById: selectCardById } = cardsAdapter.getSelectors(
  (state) => state.scrumboardApp.cards
);

const cardsSlice = createSlice({
  name: 'scrumboardApp/cards',
  initialState: cardsAdapter.getInitialState({}),
  reducers: {
    resetCards: (state, action) => {},
  },
  extraReducers: {
    [getCards.fulfilled]: cardsAdapter.setAll,
    [removeList.fulfilled]: (state, action) => {
      const listId = action.payload;
      const { selectAll } = cardsAdapter.getSelectors();
      const cards = selectAll(state);
      const removedCardIds = _.map(_.filter(cards, { listId }), 'id');
      return cardsAdapter.removeMany(state, removedCardIds);
    },
    [newCard.fulfilled]: cardsAdapter.addOne,
    [updateCard.fulfilled]: cardsAdapter.setOne,
    [removeCard.fulfilled]: cardsAdapter.removeOne,
  },
});

export const { resetCards } = cardsSlice.actions;

export default cardsSlice.reducer;
