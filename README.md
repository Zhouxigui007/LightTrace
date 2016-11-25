# LightTrace
LightTrace is an Adobe Illustrator Extension to design, auto route and balance brightness of multiple LEDs with conductive ink. It consists of 2 parts:

- LedTool: plugin to provide LED shape in toolbox of Illustrator
- Routing Script: autorouter script to route and balance brightness of all LEDs

Requirements:

- Mac OSX (the script can run on Windows also, however, the LedTool currrently can run on Mac OSX only)
- Adobe Illustrator (newest is better)



##Install
- Download repository as .zip
- Unzip
- Open Adobe Illustrator
- Go to `Preference/Plug-ins & Scratch Disks`
- Enable `Additional Plug-ins Folder`
- Click Choose and browse to file LedTool.aip in the unzipped folder
- Restart Adobe Illustrator
- LedTool plugin has been installed

##Usage
###Placing LED and power pad
- Choose led tool (Red Led, for example) from toolbox
- Click on artboard to place LED
- After placing several LEDs, choose Power Pad
- Click on artboard to place 1 Power Pad

###Routing script
- Select all items on the artboard above
- Go to `File/Scripts/Other scripts`
- Browse to file _RouteTSP.jsx in the upzipped folder from the Install part
- Click open and wait

_Note_: If the result is not satisfying, you may try undo the changes and:

- Re-run the script

or

- Change `DEFAULT_VOLTAGE` in file GlobalVariables.jsx to a higher value and re-run the script