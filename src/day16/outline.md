# input
*packet* in hex format

# part 1
- parse the packet.
- step 1: convert the hex to a binary string.
- first 2 bits correspond to: version.
- next 3 bits correspond to : type.

- type=4: literal packets
		- 5 bit chunks, first bit is a "continuation" (when 1: more chunks,
			when 0: last chunk)
- otherwise container packets
		- next bit: "mode"
		- mode=0:
				- next 15 bits is bit-length of sub-packets
		- mode=1: 
				- next 11 bits is number of sub-packets

- part 1: parse and sum up all `version`
