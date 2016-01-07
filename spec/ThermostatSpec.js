

"use strict";
describe("Thermostat", function() {

  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it("starts at 20 degrees", function() {
    expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMPERATURE);
  });

  it("can increase the temperature with the up button", function() {
    thermostat.tempUp();
    expect(thermostat.getCurrentTemperature()).toEqual(21);
  });

  it("can decrease the temperature with the down button", function() {
    thermostat.tempDown();
    expect(thermostat.getCurrentTemperature()).toEqual(19);
  });

  it("has a minimum temperature of 10 degrees", function() {
    for (var i = thermostat.DEFAULT_TEMPERATURE; i > thermostat.MIN_TEMPERATURE; i--) {
      thermostat.tempDown();
    }
    expect(function() {thermostat.tempDown();}).toThrow(new Error("minimum temperature exceeded"));
  });

  it("has a power saving mode that is on by default", function() {
    expect(thermostat.isPowerModeOn).toEqual(true);
  });

  it("can switch off the power saving mode", function() {
    thermostat.powerModeSwitch();
    expect(thermostat.isPowerModeOn).toEqual(false);
  });

  it("can switch on the power saving mode", function() {
    thermostat.powerModeSwitch();
    thermostat.powerModeSwitch();
    expect(thermostat.isPowerModeOn).toEqual(true);
  });

  it("has a maximum temperature of 25 degrees with power saving mode on", function() {
    thermostat.temperature = thermostat.MAX_TEMP_PSM_ON;
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
    expect(thermostat.getCurrentTemperature()).toEqual(thermostat.DEFAULT_TEMPERATURE);
  });

  it("should display low energy usage", function() {
    for (var i = thermostat.DEFAULT_TEMPERATURE; i > thermostat.LOW_USAGE_TEMP -1; i--) {
      thermostat.tempDown();
    }
    expect(thermostat.energyLevel()).toEqual("Low energy usage");
  });

  it("should display moderate energy usage", function() {
    thermostat.temperature = thermostat.DEFAULT_TEMPERATURE;
    expect(thermostat.energyLevel()).toEqual("Moderate energy usage");
  });

  it("should display high energy usage", function() {
    thermostat.temperature = thermostat.HIGH_USAGE_TEMP;
    expect(thermostat.energyLevel()).toEqual("High energy usage");
  });
});
