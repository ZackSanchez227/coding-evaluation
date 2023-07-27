import Position from './Position';
import Name from './Name';
import Employee from "./Employee";

abstract class Organization {
  private root: Position;

  constructor() {
    this.root = this.createOrganization();
  }

  protected abstract createOrganization(): Position;

  printOrganization = (position: Position, prefix: string): string => {
    let str = `${prefix}+-${position}\n`;
    for (const p of position.getDirectReports()) {
      str = str.concat(this.printOrganization(p, `${prefix}  `));
    }
    return str;
  };

  // Hire the given person as an employee in the position that has that title
  // Return the newly filled position or undefined if no position has that title
  hire(person: Name, title: string): Position | undefined {
    // Queue for BFS traversal
    const queue: Position[] = [this.root];

    while (queue.length > 0) //get next position from front of queue
    {
      const currentPosition = queue.shift()!; // Nonnull assertion since queue.length > 0


      if (currentPosition.getTitle() === title && !currentPosition.isFilled())
      {
        currentPosition.setEmployee(new Employee(0, person));
        return currentPosition;
      }

      queue.push(...currentPosition.getDirectReports());
    }

    return undefined;
  }
  /**
   *  Alternative solution:
   * hire(person: Name, title: string): Position | undefined {
   *     const findPositionBytitle = (position: Position, targetTile: string): Position | undefined =>   traverse the positions to find first available position with title
   *     {
   *       if (position.getTitle() === targetTile && !position.isFilled()) 
   *       {
   *         return position;
   *       }
   *       for (const directReport of position.getDirectReports())  Recursively search for a position with specified title
   *       {
   *         const foundPosition = findPositionBytitle(directReport, targetTile);
   *         if (foundPosition) 
   *         {
   *           return foundPosition;
   *         }
   *       }
   *       return undefined;
   *     };
   * 
   *     const positionToFill = findPositionBytitle(this.root,title); Find first available position with specified title
   *     if (positionToFill) 
   *     {
   *       positionToFill.setEmployee(new Employee(0, person)); If position is available hire person 
   *       return positionToFill;
   *     }
   *     return undefined;
   *   }
   * 
   * 
   */

 
  toString = () => this.printOrganization(this.root, '');
}

export default Organization;
