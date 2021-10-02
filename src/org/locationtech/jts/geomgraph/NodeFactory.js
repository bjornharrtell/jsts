import Node from './Node.js'
export default class NodeFactory {
  createNode(coord) {
    return new Node(coord, null)
  }
}
