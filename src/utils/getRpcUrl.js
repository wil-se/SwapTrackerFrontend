// Array of available nodes to connect to
export const nodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2, process.env.REACT_APP_NODE_3];

const getNodeUrl = () => {
  const randomIndex = Math.floor(Math.random() * nodes.length);
  return nodes[randomIndex];
};

export default getNodeUrl;
