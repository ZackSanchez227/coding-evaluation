import Employee from "./Employee.js";

class Organization {
  constructor(root) {
    this.printOrganization = (position, prefix) => {
      let str = `${prefix}+-${position.toString()}\n`;
      for (const p of position.getDirectReports()) {
        str = str.concat(this.printOrganization(p, `${prefix}  `));
      }
      return str;
    };

    // Hire the given person as an employee in the position that has that title
    // Return the newly filled position or undefined if no position has that title
    this.hire = (person, title) =>
    {
      // your code here
      const queue = [root];

      while (queue.length > 0)
      {
        const current = queue.shift();

        if (current.getTitle() === title && !current.isFilled()) //Check current position and if not filled.
        {
          current.setEmployee(new Employee(Date.now(), person)); //Fill position as an employee.
          return current; //return filled position
        }

        const directReports = current.getDirectReports();
        if (directReports.length > 0) {
          queue.push(...directReports);
        }
      }

      // If the position is not found or already filled, return undefined
      return undefined;
    };

    this.toString = () => this.printOrganization(root, '');
  };
}

export default Organization;
