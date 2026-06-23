public class Main {

    public static void main(String[] args) {

        double currentValue = 10000;
        double growthRate = 0.10;
        int years = 5;


        System.out.println("Recursive Forecast:");

        System.out.println(
                FinancialForecast.calculateFutureValue(
                        currentValue,
                        growthRate,
                        years
                )
        );


        System.out.println("\nOptimized Forecast:");

        System.out.println(
                FinancialForecast.optimizedForecast(
                        currentValue,
                        growthRate,
                        years
                )
        );
    }
}
