
var levels = [

["Level Selection",[
	[BLOCK_SPAWN, 		2,4],
	[BLOCK_WALL,0,0,16,3],
	[BLOCK_WALL,0,0,1,16],
	[BLOCK_WALL,14,0,2,16],
	[BLOCK_WALL,4,3,10,2],
	[BLOCK_WALL,1,8,10,1],
	[BLOCK_WALL,0,12,16,4],
	[BLOCK_HINT,		8,1,"Arrow keys to move"],
	[BLOCK_HINT,		8,2,"Z to load a level"],
	[BLOCK_HINT,		8,3,"P to pause"],
	[BLOCK_HINT,		8,13,"R to restart"],
	[BLOCK_HINT,		8,14,"M to mute"],
	[BLOCK_HINT,		8,15,"Q to quit back to here"],
	[BLOCK_LEVELSELECT,	2,6,1,1, 1],
	[BLOCK_LEVELSELECT,	4,6,1,1, 2],
	[BLOCK_LEVELSELECT,	6,6,1,1, 3],
	[BLOCK_LEVELSELECT,	8,6,1,1, 4],
	[BLOCK_LEVELSELECT,	10,6,1,1, 5],
	[BLOCK_LEVELSELECT,	12,6,1,1, 6],
	[BLOCK_LEVELSELECT,	12,8,1,1, 7],
	[BLOCK_LEVELSELECT,	12,10,1,1, 8],
	[BLOCK_LEVELSELECT,	10,10,1,1, 9],
	[BLOCK_LEVELSELECT,	8,10,1,1, 10],
	[BLOCK_LEVELSELECT,	6,10,1,1, 11],
	[BLOCK_LEVELSELECT,	4,10,1,1, 12],
	[BLOCK_LEVELSELECT,	2,10,1,1, 13],
],
"\"The laws of physics are symmetric with respect to time.  There is nothing \
that requires time to run only in a single direction. And finally, after years \
of research, we have cracked the code. We can reverse the arrow.\"\n\
     - Steven Richards, Founder of Causality Laboratories"
],

["Beginnings",[
	[BLOCK_SPAWN,3,5],
	[BLOCK_WALL,0,0,16,4],
	[BLOCK_WALL,0,8,16,8],
	[BLOCK_FWD,0,4,16,4],
	[BLOCK_DOOR,10,5,1,1,'A'],
	[BLOCK_WALL,10,4,1,1],
	[BLOCK_WALL,10,6,1,2],
	[BLOCK_TRIGGER, 9,4],
	[BLOCK_EXIT,13,6],
	[BLOCK_HINT,7,3.5,"Z to press button"],
	[BLOCK_HINT,13.5,9,"Z to open exit"],
],
"\"Welcome to Causality Labs! For your protection, separate zones in our \
facility are separated by large blast doors. Please do not loiter directly \
below any blast door, as they are very heavy. We will try not to crush you \
beneath them, but accidents can happen!\"\n\
     - from Causality Labs Visitor Information Packet"
],

["Heavy Lifting",[
	[BLOCK_SPAWN,2,2],
	[BLOCK_FWD,0,0,16,16],
	[BLOCK_WALL,7,0,9,10],
	[BLOCK_WALL,3,9,1,1],
	[BLOCK_WALL,7,10,1,5],
	[BLOCK_BUTTON,4,8],
	[BLOCK_BUTTON,2,10],
	[BLOCK_BUTTON,6,13],
	[BLOCK_BUTTON,6,14],
	[BLOCK_DOOR,0,9,3,1,'B'],
	[BLOCK_DOOR,4,9,3,1,'A'],
	[BLOCK_DOOR,7,15,1,1,'CD'],
	[BLOCK_BOX, 4,2],
	[BLOCK_BOX, 5,11],
	[BLOCK_EXIT,13,13],
	[BLOCK_HINT,11,6,"Z to pick up boxes"]
],
"\"Please refrain from handling our Uniform Density Matter Cubes by the \
corners, which may be extremely sharp. The cost of cleaning up any bloodstains \
on the cubes must be paid in full by any employee who stains them.\"\n\
     - Causality Labs Equipment Manual, page 75"
],

["Undo/Redo",[
	[BLOCK_SPAWN,3,5],
	[BLOCK_FWD,0,5,6,8],
	[BLOCK_FWD,10,5,6,8],
	[BLOCK_WALL,0,0,16,5],
	[BLOCK_WALL,0,13,16,3],
	[BLOCK_WALL,5,5,1,7],
	[BLOCK_WALL,10,6,1,7],
	[BLOCK_TRIGGER,2,11],
	[BLOCK_DOOR,5,12,1,1,'A'],
	[BLOCK_DOOR,10,5,1,1,'a'],
	[BLOCK_EXIT,13,6],
	[BLOCK_HINT,8,2.5,"Space to reverse time in white zones"],
	[BLOCK_HINT,8,14,"Green circle follows you"],
	[BLOCK_HINT,8,15,"Previous actions become time echoes"],
],
"\"Under NO circumstances should you attempt to communicate or interfere with \
the actions of your previous self! If you believe you are caught in a paradox, \
close your eyes, plug your ears, and scream 'CODE PURPLE' as loudly as you \
can. A causality restoration team will be with you shortly to reset your \
timeline.\"\n\
    - Causality Labs Safety Guidelines for New Employees, page 27"
],

["The Long Way Around",[
	[BLOCK_SPAWN,3,5],
	[BLOCK_EXIT,1,12],
	[BLOCK_LASER,5,4,1,10,'5:0'],
	[BLOCK_LASER,6,4,1,10,'5:1'],
	[BLOCK_LASER,7,4,1,10,'5:2'],
	[BLOCK_LASER,8,4,1,10,'5:3'],
	[BLOCK_LASER,9,4,1,10,'5:4'],
	[BLOCK_LASER,10,4,1,10,'5:0'],
	[BLOCK_LASER,0,11,3,3,'A'],
	[BLOCK_BUTTON,1,10],
	[BLOCK_BOX,13,10],
	[BLOCK_WALL,0,0,16,3],
	[BLOCK_WALL,5,4,1,9],
	[BLOCK_WALL,6,4,5,1],
	[BLOCK_WALL,10,6,1,8],
	[BLOCK_WALL,7,6,3,1],
	[BLOCK_WALL,6,8,3,1],
	[BLOCK_WALL,7,10,3,1],
	[BLOCK_WALL,6,12,3,1],
	[BLOCK_WALL,0,14,16,2],
	[BLOCK_ONEWAY,5,3,6,1,0],
	[BLOCK_HINT,8,1,"Lasers kill you"],
],
"\"For your safety, we have installed deadly high-powered lasers in \
high-security areas. Remember, even time travel can't help you if you have \
been vaporized!\"\n\
    - Causality Labs Safety Guidelines for New Employees, page 13"
],

["Too Many Buttons",[
	[BLOCK_SPAWN,8,1],
	[BLOCK_FWD,0,3,16,11],
	[BLOCK_BOX,8,4],
	[BLOCK_BUTTON,5,5],
	[BLOCK_BUTTON,11,5],
	[BLOCK_DOOR,7,7,3,1,'AB'],
	[BLOCK_WALL,0,0,3,16],
	[BLOCK_WALL,14,0,2,16],
	[BLOCK_WALL,0,10,16,6],
	[BLOCK_WALL,0,7,7,3],
	[BLOCK_WALL,10,7,7,3],
	[BLOCK_EXIT,8,9],
],
"\"4. Conservation of Matter. Just ignore it. Really. Our physicists are still \
working on this one. Time travel is weird.\"\n\
    - Excerpt from \"10 Surprising Wrong Things You Learned in School\", a \
Causality Labs Community Relations pamphlet"
],

["Button Mashing",[

	[BLOCK_WALL,0,0,7,3],
	[BLOCK_WALL,0,0,3,7],
	[BLOCK_WALL,9,0,7,3],
	[BLOCK_WALL,13,0,3,7],
	[BLOCK_WALL,0,13,7,3],
	[BLOCK_WALL,0,9,3,7],
	[BLOCK_WALL,9,13,7,3],
	[BLOCK_WALL,13,9,3,7],

	[BLOCK_FWD,7,0,2,3],
	[BLOCK_FWD,0,7,3,2],
	[BLOCK_FWD,7,13,2,3],
	[BLOCK_FWD,13,7,3,2],

	[BLOCK_SPAWN,0, 7],
	[BLOCK_BOX,8,0],
	[BLOCK_EXIT,15,8],
	[BLOCK_BUTTON,7,15],

	[BLOCK_DOOR, 14,7,1,2,'A'],

	[BLOCK_LASER,3,3,10,10,'2'],

	[BLOCK_WALL, 4,6,2,4],
	[BLOCK_WALL, 10,6,2,4],
	[BLOCK_WALL, 3,3,2,2],
	[BLOCK_WALL, 11,11,2,2],
	[BLOCK_WALL, 8,4,1,5],
	[BLOCK_WALL, 7,7,1,5],

],
"\"Excessive exposure to the Time-Reversal Device in a short interval may \
cause a number of minor side effects, including but not limited to: vomiting, \
hair loss, blindness, paranoia, radiation poisoning, and total cellular \
breakdown. Causality Labs is not responsible for any improper use of the TRD.\"\n\
    - Causality Labs Release of Liability Agreement"
],

["Choreography",[

	[BLOCK_SPAWN,12,5],

	[BLOCK_WALL,0,0,16,4],
	[BLOCK_WALL,0,12,16,4],
	[BLOCK_WALL,4,7,16,2],
	[BLOCK_FWD,0,9,16,3],

	[BLOCK_BOX,14,5],

	[BLOCK_BUTTON, 10,5],
	[BLOCK_BUTTON, 8,5],
	[BLOCK_BUTTON, 6,5],

	[BLOCK_DOOR,5,9,1,3,'A'],
	[BLOCK_DOOR,6,9,1,3,'B'],
	[BLOCK_DOOR,7,9,1,3,'a'],
	[BLOCK_DOOR,8,9,1,3,'C'],
	[BLOCK_DOOR,9,9,1,3,'B'],
	[BLOCK_DOOR,10,9,1,3,'A'],
	[BLOCK_DOOR,11,9,1,3,'b'],
	[BLOCK_DOOR,12,9,1,3,'c'],

	[BLOCK_EXIT,14,10],

],
"\"Federal security codes mandate that sensitive areas be protected by eight \
consecutive lead-enforced blast doors, which require three trained Security \
Technicians to operate. Under no circumstances attempt to enter these areas \
without proper escorts.\"\n\
    - Causality Labs Safety Guidelines for New Employees, page 416"
],

["Feynman",[

	[BLOCK_SPAWN,9,10],
	[BLOCK_BOX,6,10],

	[BLOCK_WALL,0,0,16,4],
	[BLOCK_WALL,0,12,16,4],
	[BLOCK_WALL,0,0,3,16],
	[BLOCK_WALL,13,0,3,16],

	[BLOCK_WALL,6,4,1,3],
	[BLOCK_WALL,9,4,1,3],
	[BLOCK_WALL,4,6,1,1],
	[BLOCK_WALL,11,6,1,1],

	[BLOCK_FWD,3,4,3,2],
	[BLOCK_FWD,10,4,3,2],

	[BLOCK_ONEWAY,3,6,1,1,3],
	[BLOCK_ONEWAY,12,6,1,1,3],
	[BLOCK_NOBOX,5,6,1,1],
	[BLOCK_NOBOX,10,6,1,1],

	[BLOCK_BUTTON,4,4],
	[BLOCK_BUTTON,11,4],

	[BLOCK_DOOR,7,6,2,1,'AB'],

	[BLOCK_EXIT,8,4],

	[BLOCK_HINT,8,14,"Orange grids block boxes"],

],
"\"Our Density Interference Grids are carefully calibrated to repel our \
Uniform Density Matter Cubes. However, in some cases, badly-calibrated fields \
may block other high-density materials, such as keys, tooth fillings, and \
components of pacemakers. Unfortunately these fields cannot be deactivated, so \
these items may need to be left behind.\"\n\
    - Causality Labs Equipment Manual, page 136"
],

["Equal and Opposite",[

	[BLOCK_SPAWN,1,1],

	[BLOCK_FWD,4,0,8,8],
	[BLOCK_BWD,4,8,8,8],

	[BLOCK_NOBOX,3,0,1,16],
	[BLOCK_NOBOX,12,0,1,16],

	[BLOCK_WALL,3,0,3,4],
	[BLOCK_WALL,7,0,1,4],
	[BLOCK_WALL,9,0,1,4],
	[BLOCK_WALL,11,0,5,4],

	[BLOCK_WALL,10,12,3,4],
	[BLOCK_WALL,8,12,1,4],
	[BLOCK_WALL,6,12,1,4],
	[BLOCK_WALL,0,12,5,4],

	[BLOCK_BUTTON,6,2],
	[BLOCK_BUTTON,8,2],
	[BLOCK_BUTTON,10,2],
	[BLOCK_BUTTON,5,13],
	[BLOCK_BUTTON,7,13],
	[BLOCK_BUTTON,9,13],

	[BLOCK_TRIGGER,6,0],
	[BLOCK_TRIGGER,8,0],
	[BLOCK_TRIGGER,10,0],
	[BLOCK_TRIGGER,5,15],
	[BLOCK_TRIGGER,7,15],
	[BLOCK_TRIGGER,9,15],

	[BLOCK_DOOR,6,1,1,1,'A'],
	[BLOCK_DOOR,8,1,1,1,'B'],
	[BLOCK_DOOR,10,1,1,1,'C'],
	[BLOCK_DOOR,5,14,1,1,'D'],
	[BLOCK_DOOR,7,14,1,1,'E'],
	[BLOCK_DOOR,9,14,1,1,'F'],

	[BLOCK_DOOR,8,3,1,1,'J'],
	[BLOCK_DOOR,10,3,1,1,'K'],
	[BLOCK_DOOR,5,12,1,1,'G'],
	[BLOCK_DOOR,7,12,1,1,'H'],
	[BLOCK_DOOR,9,12,1,1,'I'],
	[BLOCK_DOOR,13,13,3,1,'L'],

	[BLOCK_BOX,5,5],
	[BLOCK_BOX,10,10],

	[BLOCK_EXIT,14,15],

],
"\"As part of our corporate redecoration, we will be replacing some of our \
blue forward-locked time fields with purple backward-locked fields. We \
apologize for any inconvenience, and hope this will allow for a much more \
pleasant, colorful work experience!\"\n\
    - Bob Bobson, VP of Human Resources"
],

["Laser Tag",[

	[BLOCK_SPAWN,0,15],
	[BLOCK_BOX,0,14],
	[BLOCK_ONEWAY,1,13,1,1,0],

	[BLOCK_WALL,0,0,2,13],
	[BLOCK_WALL,1,14,7,2],
	[BLOCK_WALL,9,14,7,2],
	[BLOCK_WALL,14,0,2,4],
	[BLOCK_WALL,14,7,2,7],
	[BLOCK_WALL,14,5,1,1],

	[BLOCK_LASER,2,0,1,14,'5:0'],
	[BLOCK_LASER,3,0,1,14,'5:1'],
	[BLOCK_LASER,4,0,1,14,'5:2'],
	[BLOCK_LASER,5,0,1,14,'5:3'],
	[BLOCK_LASER,6,0,1,14,'5:4'],
	[BLOCK_LASER,7,0,1,14,'5:0'],
	[BLOCK_LASER,8,0,1,14,'5:1'],
	[BLOCK_LASER,9,0,1,14,'5:2'],
	[BLOCK_LASER,10,0,1,14,'5:3'],
	[BLOCK_LASER,11,0,1,14,'5:4'],
	[BLOCK_LASER,12,0,1,14,'5:0'],
	[BLOCK_LASER,13,0,1,14,'5:1'],

	[BLOCK_ONEWAY,14,4,1,1,2],

	[BLOCK_BUTTON,13,7],
	[BLOCK_BUTTON,13,8],
	[BLOCK_DOOR,14,6,1,1,'AB'],
	[BLOCK_ONEWAY,14,4,1,1,2],

	[BLOCK_BUTTON,2,11],
	[BLOCK_BUTTON,7,7],
	[BLOCK_BUTTON,12,12],
	[BLOCK_DOOR,8,14,1,1,'CDE'],

	[BLOCK_EXIT,8,15],

],
"\"Room 32B looks so empty. It's boring. Why don't you put some of those new \
things in there? You know, the high-powered laser somethings we just bought? \
I'm sure they'd make it look much more inviting.\"\n\
    - Internal memo from founder Steven Richards to HR"
],

["There and Back Again",[

	[BLOCK_WALL,0,0,6,6],
	[BLOCK_WALL,0,10,6,6],
	[BLOCK_WALL,7,1,8,5],
	[BLOCK_WALL,7,10,8,3],
	[BLOCK_WALL,9,10,6,5],
	[BLOCK_WALL,0,6,5,1],
	[BLOCK_WALL,0,9,5,1],

	[BLOCK_FWD,5,6,8,4],
	[BLOCK_SPAWN,5,7],

	[BLOCK_BUTTON,3,8],
	[BLOCK_DOOR,2,7,1,2,'A'],
	[BLOCK_EXIT,0,8],

	[BLOCK_TRIGGER,7,8],
	[BLOCK_DOOR,4,7,1,2,'b'],
	[BLOCK_DOOR,9,6,1,4,'B'],

	[BLOCK_BOX,11,7],

	[BLOCK_ONEWAY,6,5,1,1,1],
	[BLOCK_NOBOX,6,5,1,1],
	[BLOCK_DOOR,6,10,1,1,'D'],
	[BLOCK_TRIGGER,6,11],
	[BLOCK_DOOR,6,12,1,1,'C'],
	[BLOCK_BUTTON,7,14],

	[BLOCK_BUTTON,8,0],
	[BLOCK_DOOR,7,0,1,1,'E'],

	[BLOCK_BUTTON,15,2],
	[BLOCK_DOOR,15,1,1,1,'F'],

	[BLOCK_BUTTON,10,15],
	[BLOCK_DOOR,9,15,1,1,'G'],

	[BLOCK_BUTTON,15,13],
	[BLOCK_DOOR,15,14,1,1,'H'],

],
"\"Ever wished you could be two different places at the same time! Well, now \
you can! Spend a whole day at work, then go back and spend it again with your \
kids! Take a vacation and be back before you left! All this could be yours for \
just $29.99! That's right, just twenty-nine point nine-nine factorial dollars.\"\n\
    - Mike \"Blink\" Johnson, Causality Labs Salesperson"
],

["Around the World",[

	[BLOCK_SPAWN,5,12],

	[BLOCK_WALL,7,0,2,1],
	[BLOCK_WALL,7,2,2,12],
	[BLOCK_WALL,7,15,2,1],

	[BLOCK_WALL,0,5,3,1],
	[BLOCK_WALL,4,5,8,1],
	[BLOCK_WALL,13,5,3,1],
	[BLOCK_WALL,0,10,3,1],
	[BLOCK_WALL,4,10,8,1],
	[BLOCK_WALL,13,10,3,1],

	[BLOCK_ONEWAY,3,10,1,1,3],
	[BLOCK_ONEWAY,3,5,1,1,3],
	[BLOCK_ONEWAY,7,1,2,1,0],
	[BLOCK_ONEWAY,12,5,1,1,1],
	[BLOCK_ONEWAY,12,10,1,1,1],
	[BLOCK_NOBOX,7,14,2,1],

	[BLOCK_BUTTON,10,12],

	[BLOCK_WALL,1,0,1,2],
	[BLOCK_DOOR,0,1,1,1,'A'],
	[BLOCK_BUTTON,0,0],

	[BLOCK_WALL,14,0,1,2],
	[BLOCK_DOOR,15,1,1,1,'A'],
	[BLOCK_BUTTON,15,0],

	[BLOCK_WALL,1,8,1,2],
	[BLOCK_DOOR,0,8,1,1,'A'],
	[BLOCK_BUTTON,0,9],

	[BLOCK_WALL,14,8,1,2],
	[BLOCK_DOOR,15,8,1,1,'A'],
	[BLOCK_BUTTON,15,9],

	[BLOCK_FWD,0,13,3,3],
	[BLOCK_BOX,1,14],

	[BLOCK_EXIT,14,14],
	[BLOCK_LASER,13,13,3,3,'BCDE']

],
"\"Notice: Any reports of our Uniform Density Matter Cubes exploding without \
warning have been greatly exaggerated. The cubes always emit a warning beep 3 \
seconds before detonation.\"\n\
    - Maria Thompson, VP of Lab Safety"
],

["Reverse Engineering",[

	[BLOCK_EXIT,15,11],

	[BLOCK_FWD,0,0,3,5],

	[BLOCK_FWD,0,5,16,3,'a'],
	[BLOCK_FWD,1,8,2,3,'a'],
	[BLOCK_FWD,0,11,15,5,'a'],
	[BLOCK_LASER,15,11,1,1,'a'],
	[BLOCK_DOOR,1,3,1,2,'A'],

	[BLOCK_SPAWN,1,1],
	[BLOCK_TRIGGER,1,2],

	[BLOCK_WALL,3,0,13,5],
	[BLOCK_WALL,0,3,1,2],
	[BLOCK_WALL,2,3,1,2],

	[BLOCK_WALL,0,8,1,3],
	[BLOCK_WALL,3,8,6,3],
	[BLOCK_WALL,10,8,6,3],

	[BLOCK_WALL,14,5,2,2],

	[BLOCK_WALL,0,14,10,2],
	[BLOCK_WALL,11,14,2,1],
	[BLOCK_WALL,14,12,2,4],

	[BLOCK_BOX,6,6],

	[BLOCK_BUTTON,13,7],
	[BLOCK_DOOR,14,7,1,1,'B'],
	[BLOCK_BOX,15,7],

	[BLOCK_BUTTON,3,13],
	[BLOCK_DOOR,4,13,1,1,'C'],
	[BLOCK_WALL,4,12,1,1],
	[BLOCK_DOOR,4,11,1,1,'D'],
	[BLOCK_BUTTON,5,11],

	[BLOCK_BUTTON,6,13],
	[BLOCK_DOOR,7,13,1,1,'E'],
	[BLOCK_WALL,7,12,1,1],
	[BLOCK_DOOR,7,11,1,1,'F'],
	[BLOCK_BUTTON,8,11],

	[BLOCK_ONEWAY,9,8,1,3,3],

	[BLOCK_ONEWAY,10,14,1,1,1],
	[BLOCK_NOBOX,13,14,1,1],

	[BLOCK_BUTTON,10,15],
	[BLOCK_BUTTON,11,15],
	[BLOCK_BUTTON,12,15],
	[BLOCK_BUTTON,13,15],

	[BLOCK_DOOR,14,11,1,1,'GHIJ'],


],
"\"Please refrain from loitering in our One-Way Control Fields for extended \
periods of time. Airflow through them is a major problem. Causality Labs would \
like to remind you that asphyxiation in our facilities is not covered by our \
insurance policy!\"\n\
    - Causality Labs Safety Guidelines for New Employees, page 853"
],

// ["!!! Kitchen Sink !!!",[
// 	[BLOCK_SPAWN, 		0,0],

// 	[BLOCK_WALL,0,0,1,1],
// 	[BLOCK_BUTTON,0,1],
// 	[BLOCK_DOOR,0,2,1,1],
// 	[BLOCK_LASER,0,3,1,1],
// 	[BLOCK_FWD,0,4,1,1],
// 	[BLOCK_BWD,0,5,1,1],
// 	[BLOCK_NOBOX,0,6,1,1],
// 	[BLOCK_ONEWAY,0,7,1,1,1],
// 	[BLOCK_TRIGGER,0,8],

// 	[BLOCK_DOOR,3,2,1,1,'a'],
// 	[BLOCK_DOOR,3,3,1,1,'A'],
// 	[BLOCK_DOOR,3,4,1,1,'b'],

// 	[BLOCK_WALL,6,2,1,5],
// 	[BLOCK_DOOR,7,2,1,5,'2'],
// 	[BLOCK_WALL,8,2,1,5],

// 	[BLOCK_ONEWAY,2,9,3,3,2],

// 	[BLOCK_FWD,0,10,1,1,'2'],
// 	[BLOCK_BWD,0,11,1,1,'2'],

// 	[BLOCK_BOX,4,4],
// 	[BLOCK_SPAWN,5,5],
// 	[BLOCK_EXIT,12,5]
// ]],

];