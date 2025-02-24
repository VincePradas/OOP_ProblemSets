public class Vehicle {
    private double load;
    private double maxLoad;

    public Vehicle (double maxLoad) {
        this.maxLoad = 10000;
        if(maxLoad<this.maxLoad) 
            this.load = maxLoad;
        else
            return;
    }
    
    public double getLoad() {
        return this.load;
    }

    public double getMaxLoad() {
        return this.maxLoad;
    }

    public boolean addBox(double weight) {
        if(this.load + weight <= this.maxLoad) {
            this.load += weight;
            return true;
        }
        else
            return false;
    }
}