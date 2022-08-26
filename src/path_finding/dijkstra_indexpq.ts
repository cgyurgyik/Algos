import { IndexDPQ, Comparable, IndexDPQProps } from '../data_structures/IndexDPQ';
// FIXME: when you delete the root, the items array reorders so all
// the mapping from graph to items breaks

// TODO: is it fair to say that an array of Vertices is a graph?
// edges are mixed in
type Edge = [vertexIndex: number, cost: number];
type Vertex = [name: string, edges: Edge[]];
type Graph = Vertex[];

// eslint-disable-next-line no-use-before-define
class Path implements Comparable<Path> {
  public parentIndex: number;

  public cost: number;

  constructor(parentIndex: number, cost: number) {
    this.parentIndex = parentIndex;
    this.cost = cost;
  }

  public isLessThan(path: Path): boolean {
    return this.cost < path.cost;
  }

  public isStrictlyEqual(path: Path): boolean {
    return this === path;
  }

  public isLooselyEqual(path: Path): boolean {
    return this.cost === path.cost;
  }

  public clone(): Path {
    return new Path(this.parentIndex, this.cost);
  }
}

const findShortestPath = (
  graph: Graph,
  startIndex: number,
  endIndex: number,
): Vertex[] => {
  // TODO: validate graph to check for cycles and negative weights
  // (dijkstra doesn't work in those cases)
  // NOTE: arrow functions not supported
  function assertNonNullish<TValue>(
    value: TValue,
    message: string,
  ): asserts value is NonNullable<TValue> {
    if (value === null || value === undefined) {
      throw Error(message);
    }
  }
  // if there is only one item in graph return the first vertex
  if (graph.length === 1) return [graph[0]];
  if (graph.length < 1) return [];

  /* ------------------- generate initial paths from graph ------------------ */
  const paths: Path[] = new Array(graph.length);
  // add rest of paths
  for (let i = 0; i < graph.length; i++) {
    if (i === startIndex) {
      paths[i] = new Path(-1, -Infinity);
    } else {
      paths[i] = new Path(-1, Infinity);
    }
  }
  /* ----------------define function to choose optimal degree --------------- */
  // TODO: figure out how to calculate optimal degree given the amount of
  // edges/vertices
  const optimalDegree = (): number => graph[startIndex][1].length;
  /* ------------------------- build priority queue ------------------------- */
  const pathMinPQProps = {
    D: optimalDegree(),
    max: false,
    array: paths,
  };
  const pathMinPQ: IndexDPQ<Path> = new IndexDPQ<Path>(pathMinPQProps);
  /* -------------------- define function to update paths ------------------- */
  const updateNeighbors = (
    rootItemIndex: number,
    costFromStart: number,
  ): void => {
    // NOTE: the whole reason I decided to make the graph an array of tuples is
    // for these lines
    const rootGraphIndex: number = rootItemIndex - 1;
    const currVertex: Vertex = graph[rootGraphIndex];
    for (let i = 0; i < currVertex[1].length; i++) {
      const costToNeighbor: number = currVertex[1][i][1];
      const totalCost: number = costFromStart + costToNeighbor;
      const neighborItemIndex: number = currVertex[1][i][0] + 1;
      const neighborPath: Path | null = pathMinPQ.getItem(neighborItemIndex);
      assertNonNullish(
        neighborPath,
        `ERROR: Neighbor at ${neighborItemIndex} does not exist`,
      );
      const neighborCurrPathCost: number = neighborPath.cost;
      // compare the total cost (which is the updated current min cost to get
      // to the current neighbor) with the neighborCurrPathCost which is the
      // previous calculation for the min cost of getting to the current
      // neighbor
      if (totalCost < neighborCurrPathCost) {
        // NOTE: make sure you go through the priority queue for the change to
        // be reflected
        // TODO: make properties private to enforce this a bit more
        pathMinPQ.change(neighborItemIndex, new Path(rootItemIndex, totalCost));
      }
    }
  };
  // TODO: make sure endIndex is valid
  const endItemIndex: number = endIndex + 1;
  // TODO: getItem has to clone. is there a way to avoid this?
  while (pathMinPQ.root() !== pathMinPQ.getItem(endItemIndex)) {
    const rootItemIndex: number | null = pathMinPQ.rootIndex();
    assertNonNullish(rootItemIndex, 'ERROR: rootItemIndex was null/undefined');
    const root: Path | null = pathMinPQ.deleteRoot();
    assertNonNullish(root, 'Error: root was null/undefined');
    // if the root we just removed was the start node, then the cost to get
    // there was 0 and not -Infinity, which we chose in order to make sure
    // that nothing would be smaller
    let costFromStart: number;
    if (rootItemIndex === (startIndex + 1)) {
      costFromStart = 0;
    } else {
      costFromStart = root.cost;
    }
    updateNeighbors(rootItemIndex, costFromStart);
  }

  const generateShortestPathVertices = (
    graphStart: number,
    graphEnd: number,
  ): Vertex[] => {
    // TODO: if i force graph[0] to be start and graph[graph.length -1 ]
    // to be the end, it would simplify things and allow me to calculate
    // the size of the shortestPath array here (amongst other things)
    const shortestPath: Vertex[] = [];
    const itemEnd = graphEnd + 1;
    const itemStart = graphStart + 1;
    let currItemIndex = itemEnd;
    while (currItemIndex !== itemStart) {
      // push vertex onto shortestPath and move to parent
      const vertex = graph[currItemIndex - 1];
      shortestPath.push(vertex);
      currItemIndex = paths[currItemIndex].parentIndex;
    }
    return shortestPath;
  };

  return generateShortestPathVertices(startIndex, endIndex);
};

const testGraph: Graph = [
  ['A', [[3, 1]]],
  ['START', [[0, 6], [2, 2]]],
  ['B', [[0, 3], [3, 5]]],
  ['FIN', []],
];

findShortestPath(testGraph, 1, 3);
