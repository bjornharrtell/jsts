import Node from './Node'
export default class NodeFactory {
  createNode(coord) {
    return new Node(coord, null)
  }
}
