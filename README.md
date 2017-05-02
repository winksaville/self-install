This is some code I wrote to allow [Alsatian](https://github.com/alsatian-test/alsatian)
to reference itself. I created this because the technique used by Alsatian for
integration tests required it to be installed locally which was accomplished by using
`npm link` and `npm install-self`.

The problem was `npm link` wouldn't work on my linux box because npm stored
the node_modules at /usr/local/lib, i.e. global modules reuired `sudo` to be
installed. So by using symlinks directly in the directory it was unnecessary
to using `npm link`.

The "real" solution was to not install npm modules globally but instead install
them in another directory namely `~/.npm-packages`. I followed the instructions
from the [fixing npm permissions page](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Here is what I had to do to get symlinks to work on Windows:

A user must not be part of an Administrator and the user directory must not
contain a space in the name. So I had to create a new user “winks” as my
original account user directory was “C:\Users\Wink Saville”.  I also created
an “admin” user which was Administrator.

Additional changes:

Change SymlinkEvaluation behavior
- Log into: admin or start a command prompt as admin using:
  - Command prompt<ctrl-shift-enter>
- To get help with the fsutil commands:
  - fsutil behavior set /?
- To query current SymlinkEvaluation behavior:
```
C:\WINDOWS\system32>fsutil behavior query SymlinkEvaluation
Local to local symbolic links are enabled.
Local to remote symbolic links are enabled.
Remote to local symbolic links are disabled.
Remote to remote symbolic links are disabled.
```
Change SymlinkEvaluation behavior
```
C:\WINDOWS\system32>fsutil behavior set SymlinkEvaluation L2L:1 L2R:1 R2R:1 R2L:1
```
Then check that all forms are enabled Using above query you should see:
```
C:\WINDOWS\system32>fsutil behavior query SymlinkEvaluation
Local to local symbolic links are enabled.
Local to remote symbolic links are enabled.
Remote to local symbolic links are enabled.
Remote to remote symbolic links are enabled.
```

To change PATH, which I needed to do after using “npm install rimraf -g”
 - Right click: on start
 - Click: System
 - Click: Advanced system settings
 - Click: Environment variables
 - Double click: PATH in System variables window
 - Use NEW to add a new variable

To add a user to the “Create symlink” policy
 - Run: secpol.msc
 - Select: Local Policies
 - Select: User Rights Assignment
 - Double click: Create symbolic links
 - Add new user/group

