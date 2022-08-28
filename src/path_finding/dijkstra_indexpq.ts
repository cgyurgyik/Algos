import { IndexDPQ, Comparable, IndexDPQProps } from '../data_structures/IndexDPQ';
// FIXME: when you delete the root, the items array reorders so all
// the mapping from graph to items breaks

// TODO: is it fair to say that an array of Vertices is a graph?

// eslint-disable-next-line no-use-before-define
class Path implements Comparable<Path> {
  public name: string;

  public parentName: string | null;

  public cost: number;

  constructor(name: string, parentName: string | null, cost: number) {
    this.name = name;
    this.parentName = parentName;
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
    return new Path(this.name, this.parentName, this.cost);
  }
}

// const findShortestPath = (
//   graph: Graph,
//   startIndex: number,
//   endIndex: number,
// ): Vertex[] => {
//   // TODO: validate graph to check for cycles and negative weights
//   // (dijkstra doesn't work in those cases)
//   // if there is only one item in graph return the first vertex
//   if (graph.length === 1) return [graph[0]];
//   if (graph.length < 1) return [];

//   /* ------------------- generate initial paths from graph ------------------ */
//   const paths: Path[] = new Array(graph.length);
//   // add rest of paths
//   for (let i = 0; i < graph.length; i++) {
//     if (i === startIndex) {
//       paths[i] = new Path(-1, -Infinity);
//     } else {
//       paths[i] = new Path(-1, Infinity);
//     }
//   }
//   /* ----------------define function to choose optimal degree --------------- */
//   // TODO: figure out how to calculate optimal degree given the amount of
//   // edges/vertices
//   const optimalDegree = (): number => graph[startIndex][1].length;
//   /* ------------------------- build priority queue ------------------------- */
//   const pathMinPQProps = {
//     D: optimalDegree(),
//     max: false,
//     array: paths,
//   };
//   const pathMinPQ: IndexDPQ<Path> = new IndexDPQ<Path>(pathMinPQProps);
//   /* -------------------- define function to update paths ------------------- */
//   const updateNeighbors = (
//     rootItemIndex: number,
//     costFromStart: number,
//   ): void => {
//     // NOTE: the whole reason I decided to make the graph an array of tuples is
//     // for these lines
//     const rootGraphIndex: number = rootItemIndex - 1;
//     const currVertex: Vertex = graph[rootGraphIndex];
//     for (let i = 0; i < currVertex[1].length; i++) {
//       const costToNeighbor: number = currVertex[1][i][1];
//       const totalCost: number = costFromStart + costToNeighbor;
//       const neighborItemIndex: number = currVertex[1][i][0] + 1;
//       const neighborPath: Path | null = pathMinPQ.getItem(neighborItemIndex);
//       assertNonNullish(
//         neighborPath,
//         `ERROR: Neighbor at ${neighborItemIndex} does not exist`,
//       );
//       const neighborCurrPathCost: number = neighborPath.cost;
//       // compare the total cost (which is the updated current min cost to get
//       // to the current neighbor) with the neighborCurrPathCost which is the
//       // previous calculation for the min cost of getting to the current
//       // neighbor
//       if (totalCost < neighborCurrPathCost) {
//         // NOTE: make sure you go through the priority queue for the change to
//         // be reflected
//         // TODO: make properties private to enforce this a bit more
//         pathMinPQ.change(neighborItemIndex, new Path(rootItemIndex, totalCost));
//       }
//     }
//   };
//   // TODO: make sure endIndex is valid
//   const endItemIndex: number = endIndex + 1;
//   // TODO: getItem has to clone. is there a way to avoid this?
//   while (pathMinPQ.root() !== pathMinPQ.getItem(endItemIndex)) {
//     const rootItemIndex: number | null = pathMinPQ.rootIndex();
//     assertNonNullish(rootItemIndex, 'ERROR: rootItemIndex was null/undefined');
//     const root: Path | null = pathMinPQ.deleteRoot();
//     assertNonNullish(root, 'Error: root was null/undefined');
//     // if the root we just removed was the start node, then the cost to get
//     // there was 0 and not -Infinity, which we chose in order to make sure
//     // that nothing would be smaller
//     let costFromStart: number;
//     if (rootItemIndex === (startIndex + 1)) {
//       costFromStart = 0;
//     } else {
//       costFromStart = root.cost;
//     }
//     updateNeighbors(rootItemIndex, costFromStart);
//   }

