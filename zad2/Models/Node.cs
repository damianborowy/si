using System.Collections.Generic;

namespace zad2.Models
{
    public class Node
    {
        public List<Node> Children { get; set; }
        public Node Parent { get; set; }
        public Sudoku Current { get; set; }
        public bool HasAllChildren { get; set; }

        public Node(List<Node> children, Node parent, Sudoku current)
        {
            Children = children;
            Parent = parent;
            Current = current;
            HasAllChildren = false;
        }
    }
}