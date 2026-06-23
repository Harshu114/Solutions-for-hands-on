public class FinancialForecast {

    public static double calculateFutureValue(
            double currentValue,
            double growthRate,
            int years) {

        if(years == 0) {
            return currentValue;
        }

        return calculateFutureValue(
                currentValue * (1 + growthRate),
                growthRate,
                years - 1
        );
    }


    public static double optimizedForecast(
            double currentValue,
            double growthRate,
            int years) {

        for(int i = 0; i < years; i++) {
            currentValue *= (1 + growthRate);
        }

        return currentValue;
    }
}
