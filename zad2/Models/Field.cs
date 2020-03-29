namespace zad2.Models
{
    public class Field
    {
        public int Value { get; set; }
        public int Order { get; set; }
        public bool[] Restricted { get; set; }

        public Field()
        {
            Value = 0;
            Order = 0;
            Restricted = new bool[10];
            SetFalse();
        }

        private void SetFalse()
        {
            for (var i = 0; i < Restricted.Length; i++)
                Restricted[i] = false;
        }
    }
}