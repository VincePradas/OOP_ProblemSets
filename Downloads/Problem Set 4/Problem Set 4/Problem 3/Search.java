public class Search {

    public boolean isSubstring(String str, String str2) {
        boolean found = false;

        for (int i = 0; i <= str.length() - str2.length(); i++) {
            int j;
            for (j = 0; j < str2.length(); j++) {
                if (str.charAt(i + j) != str2.charAt(j)) {
                    break;
                }
            }
            if (j == str2.length()) {
                found = true;
                break;
            }
        }

        if (found) {
            return true;
        } else {
            return false;
        }
    }
}