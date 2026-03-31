import { BoardT } from '@/types/Board';
import { TaskT } from '@/types/Task';

/**
 * Filters and sorts an array of boards based on the given filters.
 *
 * @param {BoardT[]} array - The array of boards to filter and sort. You can also use the original array.
 * @param {Object} filters - The filters to apply. The filters object should have the following properties:
 *   - search: A string to search for in the boards' text.
 *   - filter: A string indicating which boards to filter. Can be 'all', 'shared', or 'like'.
 *   - sort: A string indicating how to sort the boards. Can be 'name' or 'date'.
 *
 * @returns {BoardT[]} - The filtered and sorted array of boards.
 */

export const arrayFilters = (
  array: BoardT[] | TaskT[],
  userId: string,
  filters: { search: string; filter: 'all' | 'shared' | 'like'; sort: 'name' | 'date' },
) => {
  return array
    .slice()
    .filter((value) => {
      if (filters.search && !value.title.toLowerCase().includes(filters.search.toLowerCase()))
        return false;

      if ('members' in value && filters.filter === 'shared' && value.members.length <= 1)
        return false;
      if ('members' in value && filters.filter === 'like' && !value.liked.includes(userId))
        return false;

      return true;
    })
    .sort((a, b) => {
      if (filters.sort === 'name') {
        return a.text.localeCompare(b.text);
      }

      if (filters.sort === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      return 0;
    });
};
