public class Vehicle {
    public double load;
    public double maxLoad;

    public Vehicle(double load) {
        this.maxLoad = 10000;
        if(load < this.maxLoad)
            this.load = load;
        else
            System.out.println("Invalid Load");
    }

    public double addBox(double weight) {
        return this.load += weight;
    }

    public double getLoad() {
        return this.load;
    }
}