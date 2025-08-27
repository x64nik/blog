---
title: "How to start your own homelab with old computers"
date: "January 01, 2024"
---

When I was in my engineering, I got to know about homelabbing stuff through YouTube videos and Reddit posts. At that time, I was running multiple virtual machines in VMware and VirtualBox, and it was so frustrating because I was running all that on my personal workstation (gaming PC :D). I was familiar with type-1 hypervisors but never explored that area because I thought there was only one hypervisor in the market, VMware, which is paid, and I didn't want to spend money on its subscription. Then, someone told me about the Proxmox hypervisor, and oh my god, that thing got me into this homelabbing addiction! :D

In this blog, I will tell you guys how to start your own homelab for free without any enterprise-grade tools/software/hardware—just with the normal computer that's been sitting somewhere in the corner for the last 126 light years, hoping someone will wake it up from hibernation! XD

### Hardware Requirement

**CPU**: Any 4-core processor (i5/i3/i7/AMD, etc.), all we need is 4+ cores  
**Memory**: 8/16GB  
**Storage**: 126GB (for hypervisor) & 2 HDDs (for RAID1)  
**NIC (Network Interface Card)**: 1Gb+  
**Network Switch**: This is not mandatory but it's good if you have one  

### Choosing Type-1 Hypervisor

A Type 1 hypervisor is software that runs directly on computer hardware to manage and create virtual machines without needing an operating system. It allows multiple operating systems to run on one machine.

There are a few hypervisors in the market, but most of them are paid, like one of the most popular enterprise-level hypervisors, VMware ESXi. However, there are some free and open-source hypervisors, like XEN and Proxmox. I personally prefer Proxmox because its installation is dead simple, and it just feels like installing a normal Debian Linux (by the way, Proxmox is built on top of Debian and KVM).

### Installing Proxmox

Download the latest Proxmox ISO from their official website, create a bootable USB stick using Rufus or BalenaEtcher, and then install Proxmox. While installing, make sure to select your SSD in the "target hard disk" section. Installing Proxmox on an SSD is good because it will reduce boot time, and things like updates will be faster than on a normal HDD.

### Setting up a ZFS Storage Pool

The first thing to do after installation is to create a storage pool. Proxmox supports a lot of storage types, such as ZFS, LVM, LVM-thin, Ceph/RBD, NFS, etc. I prefer ZFS with RAID Level as Mirror. This way, the same data will be written to both the HDDs.

### Proxmox Helper Scripts

Proxmox Helper Scripts is a collection of scripts to help you easily make changes to your Proxmox VE server. They help manage PVE version updates, LXC containers, dashboards, etc. You can also use these to disable the subscription nag, so no more subscription pop-ups.

For installing Home Assistant using a script, run this:

```bash
bash -c "$(wget -qLO - https://raw.githubusercontent.com/community-scripts/ProxmoxVE/a4a1821822f0f00fde56bc9b1ebe7204f5e01c08/install/homeassistant-core-install.sh)"
```

okok test

```python
print("ok")
```

### Spinning Up Your First VM

Don't use ISO files to install OSes—cloud providers don’t use ISO files. They use qcow2 images with cloud-init to automate the initial setup and configuration of virtual machines (VMs) when they are first launched. To create a VM from a qcow2 image, I created a bash script that turns the qcow2 image into a VM template. Then, you can full clone the VM and configure cloud-init settings such as username, password, IP, SSH key, etc., and your VM is ready to boot.

Here's a sample script to create a VM from a qcow2 image:

```bash

qm create $TEMPLATE_ID --memory $MEMORY --core $CORES --sockets 2 --name $TEMPLATE_NAME --net0 virtio,bridge=vmbr0
qm disk import $TEMPLATE_ID $QCOW_PATH $POOL_NAME
qm set $TEMPLATE_ID --scsihw virtio-scsi-pci --scsi0 $POOL_NAME:vm-$TEMPLATE_ID-disk-0
qm set $TEMPLATE_ID --ide2 $POOL_NAME:cloudinit
qm set $TEMPLATE_ID --boot c --bootdisk scsi0
qm template $TEMPLATE_ID

```

### Managing Your Homelab with Proxmox

After setting up your Proxmox hypervisor, you’re ready to manage and operate virtual machines (VMs). The Proxmox interface allows you to handle everything from hardware configurations to snapshots and network setups.

Proxmox also supports LXC containers, which are more resource-efficient than VMs and allow for almost native performance. LXC containers are great for smaller workloads, while VMs are best for full operating system isolation.


### Cloud-init and Automation

Cloud-init automates the configuration of your virtual machines. This means you don’t have to manually configure every VM. Cloud-init can automate user settings, SSH key setups, network configurations, and much more.

By leveraging cloud-init, setting up multiple VMs with varying configurations becomes a breeze.