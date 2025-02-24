public class Vehicle {
    public double load;
    public double maxLoad;

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
}