//   const generateShortestPathVertices = (
//     graphStart: number,
//     graphEnd: number,
//   ): Vertex[] => {
//     // TODO: if i force graph[0] to be start and graph[graph.length -1 ]
//     // to be the end, it would simplify things and allow me to calculate
//     // the size of the shortestPath array here (amongst other things)
//     const shortestPath: Vertex[] = [];
//     const itemEnd = graphEnd + 1;
//     const itemStart = graphStart + 1;
//     let currItemIndex = itemEnd;
//     while (currItemIndex !== itemStart) {
//       // push vertex onto shortestPath and move to parent
//       const vertex = graph[currItemIndex - 1];
//       shortestPath.push(vertex);
//       currItemIndex = paths[currItemIndex].parentIndex;
//     }
//     return shortestPath;
//   };

//   return generateShortestPathVertices(startIndex, endIndex);
// };

// const testGraph: Graph = [
//   ['A', [[3, 1]]],
//   ['START', [[0, 6], [2, 2]]],
//   ['B', [[0, 3], [3, 5]]],
//   ['FIN', []],
// ];

// TODO: figure out how to find optimal degree
type ShortestPath = [totalCost: number, vertices: string[]];
type Edge = [name: string, cost: number];
interface Graph {
  [key: string]: Edge[];
}

