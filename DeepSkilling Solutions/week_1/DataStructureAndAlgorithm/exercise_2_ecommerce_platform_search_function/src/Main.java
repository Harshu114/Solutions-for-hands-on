public class Main {

    public static void main(String[] args) {


        Product[] products = {

            new Product(1, "Laptop", "Electronics"),
            new Product(2, "Mobile", "Electronics"),
            new Product(3, "Shoes", "Fashion"),
            new Product(4, "Watch", "Accessories"),
            new Product(5, "Keyboard", "Electronics")

        };


        System.out.println("Linear Search Result:");

        System.out.println(
            SearchAlgorithms.linearSearch(products, "Shoes")
        );



        Product[] sortedProducts = {

            new Product(1, "Keyboard", "Electronics"),
            new Product(2, "Laptop", "Electronics"),
            new Product(3, "Mobile", "Electronics"),
            new Product(4, "Shoes", "Fashion"),
            new Product(5, "Watch", "Accessories")

        };


        System.out.println("\nBinary Search Result:");

        System.out.println(
            SearchAlgorithms.binarySearch(sortedProducts, "Shoes")
        );

    }
}
