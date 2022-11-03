# Arch Linux Installation Guide

> Saboor Bilal, 2022
> Copied off Nuno's guide with my own preferences :) https://github.com/nunopenim/nunopenim

## Disclaimer

I am not responsible for any data loss that might occur.<br>
This guide will tell you how to install Arch Linux as the single OS in your machine.

Dual-booting will be added to this guide soon, so unless you can interpret this guide to dual-boot like I personally did, this isn't recommended for dual-boot

Back up your stuff, unless you're like me and don't care much about your data.

You can use this guide freely as a base for a guide of your own to do other setup options (such as a Dual Boot version), if you give me and Nuno proper credits.<br>
Thank you.

## Preface

Congratulations, if you are reading this, you found a very special document I wrote not only to help myself, but to help other like minded individuals.

After this, you should have a full working Arch Linux installation, running the Plasma DE and with SDDM, because plasma is superior.

This was done specifically in a Dell G5 5090 with an Intel i5-9400, 16GiB of RAM and a 256GB NVMe SSD.
It should work on any other machine with UEFI support though. Fuck your legacy BIOS, UEFI ftw.

Every problem you run into can be solved either by looking in the [Arch Wiki](https://wiki.archlinux.org/), or by searching in the [Forum](https://bbs.archlinux.org/), or simply, Google.

## Installation instructions and Steps

### Step 1: Download the Arch Linux ISO file

The title pretty much explains it.

To do it, access https://archlinux.org/download and download the most recent ISO file.

### Step 2: Make a bootable flash drive.

I recommend using [Etcher](https://www.balena.io/etcher/) for this step. Download the suitable version for you (Windows, macOS or Linux). The Linux version is usually an AppImage file, which runs (or should run) on all distros. If you are geeky, you could use dd on Linux, works too.

Always keep this flash drive around after, maybe label it. It will be important as it might be the only way you can solve any possible boot issues in the future.

### Step 3: Configure your machine

Disable Secure Boot! That's all I have to say. If you use a SATA SSD, set SATA mode to AHCI.

As for peripherials such as the Web Camera, I recommend activating everything. It is not a requirement, but it is needed to make sure everything works correctly. After the installation, you can disable the ones you don't use again.

**Note for SATA SSD users:** You probably still can use this guide, but ahead in the guide, when I mention something like ```/dev/nvme0n1```, in your case it should be ```/dev/sda``` or similar. The guide is made for NVMe M.2 drives, because this is the future.

### Step 4: Booting into the Live USB environment

Fully shutdown your PC. Insert (if not yet there) the Arch Linux USB you made in Step 2. Depending on your machine, **press F12, F8 or Delete**, to get into the **Boot Settings** (not BIOS options). Select the USB drive. An Arch Linux boot selector should pop up. **Select the option to Boot Arch Linux**. After a while a blank terminal screen should greet you. Welcome to Arch Linux

### Step 5: Preparing the environment (Some steps here are optional, depends on your needs)

#### Step 5a: The right keyboard layout

If you ever used the Linux terminal, by now you realized this blank Terminal screen is a terminal like any other, and probably did some simple commands (because you have an ADHD level like nuno - that's okay, you are still beautiful) and realized the keyboard layout might not be the correct one for you (unless you are in the US).

To get to the point, the command ```ls /usr/share/kbd/keymaps/i386/**/*.map.gz``` will **show you the avaliable keyboard layouts**. It can be a never ending list, use the keyboard **Page Up** and **Page Down** keys to navigate. After figuring out some possible keyboard layout candidates, load one and test. You can do such via the ```loadkeys``` command. 

As an example, Nuno needed the QWERTY European Portuguese keyboard layout. He located two possible candidates: ```pt-latin1.map.gz``` and ```pt-latin9.map.gz```. ran ```loadkeys pt-latin1``` and tested using some characters in the terminal. Since it was the correct layout for him, he proceeded. If the first keyboard layout you have is not the suitable one, just run ```loadkeys``` again, with another keyboard layout.

Personally, I live in Canada so this doesn't matter for me

#### Step 5b: Wi-Fi connection

If you don't have an Ethernet connection (although it would be good, less of an hassle to setup), you can connect to Wi-Fi, via the terminal. This is done via the ```iwctl``` utility. To open it, just type ```iwctl``` on the terminal.

Inside the IWCTL utility, type ```device list```. This will show your Wi-Fi compatible devices. In my case, mine is named ```wlan0```. 

Perform a network scan, by typing ```station wlan0 scan```. After this, to check all the available networks, use ```station wlan0 get-networks```. Make sure your network is on this list. 

If your network uses WPA or WPA2 (password, not Enterprise authentication), to connect to it, just type ```station wlan0 connect "<network name>" psk```. It then will ask you for a password, and that should be it. 

Use ```quit``` to exit the utility and perform a ping (for example ```ping 8.8.8.8```), to check if you have network access. Ping should run indefinitely, and not show errors like "Network is unreachable". To quit ping, use the **CTRL+C** combination.

For a full list of options and operations inside the IWCTL utility, type ```help```.

### Step 6: Partitioning and formatting the Disk

**Warning: possible loss of data after this. Final warning: This setup is for UEFI machines, not BIOS/CSM**

#### Step 6a: Setting up Partitions

We will use the ```fdisk``` utility for this. List all the disks, by using ```fdisk -l```. Currently, it should appear both the USB Drive and the internal drive(s). Keep in mind the name of the proper one. In my case it was ```/dev/nvme0n1``` (as I mentioned earlier, it can also be ```/dev/sda``` or similar if you are using a SATA SSD).

Run fdisk with the destination drive. In my case it was ```/dev/nvme0n1```, so I executed as ```fdisk /dev/nvme0n1```

IF YOU HAVE UNALLOCATED SPACE READY FOR A UEFI DUAL-BOOT, SKIP THS SECTION<br>
Type ```d``` and press Enter/Return until all the partitions are deleted.<br>
With the disk fully wiped now, type ```g``` and press Enter/Return. This will create a new GPT partition table.

Create a **new primary partition** by typing ```n``` and pressing Enter/Return. Make it 500MB. This can be done by selecting the initial sector, then in the final sector typing +500M.<br>
After creating, take note of the partition number that is shown, usually this is 1, **we will use this number as \<X\> later in the guide**

Type ```t```, and press Enter/Return twice. Now it will ask you for a partition type or alias, this is ```1``` for EFI System.

##### Optional: Create SWAP<br>
Skip this block of text if you don't want SWAP<br>
For this, type ```n``` to make a new partition, and press Enter/Return. Make it the size of your RAM, unless you have over 8GB then make it half of your ram. type +4G for 4 gigabytes as your final sector, just like how you made the EFI partition 500MB.<br>
After this, type ```t``` to change the partition type, and ```l``` (lowercase L), to check all the possible types. Find an option named SWAP, Linux SWAP or similar (at the time of writting, it is option 82, if I am not mistaken). Type this number in the type selector.<br>
After creating, take note of the partition number that is shown, usually this is 2, **we will use this number as \<Z\> later in the guide**

Create a new partition, using ```n```, select the needed size (I recommend using the remaining drive space by just pressing Enter/Return).<br>
After creating, take note of the partition number that is shown, usually this is 2, or 3 if you have a SWAP partition, **we will use this number as \<Y\> later in the guide**

After this, you should have your drive with 2 partitions, a 500MB EFI, which has the partition number of \<X\><br>
And a second one with the remaining space, which has the partition number \<Y\> where you will install the operating system.

#### Step 6b: Finishing up and formatting the drives

Type ```w``` to write all the changes to the disk, and exit fdisk.

Assuming you are back in the Arch terminal, format the new partitions. The first one (EFI) should be FAT32: do it using ```mkfs.fat -F32 /dev/nvme0n1p<X>```

The second one (Root) should be BTRFS. You can do this using the command ```mkfs.btrfs /dev/nvme0n1p<Y>```<br>

If you have set up correctly a swap partition, as explained in 6b, you should format it with ```mkswap /dev/nvme0n1p<Z>```. At this point you can also call ```swapon /dev/nvme0n1p<Z>```, if you really want to enable SWAP during the installation, although not needed.

Now you are ready to install Arch Linux!

#### Step 6c: Mounting the root partition and doing final BTRFS steps

BTRFS comes with a few steps to set up the filesystem.

We will start by mounting your newly made root partition. You can do this by typing ```mount /dev/nvme0n1p<Y> /mnt```.

After this there will be a few repetitive commands, so to avoid typing them out you can press the Up arrow key to auto-fill the last command you did.

Now, do these commands to create subvolumes for the different parts of the Linux system:<br>
```
btrfs su cr /mnt/@
btrfs su cr /mnt/@home
btrfs su cr /mnt/@var
btrfs su cr /mnt/@opt
btrfs su cr /mnt/@tmp
umount /mnt
```
These subvolumes are mainly named after system directories which have specific functions:<br>
@ - This is the main root subvolume on top of which all subvolumes will be mounted.<br>
@home - This is the home directory. This consists of most of your data including Desktop and Downloads.<br>
@var - Contains logs, temp. files, caches, games, etc.<br>
@opt - Contains third party products<br>
@tmp - Contains certain temperory files and caches

Now do these commands to mount the subvolumes:<br>
```
mount -o noatime,commit=120,compress=zstd,space_cache=v2,subvol=@ /dev/nvme0n1p<Y> /mnt
mkdir /mnt/{boot,home,var,opt,tmp}
mount -o noatime,commit=120,compress=zstd,space_cache=v2,subvol=@home /dev/nvme0n1p<Y> /mnt/home
mount -o noatime,commit=120,compress=zstd,space_cache=v2,subvol=@opt /dev/nvme0n1p<Y> /mnt/opt
mount -o noatime,commit=120,compress=zstd,space_cache=v2,subvol=@tmp /dev/nvme0n1p<Y> /mnt/tmp
mount -o subvol=@var /dev/nvme0n1p<Y> /mnt/var
```

### Step 7: Install Arch Linux (Finally, eh?)

If you reached this far, you have a very strong willpower. I admire you, and I won't stop you.

Anyway, type ```pacman -Syy```. This will sync the pacman repositories.<br>
Similar to how Debian and Debian-based distros syncronize package lists with apt-get update.

After pacman did its thing, we are ready! To finally install arch on your root partition type ```pacstrap /mnt base base-devel linux linux-firmware linux-headers networkmanager network-manager-applet nano btrfs-progs```.<br>
This will install Arch, the Linux Kernel, Firmware and Headers, some extra libraries for developers, NetworkManager, BTRFS utilities, nano, because... you will need a text editor.<br>
You can use vim instead of nano if you want, but having a CLI text editor is an important tool and requirement.

This step will take a while depending on your Internet connection.

After it has finished, there's another package for AMD and Intel CPUs which you should install to ensure stability.

For intel CPUs:
```
pacstrap /mnt intel-ucode
```

For AMD CPUs:
```
pacstrap /mnt amd-ucode
```

For others, you may skip this part.

### Step 8: Configuring the System

#### Step 8a: File system configurations

After installing the packages I specified previously, you will need to configure them properly, otherwise your system will not boot. Start by generating a [fstab file](https://wiki.archlinux.org/index.php/fstab). This can be done using the command ```genfstab -U /mnt >> /mnt/etc/fstab```. 

Good, now you have the correct File System parameters for Arch to boot.

**Note on FSTAB:** If you setup a SWAP partition, you will need to declare it later on the FSTAB, however this is easier to do once we actually have a booting and almost finished system.

#### Step 8b: System configurations

Now we will configure the System itself. Start by chrooting into it, by doing ```arch-chroot /mnt```. This is your system now, it no longer is the Live CD/USB. Your keyboard *might* be in the default settings, if such, refer to Step 5a again! Networking should still work fine, though.

We will start by configuring the Timezone. [Here's a list of time zones you may choose from](https://manpages.ubuntu.com/manpages/xenial/man3/DateTime::TimeZone::Catalog.3pm.html). In my case, I will use ```America/Edmonton```.<br>
After you find the correct timezone for you, you can set it by running the command ```ln -sf /usr/share/zoneinfo/<TZ> /etc/localtime```. In my case: ```ln -sf /usr/share/zoneinfo/America/Edmonton /etc/localtime```. Then, do ```hwclock --systohc``` to apply changes

The next step will be setting the default Language/Locale. Run ```nano /etc/locale.gen``` to open the ```/etc/locale.gen``` file (or use the text editor you installed in Step 7). In this file, uncomment your prefered Language and Locale settings (delete the # in front), in my case, I selected ```en_US.UTF-8```. Save and quit the editor. In Nano this is done with **CTRL+O**, Enter/Return, and **CTRL+X**

After doing this, regenerate the locales with the command ```locale-gen```. Add your preferred locale to the locale.conf file, with the echo command, for example in my case ```echo LANG=en_US.UTF-8 > /etc/locale.conf```, and export it to bash (so that we don't have to reboot the machine, it's really a bad time to do such now), with the command ```export LANG=en_US.UTF-8```.

These settings can be changed later on, so don't worry if you think they are not the correct ones. It's better to have *something* than *nothing*.

#### Step 8c: Network configurations

Every computer needs a hostname, to be identified in a network. With nano, create and edit the ```/etc/hostname``` file. Do this with ```nano /etc/hostname```. Inside write the hostname you want, in my case it was ```saboor-arch```. Save and exit with the **CTRL+O**, Enter/Return and **CTRL+X** trick.

You will also need a hosts file. Create it with the command ```touch /etc/hosts```. Open it with nano, in a similar fashion of the previous file.<br>
Below is an example of a hosts configuration.

```
127.0.0.1	localhost
::1		localhost
127.0.1.1	<Your hostname here>
```

Networkwise, you should be done!

#### Step 8d: Root account password

This is a simple, yet important step, due to security. To do such, type ```passwd``` and use a memorable password. That's it.

#### Step 8e: Adding btrfs module to mkinitcpio

For BTRFS to work properly in the kernel, you need to add it to mkinitcpio

To do so, do ```nano /etc/mkinitcpio.conf``` and then add ```btrfs``` in ```MODULES=()``` it should look like ```MODULES=(btrfs)```, and then save and exit as you did before, and then recreate the image with ```mkinitcpio -p linux```

#### Step 8c: Bootloader configuration

We will use the GRUB bootloader. A quick reminder, **this guide is only for UEFI mode**.

You can start by installing the GRUB bootloader with PacMan: ```pacman -Syu grub grub-btrfs efibootmgr os-prober```

Next, create the directory to mount the EFI partition and mount it: ```mkdir /boot/efi && mount /dev/nvme0n1p<X> /boot/efi```

After this, install GRUB to this directory: ```grub-install --target=x86_64-efi --bootloader-id=ArchLinux --efi-directory=/boot/efi```.

Finally, generate a boot configuration: ```grub-mkconfig -o /boot/grub/grub.cfg```

### Step 9: Creating a user account and configuring SUDO

In this step, we will create a user account. Run the command ```useradd -m <usr>``` to create a new account, replacing <usr> with the desired username.<br>
The -m flag will also create a Home directory for you, which saves the hassle of setting it up after.

After creating the user, set up a password for this new user, using the ```passwd <usr>``` command. It is similar to step 8d.

Now that you have a new user, we will configure SUDO, since you shouldn't be using the root account at all. Start by installing it with pacman: ```pacman -Syu sudo```.

SUDO comes with a special editor called ```visudo```, to allow us to edit it's configurations without damaging sudo. However visudo needs to be configured to use a CLI text editor. In our case, as with the rest of this guide, we will use ```nano``` as our text editor.<br>
To use edit with visudo on nano, run the command ```EDITOR=nano visudo```.

To add your newly created user to the sudoers, all you need to do is locate the line that says ```root ALL=(ALL:ALL) ALL```<br>
Below add the line ```<usr> ALL=(ALL:ALL) ALL```, where <usr> is the username you created.<br>
Save and exit, using the **CTRL+O**, Enter/Return and **CTRL+X** trick, that you should know by now.

Congratulations, you now have a sudo user.

### Step 10: Installing the X display server and KDE Plasma

Almost there, now all that is missing is the DE and WM. Firstly, install the X enviroment. You can do it running the command ```pacman -Syu xorg```.

Now install KDE Plasma, with the command ```pacman -Syu sddm plasma plasma-wayland-session kde-system kde-utilities kde-network tesseract-data-eng```.

After it finishes installing, create symlinks for the service to start up automatically.<br>
This can be done with the command ```systemctl enable sddm.service```.

I also recommend enabling NetworkManager, since it might be disabled by default, otherwise you will not have networking.<br>
This can be done with the command ```systemctl enable NetworkManager.service```.

### Step 11: Finishing up

Everything should be done now. Exit the chroot by typing ```exit```. Shutdown the machine, with the command ```shutdown now```. Remove the USB drive.

### Step 12: The first boot

There are a few tweaks you might need to do. Start up your machine and boot. If everything worked fine, you are now greeted by the SDDM login window. Go to the top-right dropdown where it shows 'Plasma (X11)' and set it to 'Plasma (Wayland)'. Now you may login.<br>
(If not, you fucked up, nice! Check troubleshooting for a quickfix).

Try running the terminal, which is named Konsole. If it works, you are good to go! Have fun.<br>
The default desktop is *really* ugly, in my opinion. Search up how to make KDE Plasma look good because this DE is *REALLY* customizable, you can make it look however beautiful or ugly as you want (check out r/unixporn or r/unixgore, that's all I have to say)

You may find that this installation of KDE is really barebones and doesn't have much apps, check out step 15 to install your own apps, or simply open konsole and do ```sudo pacman -Syu kde-applications``` (Warning: This is really bloated and I chose to leave this out for that reason!)

### Step 13 (optional): Installing a proprietary graphics driver (Really for NVIDIA)

The current open-source NVIDIA driver that comes with Arch (nouveau) is absolutely ass and I recommend you steer away from it as far as you can.<br>
To install the NVIDIA driver, do ```pacman -Syu nvidia nvidia-settings egl-wayland```

**There's also one more thing to setup, and that is to enable DRM modesetting. This will allow you to use wayland with NVIDIA proprietary drivers**<br>
To do so, open Konsole, edit /etc/default/grub with ```sudo nano /etc/default/grub```, find GRUB_CMDLINE_LINUX_DEFAULT and after quiet, add a space and then ```nvidia-drm.modeset=1```. Finally leave the editor like you did before and once again type ```sudo grub-mkconfig -o /boot/grub/grub.cfg```

Why is this optional and not mandatory? Well, the NVIDIA driver, as smooth as it is to use on linux, is sometimes a bit buggy, since it is not open-source so people can't fix stuff themselves and build their own versions of the driver, but this really doesn't matter as much as you may think, I personally use the proprietary driver and it works just fine.

Why is this driver not used by default with Arch? Well, because Arch is FOSS (Free and Open-Source Software), and nouveau is the open-source driver arch decided to use

### Step 14 (optional): Configuring the SWAP partition in the FSTAB

If you have made a SWAP partition (in step 6b), it is recommended to add it to the FSTAB file. To do this, open KDE Partition Manager and select your Swap partition. You will see a field named UUID. Keep this UUID handy (check below).

With this in mind (or in the clipboard), open a new terminal window and type ```sudo nano /etc/fstab```.<br>
Under the single entry that is in the file, add a new one with the following format: 

``UUID=<YOURUUID>	swap	swap	defaults	0 0``

Make sure you get the UUID right, otherwise your system won't boot!

After this, save by doing the **CTRL+O**, Enter/Return and **CTRL+X** ritual that we have used a lot during this Guide.<br>
Finally, reboot your system and you are all set!

### Step 15 (optional): Accessing Windows (NTFS) partitions

If you have Windows (NTFS) partitions you'd like to mount and access on your linux installation, you may install ```ntfs-3g``` with pacman.

### Step 16 (optional): Installing an AUR Helper

An AUR helper allows you to automate your search and installation of packages in the [Arch Linux User Repository (AUR)](https://aur.archlinux.org/). This repository is a community driven repository that contains [PKGBUILD](https://wiki.archlinux.org/index.php/PKGBUILD) files, which allow you to build a package using the [makepkg](https://wiki.archlinux.org/index.php/Makepkg) utility, and then installing it with pacman, as if it was any other Arch Linux package. The AUR will allow you to have even more packages available for use and installation (such as the JetBrains IDEs, Android Studio, Flutter, and other utilities that I love to use).

Why is this step not mandatory? Some users have reported sometimes AUR packages interfering with official packages, causing their systems not to boot, specially after updates. This never happened to me, and I am biased to say they did something wrong at some point for it to fail. However since this is an objective Guide, I am reporting facts here, and the fact is that some users reported AUR packages interfering with official packages :)

Anyway, to get to the point, I recommend using [Yet Another Yogurt (or yay)](https://github.com/Jguer/yay), since it has always been reliable to me and it's syntax is similar to pacman's. As with all AUR Helpers, yay should be installed in a way that you are not forced to use superuser privilleges on it, unlike some websites with guides report. Running yay as sudo can be risky!

You will need to install git (```sudo pacman -Syu git```) if you haven't yet. After this, clone yay's repository into your home folder (```git clone --recursive https://aur.archlinux.org/yay-git.git```). Change directory to the yay-git directory, so we can build it (```cd yay-git```). After this, build and install the yay package (```makepkg -si```). It will probably ask you confirmation before installing you a GoLang wrapper/interpreter, accept it. After the command runs, if no error has been reported, you are all set. If you want, you can delete the yay-git folder in your home folder, it's not doing anything there anymore.

To use yay, type in the terminal ```yay -S <packagename>``` to install a package, ```yay -Syu <optional:package_name>``` to update all packages and package lists and optionally install a package, just like you would with pacman.

**Note:** yay might ask you for your sudo password, despite not running it as "sudo". This is fine, since yay calls "sudo pacman" from behind the scenes sometimes!

## Final notes

With this guide, it should have been possible for you to have a running Arch Linux installation. Any smaller problems can be solved with help from the Wiki or the Forums. You can also search in Google, you will likely find your issue and how to solve it. Don't forget to always read the community guidelines and how to report an issue in the forums!

Remember to have fun. Don't bloat Arch too much, otherwise it loses it's purposes, maybe even freestyle and become the megachad i3 user. Cheers everyone.

## Troubleshooting

- You can boot to a black screen with a blinking cursor. However you can do Alt+F2 and back to Alt+F1, and Plasma/SDDM should now boot fine.<br>
This is an issue related to X.org and the ```amdgpu``` or ```nvidia``` driver not loading on the correct time. Look it up on Arch Wiki, or even Google. This issue is everywhere and you shouldn't have an hard time figuring it :)

## Special Thanks

 - [Arch Linux](https://archlinux.org/), for their amazing, lightweight and flexible Linux distribution.
 - [Arch Linux Wiki](https://wiki.archlinux.org/), for helping me figure out what I needed and how it worked.
 - Some Threads in the [Arch Linux Forum](https://bbs.archlinux.org/), for helping me solving some issues, like how to get my printer working.
 - [balenaEtcher](https://www.balena.io/etcher/), for their amazing flashing software.
 - [Nuno Penim](https://github.com/nunopenim/nunopenim/blob/main/GUIDE_ArchLinuxInstallation.md), for a template of this guide
