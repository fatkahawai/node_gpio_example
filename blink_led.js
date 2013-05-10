/*
 * blink_led.js
 *
 * a nodeJS script for the Raspberry Pi using the pi-gpio node library to control the RPi GPIO
 *
 * Installing the library
The Raspberry Pi's GPIO pins require you to be root to access them. That's totally unsafe for 
several reasons. To get around this problem, you should use the excellent gpio-admin.

Do the following on your raspberry pi:
git clone git://github.com/quick2wire/quick2wire-gpio-admin.git
cd quick2wire-gpio-admin
make
sudo make install
sudo adduser $USER gpio
After this, you will need to logout and log back in. Details, if you are interested.

Next, cd to your project directory and use npm to install pi-gpio in your project.
npm install pi-gpio

 * @see: npmjs.org/package/pi-gpio
 * @author: Ceeb
 * (C) 2013 
 */

var gpio = require("pi-gpio");

var intervalId;
var durationId;
var gpioPin = 16; // = IO port 23 

// open pin 16 for output
//
gpio.open(gpioPin, "output", function(err) {     
    var  on = 1;

    console.log('GPIO pin '+gpioPin+' is open. now toggling LED every 100 mS for 10s');

    // toggle the LED every 100mS
    intervalId = setInterval( function(){
      gpio.write(gpioPin, on, function() {     // toggle pin between  high (1) and low (0)
        on = (on + 1) % 2;
      });
    }, 100);
});    
    
// let it run for 10 seconds, then close port and exit
//
durationId= setTimeout( function(){ 
  clearInterval(intervalId);
  clearTimeout(durationId);
  console.log('10 seconds blinking completed');

  gpio.write(gpioPin, 0, function() {           // turn off pin 16
    gpio.close(gpioPin);                        // then Close pin 16
    process.exit(0);                            // and terminate the program
  });
}, 10000); // duration in mS


