### Enigma Machine

alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

# Basic Functions

def charToInt(input):
	return alpha.find(input)

def intToChar(input):
	return alpha[input]

def offsetInt(input, offset):
	input += offset
	if input >= 26:
		input -= 26
	elif input < 0:
		input += 26
	return input

# Rotor Setup

class Rotor:
	def __init__(self,name,wire,turn):
		self.name = name
		self.wire = wire
		self.turnover = turn
		self.step = 'A'
		self.setting = 'A'
	
	def setStep(self,step):
		self.step = step
	
	def setSetting(self,setting):
		self.setting = setting
	
	def turn(self):
		self.step = intToChar(offsetInt(charToInt(self.step),1))
	
	def run(self,input):
		char = charToInt(input)
		char = offsetInt(char,charToInt(self.step))
		char = offsetInt(char,-1*charToInt(self.setting))
		char = charToInt(self.wire[char])
		char = offsetInt(char,charToInt(self.setting))
		char = offsetInt(char,-1*charToInt(self.step))
		return intToChar(char)
	
	def runR(self,input):
		char = charToInt(input)
		char = offsetInt(char,charToInt(self.step))
		char = offsetInt(char,-1*charToInt(self.setting))
		char = charToInt(alpha[self.wire.index(intToChar(char))])
		char = offsetInt(char,charToInt(self.setting))
		char = offsetInt(char,-1*charToInt(self.step))
		return intToChar(char)

rotors = []
rotors.append(Rotor('I','EKMFLGDQVZNTOWYHXUSPAIBRCJ','Q'))
rotors.append(Rotor('II','AJDKSIRUXBLHWTMCQGZNPYFVOE','E'))
rotors.append(Rotor('III','BDFHJLCPRTXVZNYEIWGAKMUSQO','V'))
rotors.append(Rotor('IV','ESOVPZJAYQUIRHXLNFTGKDCMWB','J'))
rotors.append(Rotor('V','VZBRGITYUPSDNHLXAWMJQOFECK','Z'))

# Machine Setup

class Enigma:
	def __init__(self,rots,plugs):
		self.rotors = rots
		self.plugs = plugs
		self.reflector = 'YRUHQSLDPXNGOKMIEBFZCWVJAT'
	
	def turn(self):
		prevValue = self.rotors[-1].step
		self.rotors[-1].turn()
		for x in range(len(self.rotors)-2,-1,-1):
			if self.rotors[x+1].turnover == prevValue:
				self.rotors[x].turn()
				prevValue = self.rotors[x].step
			else:
				break
	
	def runPlug(self,char):
		for plug in self.plugs:
			if char in plug:
				return plug.replace(char,'')
		return char
	
	def cipher(self,message):
		output = ''
		for char in message:
			if char.upper() in alpha:
				char = char.upper()
				self.turn()
				char = self.runPlug(char)
				for x in range(len(self.rotors)):
					char = self.rotors[len(self.rotors)-x-1].run(char)
				char = self.reflector[charToInt(char)]
				for x in range(len(self.rotors)):
					char = self.rotors[x].runR(char)
				char = self.runPlug(char)
			output += char
		return output

rots = []
print('Rotors:')
for count, rotor in enumerate(rotors):
	print(count,rotor.wire)
print('\nSelect Rotors')
for x in range(3):
	while True:
		prompt = 'ID of Rotor ' + str(x) + ': '
		rotId = input(prompt)
		try:
			rotId = int(rotId)
			# TODO: check if rotor already used
			if rotId < len(rotors) and rotId >= 0:
				rots.append(rotors[rotId])
				break
			else:
				print('Invalid ID')
		except:
			print('Invalid ID')

unused = alpha
pairs = []
print('\nConnect Plugboard')
while True:
	print('\nUnused letters:',unused)
	plugStr = 'Plugs: '
	for x in pairs:
		plugStr += x + ' '
	print(plugStr)
	command = input('Letter pair or "done": ')
	command = command.upper()
	if command == 'DONE' or command == '':
		break
	elif (len(command) == 2 and command[0] != command[1] and
	command[0] in alpha and command[1] in alpha):
		remPairs = []
		for counter, pair in enumerate(pairs):
			if command[0] in pair or command[1] in pair:
				unused += pair
				remPairs.append(pair)
		for pair in remPairs:
			pairs.remove(pair)
		unused = unused.replace(command[0],'')
		unused = unused.replace(command[1],'')
		newPair = command[0] + command[1]
		pairs.append(newPair)

enigma = Enigma(rots,pairs)

print(enigma.cipher(input('Message to encrypt: ')))
