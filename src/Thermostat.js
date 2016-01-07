"use strict";

function Thermostat(temperature, powerMode, minimum) {
  this.isPowerModeOn = powerMode || true;

  this.DEFAULT_TEMPERATURE = 20;

  this.MAX_TEMP_PSM_ON = 25;
  this.MAX_TEMP_PSM_OFF = 32;
  this.LOW_USAGE_TEMP = 18;
  this.HIGH_USAGE_TEMP = 25;
  this.temperature = temperature || this.DEFAULT_TEMPERATURE;
  this.MIN_TEMPERATURE = minimum || 10;

}

Thermostat.prototype.getCurrentTemperature = function() {
  return this.temperature;
};

Thermostat.prototype.tempUp = function() {
  if (this.isPowerModeOn === false && this.temperature >= this.MAX_TEMP_PSM_OFF) {
    throw new Error("maximum temperature reached");
  }
  if (this.isPowerModeOn === true && this.temperature >= this.MAX_TEMP_PSM_ON) {
    throw new Error("maximum power saving temperature reached");
  }
  return this.temperature++;
};

Thermostat.prototype.tempDown = function() {
  if (this.temperature <= this.MIN_TEMPERATURE) {
    throw new Error("minimum temperature exceeded");
  }
  return this.temperature--;
};

Thermostat.prototype.powerModeSwitch = function() {
  if (this.isPowerModeOn === true) {this.isPowerModeOn = false;}
  else if (this.isPowerModeOn === false) {this.isPowerModeOn = true;}
};

Thermostat.prototype.resetTemp = function() {
  this.temperature = this.DEFAULT_TEMPERATURE;
};

Thermostat.prototype.energyLevel = function() {
  if (this.temperature < this.LOW_USAGE_TEMP) {return "Low energy usage";}
  if (this.temperature < this.HIGH_USAGE_TEMP) {return "Moderate energy usage";}
  if (this.temperature >= this.HIGH_USAGE_TEMP) {return "High energy usage";}
};
