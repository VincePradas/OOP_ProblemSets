public class Main {
    public static void main(String args[]) {
        Search search = new Search();
        boolean check = search.isSubstring("The cat in the hat", "hat");
        System.out.println(check);
    }
}
