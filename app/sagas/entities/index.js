import {
  all, race,
  call,
} from 'redux-saga/effects';
import { getAllSamples } from '../../api/bot';

export function* fetchEntitiesList() {
  const { response } = yield call(getAllSamples);
  const { data } = response;
  const entityArr = data.reduce((acc, value) => [...acc, ...value.entities], []);

  const entityList = entityArr.reduce((acc, entity) => {
    const values = (acc[entity.entity] || {}).values || [];
    return ({
      ...acc,
      [entity.entity]: {
        name: entity.entity,
        values: [...values, {
          value: entity.value,
          expressions: [entity.value],
        }],
      },
    });
  }, {});
  console.log(entityList);
  const normalizedEntityList = [];
  const entityKeyList = Object.keys(entityList);
  for (let i = 0; i < entityKeyList.length; i += 1) {
    const currEntity = entityList[entityKeyList[i]];
    const valueSet = {};
    for (let j = 0; j < currEntity.values.length; j += 1) {
      const currValue = currEntity.values[j];
      if (!valueSet[currValue.value]) valueSet[currValue.value] = new Set([currValue.expressions[0]]);
      else valueSet[currValue.value].add(currValue.expressions[0]);
    }
    normalizedEntityList.push({
      name: currEntity.name,
      values: Object.keys(valueSet).reduce((a, v) => [...a, valueSet[v]], []),
    });
  }
  console.log(normalizedEntityList);
}

export default function* entitiesSaga() {
  yield all([
    fetchEntitiesList(),
  ]);
}