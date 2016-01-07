function Thermostat(temperature, powerMode) {
  this.powerMode = powerMode || true;
  this.temperature = temperature || 20;

}

Thermostat.prototype.tempUp = function() {
  if (this.powerMode === false && this.temperature >= 32) {
    throw new Error("maximum temperature reached");
  }
  if (this.powerMode === true && this.temperature >= 25) {
    throw new Error("maximum power saving temperature reached");
  }
  return this.temperature++;
};

Thermostat.prototype.tempDown = function() {
  if (this.temperature <= 10) {
    throw new Error("minimum temperature exceeded");
  }
  return this.temperature--;
};

Thermostat.prototype.powerModeSwitch = function() {
  if (this.powerMode === true) {this.powerMode = false;}
  else if (this.powerMode === false) {this.powerMode = true;}
};

Thermostat.prototype.resetTemp = function() {
  this.temperature = 20;
};

Thermostat.prototype.energyLevel = function() {
  if (this.temperature <= 18)
    return ("Low energy usage");
  if (this.temperature <= 25)
    return ("Moderate energy usage");
  if (this.temperature >= 26)
    return ("High energy usage");
};
