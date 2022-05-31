export const getCode = (string) => {
  const data = string.split(">");
  const arr = data.map((item) => {
    return item.split("<");
  });
  return `${arr[1][0]}`;
};