const findShortestPath = (
  graph: Graph,
  start: string,
  end: string,
): ShortestPath => {
  /* ------------------------ Assertion for Not Null ------------------------ */
  // NOTE: arrow functions not supported
  function assertNonNullish<TValue>(
    value: TValue,
    message: string,
  ): asserts value is NonNullable<TValue> {
    if (value === null || value === undefined) {
      throw Error(message);
    }
  }
  /* ------------------------ Check validity of graph ----------------------- */
  const graphKeys: string[] = Object.keys(graph);
  if (graphKeys.length === 1) return [0, [start]];
  if (graphKeys.length < 1) {
    throw Error('ERROR: you must provide at least one'
  + ' element in the graph');
  }
  // check for negative weights
  // change the names of the vertices if they aren't unique
  // check for cycles
  /* ---------------------- Initialize Calculated Paths --------------------- */
  // need to store deleted roots so we can trace back the shortest path
  // (hashtable)
  const calculatedPaths: {[pathName: string]: Path} = {};
  /* --------------------------- Intialize Result --------------------------- */
  const result: ShortestPath = [-Infinity, []];
  /* --------------------------- Initialize Paths --------------------------- */
  // Iterate through graph
  const paths: Path[] = Array(graphKeys.length);
  for (let i = 0; i < graphKeys.length; i++) {
    const currVertexName: string = graphKeys[i];
    // if start vertex initialize new Path with cost -Infinity
    if (currVertexName === start) {
      paths[i] = new Path(currVertexName, null, -Infinity);
    } else {
      // else intitialize new Path with cost +Infinity
      paths[i] = new Path(currVertexName, null, Infinity);
    }
  }
  /* ------------------------ Initialize pathMinIPQ ------------------------- */
  // calculate optimal Degree
  // TODO: figure out the equation
  const findOptimalDegree = ():number => graph[start].length;
  const optimalDegree = findOptimalDegree();
  // initialize new IndexDPQ using optimal degree and paths array
  const pathMinIPQProps = {
    D: optimalDegree,
    max: false,
    array: paths,
  };
  const pathMinIPQ: IndexDPQ<Path> = new IndexDPQ<Path>(pathMinIPQProps);
  /* -------------------------- Find Shortest Path -------------------------- */
  // While IndexDPQ's root is not the End Path
  const firstRoot: Path | null = pathMinIPQ.root();
  assertNonNullish(
    firstRoot,
    'ERROR: No element in Paths Index Queue!',
  );
  assertNonNullish(
    firstRoot.name,
    'ERROR: Root exists but has no name!',
  );
  while (pathMinIPQ.root()?.name !== null && pathMinIPQ.root()?.name !== end) {
    // Delete Root (Path) and save it to calculatedPaths
    const deletedRoot: Path | null = pathMinIPQ.deleteRoot();
    assertNonNullish(
      deletedRoot,
      'ERROR: deletedRoot is null!',
    );
    calculatedPaths[deletedRoot.name] = deletedRoot;
    // save the deleted root's cost (this is the cost to get from Start to
    // the deleted root)
    // Switch cost of start from -Infinity to 0
    let costToDeletedRoot: number;
    if (deletedRoot.name === start) {
      costToDeletedRoot = 0;
    } else {
      costToDeletedRoot = deletedRoot.cost;
    }
    /* ------------------------- Update Neighbors ------------------------- */
    // initialize deletedNeighbors to graph[name]
    const deletedNeighbors: Edge[] = graph[deletedRoot.name];
    // iterate through neighbors
    for (let j = 0; j < deletedNeighbors.length; j++) {
      // initialize current neighbor vertex
      const currNeighbor: Edge = deletedNeighbors[j];
      // grab cost of current neighbor vertex (this is the cost to go from
      // deleted root to the current neighbor)
      const costToNeighbor: number = currNeighbor[1];
      // initialize totalCost to be cost to current neighbor + the cost to
      // deleted root (Path)
      const totalCost: number = costToDeletedRoot + costToNeighbor;
      // find the Path items index for the current neighbor by linearly
      // searching through pathminipq items
      let neighborItemIndex: number;
      for (let k = 0; k < pathMinIPQ.getNumItems(); k++) {
        const currPath: Path | null = pathMinIPQ.getItem(k + 1);
        assertNonNullish(
          currPath,
          'ERROR: currPath is null!',
        );
        if (currPath.name === currNeighbor[0]) {
          neighborItemIndex = k + 1;
          // if the totalCost is less than the cost of the Path corresponding to
          // current neighbor
          if (totalCost < currPath.cost) {
            // call the change(itemIndex) function on pathMinIPQ with
            // currentNeighbor items index. Update cost and parent
            const updatedPath: Path = new Path(
              currPath.name,
              deletedRoot.name,
              totalCost,
            );
            pathMinIPQ.change(neighborItemIndex, updatedPath);
            break;
          }
        }
      }
    }
  }
  /* ----------------------------- Build Result ----------------------------- */
  // grab root of pathMinIPQ. This should be the end path.
  const endPath: Path | null = pathMinIPQ.root();
  assertNonNullish(
    endPath,
    'ERROR: endPath is null!',
  );
  // put its cost into result
  result[0] = endPath.cost;
  // store the name in the result
  result[1].push(endPath.name);
  // set parent to the result of looking up the root's parent's name in the
  // calculated paths
  assertNonNullish(
    endPath.parentName,
    `ERROR: End path (${endPath.name}) does not have a parentName`,
  );
  let parent: Path = calculatedPaths[endPath.parentName];
  // while parent is defined
  while (parent.parentName !== null) {
    // store parent name in result
    result[1].push(parent.name);
    // set parent to be the current parent's parent
    parent = calculatedPaths[parent.parentName];
    // return the final result
  }
  // push final node onto the result
  result[1].push(parent.name);
  // reverse shortest path vertex names so it starts at start and
  // ends at end
  const shortestPathLength = result[1].length;
  for (let m = 0; m < Math.floor(shortestPathLength / 2); m++) {
    const temp: string = result[1][m];
    result[1][m] = result[1][shortestPathLength - m - 1];
    result[1][shortestPathLength - m - 1] = temp;
  }
  return result;
};

const testGraph: Graph = {
  B: [['END', 5], ['A', 2]],
  A: [['END', 1]],
  START: [['A', 6], ['B', 3]],
  END: [],
};

const shortestPath = findShortestPath(testGraph, 'START', 'END');
console.log(shortestPath);
