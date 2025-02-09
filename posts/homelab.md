---
title: "What I Am Running on My Homelab"
date: "January 27, 2024"
---

<img alt="1" src="https://raw.githubusercontent.com/x64nik/blog/refs/heads/main/public/images/rack.png" width="480" height="100"/>

This is a new server that i bought 8 months ago, before that i was using HP Compaq SFF PC :) 

<details>
<summary><b>Table of contents</b></summary>

- [Hardware](#hardware)
- [Architecture](#architecture)
- [Storge](#storage)
- [Networking](#networking)
- [Services](#services)

</details>


<a id="hardware"></a>

### Hardware

- Dell R720XD Server Rack <br/>
- 32 x Intel(R) Xeon(R) CPU E5-2650 v2 @ 2.60GHz (2 Sockets) <br/>
- 126GB DDR3 Memory   <br/>
- 240x2GB SSD (Boot Drive) <br/>
- 4x2TB SAS (Primary Storage) <br/>
- 500x2GB HDD (Backup NAS) <br/>
- BRCM 10G/GbE 2+2P 57800 rNDC (Integrated NIC) <br/>
- 750wx2 Power Supplies <br/>
- Dell PERC H710 Mini into IT Mode (For ZFS) <br/>
- TP-Link Ac1200 Mbps ArcherA6 Router <br/>
- TP-Link LS105G Gigabit Switch <br/>

I had Dell PERC H710 Mini RAID Card installed in my server which dosnt support IT mode, so i had to flash it into IT mode using custom firmware. 

<a id="architecture"></a>

### Architecture

<img alt="1" src="https://raw.githubusercontent.com/x64nik/blog/refs/heads/main/public/images/homelab-diagram.png" width="1280" height="720"/>


I am using Proxmox 8.2 Type-1 Hyervisor it is free and easy to use, i have been using proxmox from last 2 years and my experience is pritty good.

<a id="networking"></a>

### Networking

**Cloudflare Tunnels**<br>
I am using two cloudflare tunnels on two different networks, first one is in my main network which is my primary home lan and second one is the pfsense vlan where external users virtual machines are deployed, this vms are isolated and they can only access internet apart from that inter vlan communication is disable, before pfsense i was using Proxmox SDN but there were some limitation with setup so i setup pfsense but with proxmox SDN, yup i am using both pfsense as virtual firewall and SDN as physical ahh its not physical but its on another layer which is on top of pfsense.


**Pfsense Firewall**<br>
It is a software based firewall installed on top of a vm and that vm has 3 network interface cards (virtual NICs) first one is the so called WAN interface which is directly connected to our main lan (192.168.0.0/24) which is comming from router which mean this interface has internet connection second one is the LAN intereface this is the local virtual lan network of pfsense and the third interface is splitted into 2 interfaces and each interface has a tag, so this third interface is our VLAN where our private VMS will be running.


**Wildcard DNS Record**<br>
There are lot of services running in my homelab and it becomes a repatative task to add public hostname rules on cloudflare tunnels page to avoid that i am using wildcard dns entry to cloudflare tunnel, there is  a traefik lb running in k3s cluster when ever i had to expose any service i just had to create a ingress rule with the public hostname and the service becomes available on that domain ;)


<a id="services"></a>

## What services am I running ?

### K3S Cluster

A six node K3S HA cluster with two master nodes and four worker nodes, embeded etcd, traefik as ingress controller, metallb and there is one external nginx server acting as a loadbalancer for both master nodes which is running on one of the virtual machines where docker is installed 

**MetalLB**<br>
Kubernetes does not offer an implementation of network load balancers (Services of type LoadBalancer) for bare-metal clusters, most of the cloud service providers like AWS, Digital Ocean, Azure, GCP, etc they provides network load balancers like ELB on AWS but in our case we dont have any load balancer and services of type LoadBalancers will remain in the “pending” state indefinitely when created. To overcome this issue we use metallb which is a loadbalancer that operates at network Layer 2 or Layer 3 primarily designed for bare-metal Kubernetes clusters where a dedicated application-level load balancer might not be readily available, allowing you to create Kubernetes services of type "LoadBalancer" even without a cloud provider's managed load balancing service. It will directly take ip from our router and we will see  that perticular ip on the service external ip and then we can easily point cloudflare tunnels to that ip and we are all set.


**TrueNAS Core**<br>
This is a backup server which i am using for proxmox vms but it also has 2 pools (SMB and NFS) which is used as k3s storage class, before this i was using longhorn but it was too heavy and my io delay was slowing my server so i went with this simple and easy solution.

### Monitoring 

<img alt="1" src="https://raw.githubusercontent.com/x64nik/blog/refs/heads/main/public/images/dash.png" width="1280" height="720"/>


I have three docker hosts virtual machines where i am running dozzle and dozzle agent its a opensource and lighweight logging tool, I am running the dozzle master on one of my vm and rest of the docker hosts are connect via agent url, dozzle supports multiple remote host connectivity so that we can check logs of all containers running on different hosts on same page.   


I am also using grafana with promxox pve exporter with influxdb and prometheus, its a default dashboard but ill be modifying it later.

ElasticSeacrch, Fluentbit and Kibana stack is running on k3s cluster, it is  a bit incomplete though but along with that prometheus operator, node exporter, etc is running i curreently have two grafana instances because one is running on docker host and another is on k3s but i am going to keep only one in future.

