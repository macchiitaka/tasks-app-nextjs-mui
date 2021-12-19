module.exports = {
  '*.@(ts|tsx)': 'bash -c tsc',
  '*.@(js|ts|tsx)': 'eslint --fix',
  '*.test.@(js|ts|tsx)': 'jest',
};
