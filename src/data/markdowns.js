export const parts = `### Desktop Unit

- Optiplex Dell 3020
- Optiplex Dell 3040
- Optiplex Dell 3046
- Optiplex Dell 3050
- Optiplex Dell 3070
- Optiplex Dell 3080
- Optiplex Dell 3090
- Lenovo M70t & M70s

### POS Unit

- NEC G9 & G5200
- POSIFLEX KS7315, KS7515, and XT series

### CLIQQ Unit

- FLYTECH
- POSIFLEX

### POS Printer Unit

- NEC G9 BUILD-IN
- EPSON
- POSIFLEX PP-9000
- STAR BSC10

### CLIQQ Printer

- STAR SK1
- POSIFLEX PP-9000

### Desktop Printer

- HP LASER JET PRO P1102, M11 - 17 Series
- CANON 6030 & MF3010
- EPSON M1100

### HT Unit

- ZEBRA TC51 & TC52
- ZEBRA CRADLE TC51 MODEL

### POS Scanner Unit

- Zebra DS22 & Datalogic
`

export const preloading = `### Tools Needed
* Northon Bootable Flash Drive - Win 7
* Acronis Bootable Flash Drive - Win 10
* HDD with Desktop Image

### Installer Needed
* SBS latest version (2.1.30.46)
* Desktop Printer Drivers
* Iconnect latest version / patch version (3.1.7.2)

### Step 1: Prepare Backup
* Create Backup Folder in Drive D and create 2 folders and name it Drive C and Drive D
* Backup in Drive C:
  * C:\\Apex
  * C:\\Audit
  * C:\\empleyado
  * All Desktop files except shortcut folder or apps (ignore this if win 10 os)
  * C:\\Users\\store\\Desktop (for win 7 pc only)
  * Store important files from music, picture, and videos folder (don't copy all music and videos except important cctv copty)
    * C:\\Users\\store\\Music if win 7 OR C:\\Users\\st0000\\Music if win 10
    * C:\\Users\\store\\Pictures if win 7 OR C:\\Users\\st0000\\Pictures if win 10
    * C:\\Users\\store\\Videos if win 7 OR C:\\Users\\st0000\\Videos if win 10
  * SBS data (pos_db_temp, pos_db.zip, data, reports)
    * C:\\RetailPlusStoreBackend\\bin\\conf\\pos - copy pos_db_temp & pos_db.zip
    * C:\\RetailPlusStoreBackend\\mysql - copy data folder
    * C:\\RetailPlusStoreBackend\\webapps\\RetailPlusStoreBackend - copy reports folder
* Backup in Drive D:
  * 7-11 Store Files or Documents
  * All Audit Folders
  * All Store Folders and Files
  * PSC-Mail Directory
* Export Iconnect Keystore
  * Open Iconnect > Action > Unlock Settings (pass: xdxp / xpxd) > OK > Settings > Identity > Export then save it to your backup
* Export Email Thunderbird Address book (Collected and Personal Address book)
  * Open Thunderbird > Address Book > Tools > Export > select type as LDIF then save it to your backup
  * Check with or ask the manager if they have files on the secondary HDD and copy them to your backup folder if they do.

### Step 2: Preloading / Formatting
* Remove primary HDD and retain secondary HDD
* Plug HDD with Images and Bootable or Acronis Flashdrive
* Use Northon Ghost if win7 / Use Acronis if win10
* Preload secondary HDD then boot sencondary HDD after preload
* Log in Administrator Profile (password: xdxp) win 10
* Log in Administrator Profile (password: xdxp) win 7

### Step 3: Setup New Primary and Restoration
* Setup Computer Name
  * Open Folder > Right click on Computer (win7) / This PC (win10) > Select Properties > Click on Change Settings > Change > Change computer name into STXXXXStoreName (ex.ST1506SanNarcisco)
* Setup Local User Name
  * Open Folder > Right click on Computer (win7) / This PC (win10) > Select Manage > Select Local User & Group > Users > Double Click ST0000 > Change full name into store# (ex. ST1506) > Apply & OK > Right Click ST0000 > Set password > Proceed > input password Store# only (ex.1506) then OK 
* Change Drives Name
  * Open Folder
* Configure I.P. Address
  * For Win7 right click on network icon > Open Network & Internet Settings > Click Local Area Connection > Properties > Double Click Ipv4 > Config IP
  * For Win10 right click on network icon > Open Network & Internet Settings > Click Properties > Find IP Settings and Edit > Select Manual > Turn On Ipv4 > Config Ip

| Setting       | Value           |
| :---:         | :---:           |
| IP ADDRESS    | 192.168.14.10   |
| SUBNET        | 255.255.255.0   |
| GATEWAY       | 192.168.14.100  |
| PREFERRED DNS | 202.60.9.4      |
| ALTERNATE DNS | 202.60.9.5      |
`
