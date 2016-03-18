function generateGuid()
{
  return [
    ~~(Math.random() * 9000) + 1000,
    ~~(Math.random() * 9000) + 1000,
    ~~(Math.random() * 9000) + 1000
  ].join('-');
}

module.exports = {
  GenerateGuid: generateGuid
};
