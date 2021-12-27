const shortAddress = (address, start, end) => {
  const shorted = `${address.substring(0, start)}...${address.substring(address.length - end)}`;

  return shorted;
};

export default shortAddress;
