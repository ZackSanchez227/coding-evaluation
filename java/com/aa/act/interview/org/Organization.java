package com.aa.act.interview.org;

import java.util.Optional;
//most efficient solution is breadth first search solution as it is the most scalable and requires least amount of memory over time
public abstract class Organization {

    private Position root;
    private int nextIdentifier = 1;	// Variable to keeps track of the next available identifier for a new employee.

    
    public Organization() {
        root = createOrganization();
    }
    
    protected abstract Position createOrganization();
    
    private int generateNextIdentifier() // Generates a unique identifier for the newly hired employees. Returns the next available identifier and increments the nextIdentifier variable for the next hire.
    {
        return nextIdentifier++;
    }
    
    /**
     * hire the given person as an employee in the position that has that title
     * 
     * @param person
     * @param title
     * @return the newly filled position or empty if no position has that title
     */
    public Optional<Position> hire(Name person, String title) // This public method acts as a wrapper for the private hire method.    															// It starts the recursive hiring process from the root of the organization.
    {														// It starts the recursive hiring process from the root of the organization.

        return hire(root, person, title);						
    }

    private Optional<Position> hire(Position position, Name person, String title) {// The private recursive method traverses the organizations positions.
        if (position == null) 					// Searches for the position with the specified title that is not already filled and hires the new employee for that position.
        {
            return Optional.empty();
        }

        if (position.getTitle().equals(title) && !position.isFilled()) // If current position has specified title and is not filled hire the new employee for this position and return the newly filled position.
        																
        {
            Employee newEmployee = new Employee(generateNextIdentifier(), person);
            position.setEmployee(Optional.of(newEmployee));
            return Optional.of(position);
        }

        for (Position directReport : position.getDirectReports())  // If the current position is not desired then recursively search for the title in its direct reports.
        {           												 // Iterate through the direct reports of the current position and call the hire method recursively for each direct report. If suitable position is found  return that position.  															
            Optional<Position> result = hire(directReport, person, title);
            if (result.isPresent())
            {
                return result;
            }
        }

        return Optional.empty();    // If no suitable position is found return Optional.empty().

    } //runtime of O(N)
    
    
    /** Alternative solution breadth-first search algorithm using queue data structure
     * 
     *
    import java.util.ArrayDeque;
	import java.util.Optional;
	import java.util.Queue;

	public abstract class Organization {

    private Position root;

    public Organization() {
        root = createOrganization();
    }

    protected abstract Position createOrganization();
    public Optional<Position> hire(Name person, String title) Queue to perform a breadth-first search of the positions.
    {
        Queue<Position> queue = new ArrayDeque<>();
        queue.add(root);

        while (!queue.isEmpty())  Get the next position from the queue.
        {
            Position current = queue.poll();
            if (current.getTitle().equals(title) && !current.isFilled()) Check if the current position has title and is not filled.
            {
                Employee newEmployee = new Employee(generateNextIdentifier(), person); Hire new employee and set them as the current position's employee.
                current.setEmployee(Optional.of(newEmployee));
                return Optional.of(current);
            }

            queue.addAll(current.getDirectReports()); Add direct reports of the current position to queue for further exploration.
        }

        return Optional.empty();       If no position is found return Optional.empty().

    }


}


Alternative solution 2  depth-first search (DFS) algorithm using an explicit stack
     *
    import java.util.ArrayDeque;
	import java.util.Deque;
	import java.util.Optional;

public abstract class Organization {

    private Position root;

    public Organization() {
        root = createOrganization();
    }

    protected abstract Position createOrganization();
     public Optional<Position> hire(Name person, String title)  Explicit stack to perform a depth-first search of the positions.

     {
        Deque<Position> stack = new ArrayDeque<>();
        stack.push(root);

        while (!stack.isEmpty())      Get the next position from the stack.

        {
            Position current = stack.pop();
            if (current.getTitle().equals(title) && !current.isFilled()) Check if the current position has title and is not filled.
             {
                Employee newEmployee = new Employee(generateNextIdentifier(), person); Hire new employee and set them as the current positions employee.
                current.setEmployee(Optional.of(newEmployee));
                return Optional.of(current);
            }

            Deque<Position> reverseReports = new ArrayDeque<>(current.getDirectReports());  Add the direct reports of current position to the stack in reverse order.

            while (!reverseReports.isEmpty()) 
            {
                stack.push(reverseReports.pop());
            }
        }

        return Optional.empty(); If no position is found return Optional.empty().
    }

   
}
     *
     */
    @Override
    public String toString() {
        return printOrganization(root, "");
    }
    
    private String printOrganization(Position pos, String prefix) {
        StringBuffer sb = new StringBuffer(prefix + "+-" + pos.toString() + "\n");
        for(Position p : pos.getDirectReports()) {
            sb.append(printOrganization(p, prefix + "  "));
        }
        return sb.toString();
    }
}
