JavaScript Network Model
========================

Overview
--------
The goal of jsnetmodel is to provide an easy to use framework for simulating computer networks. Using jsnetmodel,
you can learn about various protocols (e.g. tcp/ip or ethernet), implement security attacks or defenses against
a set of known issues, experiment with new ideas, etc.


Why JavaScript?
---------------
I wanted to barrier to entry for using this project to be as low as possible. JavaScript offers the following
compelling reasons:
* It's an easy-to-learn and easy-to-hack language. There's no need to deal with a build process, and no need to
  deal with library dependencies.
* It's ubiquitous: everybody uses web browsers, and every modern browser can run JavaScript.
* The browser provides an easy way to build user interfaces. I want jsnetsim to be visually appealing.


Kinds of networks that can be simulated
---------------------------------------
* None


How does this project compare to nsnam (ns-3)?
----------------------------------------------
ns-3 is a high quality, network simulator. It's targeted to scientifique research and is heavily funded. The goal
of jsnetmodel is not to compete with such a high quality project, but to provide an easier to use simulator.

I see people using jsnetmodel to learn the basics about networks and then switching to ns-3 to deepen their knowledge.


How are the models validated?
-----------------------------
This might sound crazy, but I plan to provide a way to run the JavaScript network stack on a physical device.

