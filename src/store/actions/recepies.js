import * as actionTypes from './actionTypes';
import axios from 'axios';
import firebase from 'firebase';

export const saveRecepieSuccess = (id, recepie) => {
  return {
    type: actionTypes.SAVE_RECEPIE_SUCCESS,
    id,
    recepie
  }
}

export const saveRecepieFail = (error) => {
  return {
    type: actionTypes.SAVE_RECEPIE_FAIL,
    error
  }
}

export const saveRecepie = (recepie, token) => {
  return dispatch => {
    axios.post('https://to-do-app-a449a.firebaseio.com/recepies.json?auth=' + token, recepie)
      .then(response => {
        dispatch(saveRecepieSuccess(response.data.name, recepie))
      })
      .catch(err => dispatch(saveRecepieFail(err)))
  }
}

export const changeRecepieValueSuccess = (recepie) => {
  return {
    type: actionTypes.CHANGE_RECEPIE_SUCCESS,
    recepie
  }
}

export const changeRecepieValues = (recepie) => {
  return dispatch => {
    firebase.database().ref('recepies/' + recepie.id).set({
      ...recepie
    })
    dispatch(changeRecepieValueSuccess(recepie))
  }
}

export const removeRecepieSuccess = (id) => {
  return {
    type: actionTypes.REMOVE_RECEPIE_SUCCESS,
    id
  }
}

export const removeRecepie = (id) => {
  return dispatch => {
    firebase.database().ref('recepies/' + id).remove()
    dispatch(removeRecepieSuccess(id))
  }
}

export const fetchRecepiesStart = () => {
  return {
    type: actionTypes.FETCH_RECEPIES_START
  }
}

export const fetchRecepiesSuccess = (fetchedData) => {
  return {
    type: actionTypes.FETCH_RECEPIES_SUCCESS,
    fetchedData
  }
}

export const fetchRecepiesFail = (error) => {
  return {
    type: actionTypes.FETCH_RECEPIES_FAIL,
    error
  }
}

export const fetchRecepies = (token, userId) => {
  return dispatch => {
    dispatch(fetchRecepiesStart())
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('https://to-do-app-a449a.firebaseio.com/recepies.json' + queryParams)
      .then(res => {
        const fetchedData = [];
        for (let key in res.data) {
          fetchedData.push({
            ...res.data[key],
            id: key
          })
        }
        dispatch(fetchRecepiesSuccess(fetchedData))
      })
      .catch(err => dispatch(fetchRecepiesFail(err)))
  }
}