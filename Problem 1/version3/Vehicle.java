public class Vehicle {
    private double load; 
    private double maxLoad; 

    public Vehicle(double maxLoad) {
        this.maxLoad = kiloToNewts(maxLoad); 
        this.load = 0; 
    }

    public double getLoad() {
        return newtsToKilo(this.load); 
    }

    public double getMaxLoad() {
        return newtsToKilo(this.maxLoad); 
    }

    public boolean addBox(double weight) {
        double weightInNewtons = kiloToNewts(weight); 
        if (this.load + weightInNewtons <= this.maxLoad) {
            this.load += weightInNewtons; 
            return true;
        } else {
            return false;
        }
    }

    private double kiloToNewts(double weight) {
        return weight * 9.8; 
    }

    private double newtsToKilo(double weight) {
        return weight / 9.8; 
    }
}
