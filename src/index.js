// import fs from 'fs';
import _ from 'lodash';
import parseFile from './read.js';

export default (path1, path2) => {
  const file1 = parseFile(path1);
  const file2 = parseFile(path2);
  const statusSymbols = { removed: '-', added: '+', unchanged: ' ' };
  const sortedUniqKeys = _.union(Object.keys(file1), Object.keys(file2)).sort();
  const elementsWithStatus = sortedUniqKeys.reduce((acc, key) => {
    const valueFile1 = file1[key];
    const valueFile2 = file2[key];
    const removed = `  ${statusSymbols.removed} ${key}: ${valueFile1}`;
    const added = `  ${statusSymbols.added} ${key}: ${valueFile2}`;
    const unchanged = `  ${statusSymbols.unchanged} ${key}: ${valueFile1}`;
    if (_.has(file1, key) && _.has(file2, key)) {
      if (valueFile1 === valueFile2) {
        return [...acc, unchanged];
      }
      return [...acc, removed, added];
    } if (_.has(file1, key) && !_.has(file2, key)) {
      return [...acc, removed];
    }
    return [...acc, added];
  }, []);
  const result = elementsWithStatus.join('\n');
  return ['{', result, '}'].join('\n');
};