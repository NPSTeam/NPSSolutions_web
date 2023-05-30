/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
export function checkDefined(params) {
  if (params === undefined || params === null) return false;
  return params.toString();
}

export function convertArrayIDs(array) {
  if (!array.length) return '';
  const result = [];
  [...array].forEach((item) => {
    result.push(item.userUUID);
  });
  return result;
}

export function arrayToString(array) {
  if (!array?.length) return '';

  return array.join();
}

export function matchItemToArray(listItem, array) {
  let matchedArray = [];
  listItem.forEach((user) => {
    const foundUser = array.find((role) => role.uuid === user.userUUID);
    if (foundUser) {
      matchedArray = [
        ...matchedArray,
        {
          ...foundUser,
          type: user.type,
          totalTaskArea: user.totalTaskArea,
          totalFlights: user.totalFlights,
          totalFlightDuration: user.totalFlightDuration,
        },
      ];
    }
  });
  return matchedArray;
}

export function formatPolygon(list) {
  const result = [];
  [...list].forEach((item) => {
    result.push([item.latitude, item.longitude]);
  });
  return result;
}

/**
 * name -> name of params for checking
 * value -> value of param
 * source -> checking in here
 * */
export function checkParamsExist(name, value, source) {
  if (!source.length) return false;

  [...source].forEach((item) => {
    if (item[name] === value) return true;
  });
  return false;
}

export function checkedBackPaging(pageSize, pageIndex, totalItems) {
  if (totalItems === pageSize * pageIndex) return true;
  return false;
}
