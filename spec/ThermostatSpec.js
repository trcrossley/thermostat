describe("Thermostat", function() {

  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it("starts at 20 degrees", function() {
    expect(thermostat.temperature).toEqual(20);
  });

  it("can increase the temperature with the up button", function() {
    thermostat.tempUp();
    expect(thermostat.temperature).toEqual(21);
  });

  it("can decrease the temperature with the down button", function() {
    thermostat.tempDown();
    expect(thermostat.temperature).toEqual(19);
  });

  it("has a minimum temperature of 10 degrees", function() {
    thermostat.temperature = 10;
    expect(function() {
      thermostat.tempDown();
    }).toThrow(new Error("minimum temperature exceeded"));
  });

  it("has a power saving mode that is on by default", function() {
    expect(thermostat.powerMode).toEqual(true);
  });

  it("can switch off the power saving mode", function() {
    thermostat.powerModeSwitch();
    expect(thermostat.powerMode).toEqual(false);
  });

  it("can switch on the power saving mode", function() {
    thermostat.powerModeSwitch();
    thermostat.powerModeSwitch();
    expect(thermostat.powerMode).toEqual(true);
  });

  it("has a maximum temperature of 25 degrees with power saving mode on", function() {
    thermostat.temperature = 25;
    expect(function() {
      thermostat.tempUp();
    }).toThrow(new Error("maximum power saving temperature reached"));
  });

  it("has a maximum temperature of 32 degrees with power saving mode off", function() {
    thermostat.powerModeSwitch();
    thermostat.temperature = 32;
    expect(function() {
      thermostat.tempUp();
    }).toThrow(new Error("maximum temperature reached"));
  });

  it("has a reset button that sets the temperature to 20 degrees", function() {
    thermostat.tempUp();
    thermostat.resetTemp();
    expect(thermostat.temperature).toEqual(20);
  });

  it("should display low energy usage", function() {
    thermostat.temperature = 17;
    expect(thermostat.energyLevel()).toEqual("Low energy usage");
  });

  it("should display moderate energy usage", function() {
    thermostat.temperature = 23;
    expect(thermostat.energyLevel()).toEqual("Moderate energy usage");
  });

  it("should display high energy usage", function() {
    thermostat.temperature = 28;
    expect(thermostat.energyLevel()).toEqual("High energy usage");
  });
});
