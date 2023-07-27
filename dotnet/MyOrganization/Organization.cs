using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyOrganization
{
    internal abstract class Organization
    {
        private Position root;
        private int nextIdentifier = 1; // Holds next available identifier for a new employee.


        private int GetNextAvailableIdentifier() // Generates a unique identifier for new employee and increments the nextIdentifier for next hire.

        {
            return nextIdentifier++;
        }
        public Organization()
        {
            root = CreateOrganization();
        }

        protected abstract Position CreateOrganization();

        /**
         * hire the given person as an employee in the position that has that title
         * 
         * @param person
         * @param title
         * @return the newly filled position or empty if no position has that title
         */
        public Position? Hire(Name person, string title)
        {
            Position? targetPosition = FindPositionByTitle(root, title);     // Find the target position using the title.
            if (targetPosition != null && !targetPosition.IsFilled())
            {
                Employee newEmployee = new Employee(GetNextAvailableIdentifier(), person); // Create a new employee with unique identifier.
                targetPosition.SetEmployee(newEmployee);                        // Assign created employee to target position.
                return targetPosition;
            }

            return null;
        }

        private Position? FindPositionByTitle(Position position, string title)
        {
            if (position.GetTitle() == title)     // If the current position has the same title return the current position.
            {
                return position;
            }

            foreach (var directReport in position.GetDirectReports())// Recursively call the FindPositionByTitle on each direct report.
                var result = FindPositionByTitle(directReport, title);
            {
                var result = FindPositionByTitle(directReport, title);
                if (result != null)          // If target position is found in subtree return it result.
                {
                    return result;
                }
            }

            return null;
        }
        /**
        Alternative solution Language-Integrated Query
        
        using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    namespace MyOrganization
    {
        internal abstract class Organization
     {
        private Position root;
        private int nextIdentifier = 1;

        private int GetNextAvailableIdentifier()
        {
            return nextIdentifier++;
        }
        public Organization()
        {
            root = CreateOrganization();
        }

        protected abstract Position CreateOrganization();
        
        public Position? Hire(Name person, string title)
        {
            Position? targetPosition = FindPositionByTitle(title); find the position of specified title.
            if (targetPosition != null && !targetPosition.IsFilled())
            {
                Employee newEmployee = new Employee(GetNextAvailableIdentifier(), person); // Create a new employee with unique identifier.
                targetPosition.SetEmployee(newEmployee);
                return targetPosition;
            }

            return null;
        }

        private Position? FindPositionByTitle(string title)       Helper method to find position of title in the hierarchy.
        {
            var positions = new Queue<Position>();             Queue performs breadth-first search on the hierarchy.
            positions.Enqueue(root);

            while (positions.Count > 0)        Traverse hierarchy
            {
                var position = positions.Dequeue();

                if (position.GetTitle() == title)
                {
                    return position;
                }

                foreach (var directReport in position.GetDirectReports())                 // Enqueue direct reports of current position.
                {
                    positions.Enqueue(directReport);
                }
            }

            return null;
        }

        

        override public string ToString()
        {
            return PrintOrganization(root, "");
        }

        private string PrintOrganization(Position pos, string prefix)
        {
            StringBuilder sb = new StringBuilder(prefix + "+-" + pos.ToString() + "\n");
            foreach (Position p in pos.GetDirectReports())
            {
                sb.Append(PrintOrganization(p, prefix + "  "));
            }
            return sb.ToString();
        }
    }
}
         */
        override public string ToString()
        {
            return PrintOrganization(root, "");
        }

        private string PrintOrganization(Position pos, string prefix)
        {
            StringBuilder sb = new StringBuilder(prefix + "+-" + pos.ToString() + "\n");
            foreach (Position p in pos.GetDirectReports())
            {
                sb.Append(PrintOrganization(p, prefix + "  "));
            }
            return sb.ToString();
        }
    }
}
