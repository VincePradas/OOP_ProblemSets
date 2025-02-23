public class Vehicle {
    public double load;

    public Vehicle(double load) {
        if(load <= 10000)
            this.load = load;
        else
            System.out.println("Invalid load");
    }

    public double getLoad() {
        return this.load;
    }
}
