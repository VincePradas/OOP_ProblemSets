public class FooBarBaz {

    public static void main(String[] args) {
        for (int number = 1; number <= 50; number++) {
            if (number % 3 == 0 && number % 5 == 0)
                System.out.print("Foo Bar " + number);
            else if (number % 3 == 0)
                System.out.print("Foo " + number);
            else if (number % 5 == 0)
                System.out.print("Bar " + number);
            else if (number % 7 == 0)
                System.out.print("Baz " + number);
            else
                System.out.print(" " + number);
            System.out.println();
        }
    }
}