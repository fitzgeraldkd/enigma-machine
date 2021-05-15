//Basic Functions
function charToInt(input) {
    return parseInt(input, 36) - 10;
}

function intToChar(input) {
    alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alpha[input];
}

function offsetInt(input, offset) {
    input += offset;
    if (input >= 26) {
        input -= 26;
    } else if (input < 0) {
        input += 26;
    }
    return input;
}
//Basic Functions

//Rotor Settings
function rotorWiring(id) {
    var rotorID = document.getElementById(id).value;
    var thisWiring;
    switch(rotorID) {
        case "I":
            thisWiring = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
            break;
        case "II":
            thisWiring = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
            break;
        case "III":
            thisWiring = "BDFHJLCPRTXVZNYEIWGAKMUSQO";
            break;
        case "IV":
            thisWiring = "ESOVPZJAYQUIRHXLNFTGKDCMWB";
            break;
        case "V":
            thisWiring = "VZBRGITYUPSDNHLXAWMJQOFECK";
            break;
        default:
            "ERROR";
    }
    return thisWiring;
}

function rotorTurnover(id) {
    var rotorID = document.getElementById(id).value;
    var thisTurnover;
    switch (rotorID) {
        case "I":
            thisTurnover = "Q";
            break;
        case "II":
            thisTurnover = "E";
            break;
        case "III":
            thisTurnover = "V";
            break;
        case "IV":
            thisTurnover = "J";
            break;
        case "V":
            thisTurnover = "Z";
            break;
        default:
            "ERROR";
    }
    return thisTurnover;
}
//Rotor Settings

//Plugboard
function plugboard(input) {
    var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var pbID = "pb" + input.toUpperCase();
    var thisValue = document.getElementById(pbID).value;
    if (alpha.indexOf(thisValue.toUpperCase()) == -1 || thisValue == "") {
        return input.toUpperCase();
    } else {
        return thisValue;
    }
}

function updatePlugboard(input) {
    var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var thisID = "pb" + input;
    var thisValue = document.getElementById(thisID).value;
    if (alpha.indexOf(thisValue.toUpperCase()) == -1 || thisValue.toUpperCase() == input || thisValue == "") {
        document.getElementById(thisID).value = "";
    } else {
        var otherID = "pb" + thisValue.toUpperCase();
        document.getElementById(otherID).value = input;
        document.getElementById(thisID).value = thisValue.toUpperCase();
    }
    for (var i = 0; i < 26; i++) {
        var thisChar = intToChar(i);
        var thisID = "pb" + thisChar;
        var checkValue = document.getElementById(thisID).value;
        if ((checkValue == input && thisChar != thisValue.toUpperCase()) || (checkValue == thisValue.toUpperCase() && thisChar != input)) {
            document.getElementById(thisID).value = "";
        }
    }
}
//Plugboard

//Rotor Functions
function rotateRotor(id) {
    var stepID = id + "step";
    var origStepValue = document.getElementById(stepID).value;
    var newStepValue = charToInt(origStepValue);
    newStepValue = offsetInt(newStepValue, 1);
    newStepValue = intToChar(newStepValue);
    document.getElementById(stepID).value = newStepValue;
    return origStepValue;
}

function rotor(id, input) {
    var thisRotor = rotorWiring(id);
    var thisRotorStep = document.getElementById(id + "step").value;
    var thisRotorSetting = document.getElementById(id + "setting").value;
    var thisLetter = charToInt(input);
    thisRotorStep = charToInt(thisRotorStep);
    thisLetter = offsetInt(thisLetter, thisRotorStep);
    thisRotorSetting = charToInt(thisRotorSetting);
    thisLetter = offsetInt(thisLetter, -thisRotorSetting);
    thisLetter = thisRotor[thisLetter];
    thisLetter = charToInt(thisLetter);
    thisLetter = offsetInt(thisLetter, thisRotorSetting);
    thisLetter = offsetInt(thisLetter, -thisRotorStep);
    thisLetter = intToChar(thisLetter);
    return thisLetter;
}

function rotorReverse(id, input) {
    var thisRotor = rotorWiring(id);
    var thisRotorStep = document.getElementById(id + "step").value;
    var thisRotorSetting = document.getElementById(id + "setting").value;
    var thisLetter = charToInt(input);
    thisRotorStep = charToInt(thisRotorStep);
    thisLetter = offsetInt(thisLetter, thisRotorStep);
    thisRotorSetting = charToInt(thisRotorSetting);
    thisLetter = offsetInt(thisLetter, -thisRotorSetting);
    thisLetter = intToChar(thisRotor.indexOf(intToChar(thisLetter)));
    thisLetter = charToInt(thisLetter);
    thisLetter = offsetInt(thisLetter, thisRotorSetting);
    thisLetter = offsetInt(thisLetter, -thisRotorStep);
    thisLetter = intToChar(thisLetter);
    return thisLetter;
}

function reflector(input) {
    var thisRotor = "YRUHQSLDPXNGOKMIEBFZCWVJAT";
    return thisRotor[charToInt(input)];
}

function cipher() {
    var textInput = document.getElementById("textInput").value;
    var textOutput = "";
    var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (alpha.indexOf(document.getElementById("rotorAstep").value.toUpperCase()) == -1) {
        document.getElementById("rotorAstep").value = "A";
    }
    if (alpha.indexOf(document.getElementById("rotorAsetting").value.toUpperCase()) == -1) {
        document.getElementById("rotorAsetting").value = "A";
    }
    if (alpha.indexOf(document.getElementById("rotorBstep").value.toUpperCase()) == -1) {
        document.getElementById("rotorBstep").value = "A";
    }
    if (alpha.indexOf(document.getElementById("rotorBsetting").value.toUpperCase()) == -1) {
        document.getElementById("rotorBsetting").value = "A";
    }
    if (alpha.indexOf(document.getElementById("rotorCstep").value.toUpperCase()) == -1) {
        document.getElementById("rotorCstep").value = "A";
    }
    if (alpha.indexOf(document.getElementById("rotorCsetting").value.toUpperCase()) == -1) {
        document.getElementById("rotorCsetting").value = "A";
    }

    for (var i in textInput) {
        var thisLetter = textInput[i];
        if (alpha.indexOf(thisLetter.toUpperCase()) != -1) {
            var prevStep = rotateRotor("rotorC");
            var thisTurnover = rotorTurnover("rotorC");
            if (prevStep == thisTurnover) {
                prevStep = rotateRotor("rotorB");
                thisTurnover = rotorTurnover("rotorB");
                if (prevStep == thisTurnover) {
                    prevStep = rotateRotor("rotorA");
                }
            }
            thisLetter = plugboard(thisLetter);				//Plugboard - First Pass
            thisLetter = rotor("rotorC",thisLetter);		//Rotor C - First Pass
            thisLetter = rotor("rotorB",thisLetter);		//Rotor B - First Pass
            thisLetter = rotor("rotorA",thisLetter);		//Rotor A - First Pass
            thisLetter = reflector(thisLetter);				//Reflector
            thisLetter = rotorReverse("rotorA",thisLetter);	//Rotor A - Second Pass
            thisLetter = rotorReverse("rotorB",thisLetter);	//Rotor B - Second Pass
            thisLetter = rotorReverse("rotorC",thisLetter);	//Rotor C - Second Pass
            thisLetter = plugboard(thisLetter);				//Plugboard - Second Pass
        }
        textOutput += thisLetter;
    }
    document.getElementById("textOutput").value = textOutput;
}
