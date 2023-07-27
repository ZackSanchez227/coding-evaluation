module.exports = function (root) {
  return {
    getRoot: function () { return root; },

    printOrganization: function (position, prefix) {
      let str = `${prefix}+-${position.toString()}\n`;
      for (const p of position.getDirectReports()) {
        str = str.concat(this.printOrganization(p, `${prefix}  `));
      }
      return str;
    },
    // Hire the given person as an employee in the position that has that title
    // Return the newly filled position or undefined if no position has that title
    hire: function (person, title)
    {
      // your code here

      function findPosition(position, targetTitle) // Find position given title.
      {
        if (position.getTitle() === targetTitle) {
          return position;
        }

        for (const p of position.getDirectReports())
        {
          const foundPosition = findPosition(p, targetTitle);
          if (foundPosition)
          {
            return foundPosition;
          }
        }

        return undefined;
      }

      const targetPosition = findPosition(root, title);

      if (targetPosition && !targetPosition.isFilled())
      {
        targetPosition.setEmployee(person);
        return targetPosition;
      }

      return undefined;
      },
/*
Alternative solution iterative DFS
hire: function (person, title)
{
      const stack = [root];     Uses stack to perform iterative DFS traversal

      while (stack.length > 0)
       {
        const current = stack.pop();

        if (current.getTitle() === title && !current.isFilled())
         {
          current.setEmployee(person);
          return current;
        }

        for (const p of current.getDirectReports()) Push all direct reports of current position onto the stack for traversal.
        {
          stack.push(p);
        }
      }

      // If no position with the given title is found or it's already filled, return undefined
      return undefined;
    },


 */
    toString: function () {
      return this.printOrganization(root, '');
    }
  };
};
