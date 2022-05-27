#include <stdlib.h>
#include <stdio.h>

/**
 * @brief
 * bubble sort:
 * track whether a swap occured
 * start comparing first two items
 *  if they are out of order swap them
 *  otherwise move on to the next element. Max element will bubble to top
 * when you get through the iteration
 *  check if swap occured. if it did then go through another iteration not checking last bubbled elem
 * if no swap occured you're done
 * 
 * @example
 * [1, 5, 4, 2, 3]
 * 1 > 5 no
 * 5 > 4 yes. swap (set swap flag)
 * 5 > 2 yes. swap (set swap flag?)
 * 5 > 3 yes. swap (set swap flag?)
 * 
 * [1, 4, 2, 3, 5] swap yes -> next iteration
 * [1, 2, 3, 4, 5] swap yes -> next iteration
 * [1, 2, 3, 4, 5] swap no -> return
 */

/**
 * @brief 
 * 
 * @param argc numElements
 * @param argv '[1, 5, 4, 2, 3]'
 * @return int 
 */
int main(int argc, int **argv) {
  for (int i = 1; i < argc; i++) {
    printf(atoi(argv[i]));
    return EXIT_SUCCESS;
  }
}