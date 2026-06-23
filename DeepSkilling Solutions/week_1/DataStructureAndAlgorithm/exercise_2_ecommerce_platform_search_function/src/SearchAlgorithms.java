public class SearchAlgorithms {


    public static Product linearSearch(Product[] products, String name) {

        for(Product product : products) {

            if(product.productName.equalsIgnoreCase(name)) {
                return product;
            }
        }

        return null;
    }



    public static Product binarySearch(Product[] products, String name) {

        int left = 0;
        int right = products.length - 1;


        while(left <= right) {

            int mid = (left + right) / 2;

            int result = products[mid].productName.compareToIgnoreCase(name);


            if(result == 0) {
                return products[mid];
            }


            if(result < 0) {
                left = mid + 1;
            }

            else {
                right = mid - 1;
            }
        }


        return null;
    }
}
